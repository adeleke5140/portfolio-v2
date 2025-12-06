'use client'

import { useChat } from '@ai-sdk/react'
import { useQueryClient } from '@tanstack/react-query'
import { DefaultChatTransport, UIMessage } from 'ai'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '../ai-elements/conversation'
import { Message, MessageContent } from '../ai-elements/message'
import { Response } from '../ai-elements/response'
import { TextShimmer } from '../ai-elements/shimmer'
import { AssistantHeader } from './assistant-header'
import { Form } from './form'
import { TextLoop } from '../ai-elements/loop'

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
  recentArticles: Array<{ id: string; title: string }>
  savedMessages: UIMessage[]
  isLoadingSavedMessages: boolean
  rateLimitRemaining: number
}

export const KenAssistant = ({
  isOpen,
  onClose,
  recentArticles,
  savedMessages,
  isLoadingSavedMessages,
  rateLimitRemaining,
}: ChatSidebarProps) => {
  const queryClient = useQueryClient()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [input, setInput] = useState('')
  const [direction, setDirection] = useState(-1)
  const pathname = usePathname()
  const currentPath = pathname.split('/').filter(Boolean)
  const isOnBlogPost = currentPath[0] === 'blog'
  const context = isOnBlogPost
    ? currentPath[1] == null
      ? 'blog'
      : currentPath[1]
    : 'blog'

  // Use a ref to always have access to the latest context/pathname in the fetch function
  const contextRef = useRef({ context, pathname })
  useEffect(() => {
    contextRef.current = { context, pathname }
  }, [context, pathname])

  const { messages, sendMessage, setMessages, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/agent',
      fetch: async (url, init) => {
        // Inject the latest context/pathname into the request body
        const originalBody = init?.body ? JSON.parse(init.body as string) : {}
        const enrichedBody = {
          ...originalBody,
          context: contextRef.current.context,
          pathname: contextRef.current.pathname,
        }

        const response = await fetch(url, {
          ...init,
          body: JSON.stringify(enrichedBody),
          credentials: 'include',
        })

        // Invalidate rate limit query on any response (success or error)
        // to sync with server state
        if (response.ok || response.status === 429) {
          queryClient.invalidateQueries({ queryKey: ['rateLimit'] })
        }

        return response
      },
    }),
    onError: (error) => {
      console.error('Chat error:', error)
      // Invalidate just in case
      queryClient.invalidateQueries({ queryKey: ['rateLimit'] })
    },
  })

  // Hydrate the chat store from saved messages when they change
  useEffect(() => {
    if (isLoadingSavedMessages) return
    if (!savedMessages || savedMessages.length === 0) return

    setMessages(savedMessages)
  }, [isLoadingSavedMessages, savedMessages, setMessages])

  const isLoading = status === 'streaming' || status === 'submitted'

  // Show thinking indicator when:
  // 1. Status is 'submitted' (request sent, waiting for response)
  // 2. Status is 'streaming' but the last message is from user (assistant hasn't started responding yet)
  // 3. Status is 'streaming' and the last assistant message has no text content yet
  const lastMessage = messages[messages.length - 1]
  const lastMessageHasContent = lastMessage?.parts.some(
    (part) => part.type === 'text' && part.text && part.text.trim()
  )
  const isThinking =
    status === 'submitted' ||
    (status === 'streaming' && lastMessage && lastMessage.role === 'user') ||
    (status === 'streaming' &&
      lastMessage &&
      lastMessage.role === 'assistant' &&
      !lastMessageHasContent)

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus()
    }
  }, [isOpen])

  const prevStatusRef = useRef(status)

  useEffect(() => {
    // When streaming/submitted changes to idle (not loading), refocus
    const wasLoading =
      prevStatusRef.current === 'streaming' ||
      prevStatusRef.current === 'submitted'
    const isNowIdle = status !== 'streaming' && status !== 'submitted'

    if (wasLoading && isNowIdle && isOpen) {
      // Small delay to ensure DOM has updated
      const timer = setTimeout(() => {
        textareaRef.current?.focus()
      }, 100)
      prevStatusRef.current = status
      return () => clearTimeout(timer)
    }

    prevStatusRef.current = status
  }, [status, isOpen])

  const isLoadingInitially =
    isLoadingSavedMessages && savedMessages?.length === 0

  // Derived error state for display
  const rateLimitError =
    rateLimitRemaining === 0
      ? 'Limit reached. Please try again tomorrow.'
      : null

  return (
    <div className="flex  h-full flex-col">
      <AssistantHeader onClose={onClose} />

      <Conversation
        style={{
          maskImage:
            'linear-gradient(transparent 0px, black 32px, black calc(100% - 32px), transparent 100%), linear-gradient(black, black)',
          maskSize: 'calc(100% - 16px) 100%, 16px 100%',
          maskPosition: '0px 0px, 100% 0px',
          maskRepeat: 'no-repeat, no-repeat',
          scrollbarGutter: 'stable',
          scrollbarColor: '#dcdcdc transparent',
        }}
        className="flex-1 relative font-sans overflow-y-auto"
      >
        <ConversationContent className="p-4">
          {error && (
            <p className="text-red-500 font-mono text-xs">An error occurred.</p>
          )}

          {messages.map((message) => {
            // Check if message has any text content
            const hasTextContent = message.parts.some(
              (part) => part.type === 'text' && part.text && part.text.trim()
            )

            const textParts = message.parts.filter(
              (part) => part.type === 'text'
            )

            // Skip rendering empty assistant messages when thinking
            const isEmptyAssistant =
              !hasTextContent && message.role === 'assistant'
            if (isEmptyAssistant) {
              return null
            }

            return (
              <Message
                from={message.role as 'user' | 'assistant'}
                key={message.id}
              >
                <MessageContent className="relative group">
                  <div className="flex flex-col gap-2">
                    {textParts.map((part, i) => {
                      if (part.type === 'text' && part.text?.trim()) {
                        return (
                          <Response key={`${message.id}-text-${i}`}>
                            {part.text}
                          </Response>
                        )
                      }
                      return null
                    })}
                  </div>
                </MessageContent>
              </Message>
            )
          })}

          {isThinking && (
            <Message from="assistant" key="thinking">
              <MessageContent>
                <div className="flex items-center">
                  <TextLoop
                    transition={{
                      type: 'spring',
                      bounce: 0.3,
                    }}
                    interval={2.5}
                    onIndexChange={(index) => {
                      setDirection(index === 0 ? -1 : 1)
                    }}
                    variants={{
                      initial: {
                        y: -direction * 5,
                        rotateX: -direction * 90,
                        opacity: 0,
                        filter: 'blur(4px)',
                      },
                      animate: {
                        y: 0,
                        rotateX: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                      },
                      exit: {
                        y: -direction * 5,
                        rotateX: -direction * 90,
                        opacity: 0,
                        filter: 'blur(4px)',
                      },
                    }}
                  >
                    <TextShimmer duration={1} className="text-xs">
                      Gnuggling....
                    </TextShimmer>
                    <TextShimmer duration={1} className="text-xs">
                      Noodling...
                    </TextShimmer>
                    <TextShimmer duration={1} className="text-xs">
                      Synapsing...
                    </TextShimmer>
                    <TextShimmer duration={1} className="text-xs">
                      Percolating...
                    </TextShimmer>
                    <TextShimmer duration={1} className="text-xs">
                      Thinkfiddling...
                    </TextShimmer>
                  </TextLoop>
                </div>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <Form
        input={input}
        setInput={setInput}
        sendMessage={(message) => sendMessage({ text: message })}
        isLoading={isLoading}
        textareaRef={
          textareaRef as unknown as React.RefObject<HTMLTextAreaElement>
        }
        context={context}
        recentArticles={recentArticles}
        rateLimitRemaining={rateLimitRemaining}
        rateLimitError={rateLimitError!}
      />
    </div>
  )
}
