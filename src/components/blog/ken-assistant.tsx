'use client'

import { cn } from '@/lib/utils'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '../ai-elements/conversation'
import { Loader } from '../ai-elements/loader'
import { Message, MessageContent } from '../ai-elements/message'
import { Response } from '../ai-elements/response'
import { TextShimmer } from '../ai-elements/shimmer'
import { blog } from '../craft/navigation/navigation'
interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const KenAssistant = ({ isOpen, onClose }: ChatSidebarProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [input, setInput] = useState('')

  const pathname = usePathname()

  // Extract context information from the current path
  const pathSegments = pathname.split('/').filter(Boolean)
  const isOnBlogPost = pathSegments[0] === 'blog' && pathSegments[1]
  const blogSlug = isOnBlogPost ? pathSegments[1] : null
  const context = isOnBlogPost ? 'blog' : pathSegments[0] || 'home'

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/agent',
      body: {
        context: context, // 'blog', 'craft', 'home', etc.
        blogSlug: blogSlug, // The specific blog post slug if on a blog post
        pathname: pathname, // Full pathname for reference
      },
    }),
  })

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

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '50%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '50%', opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className={cn(
              'fixed right-2 h-fit max-h-[calc(100%_-_20px)] min-h-[500px]  bottom-2 z-50',
              'w-full md:w-[450px]',
              'bg-white border border-gray-200',
              'flex flex-col rounded-t-[20px] rounded-b-[48px] shadow-2xl'
            )}
          >
            <div className="flex rounded-t-3xl items-center justify-between p-4">
              <div>
                <h2 className="font-serif text-gray-900">Ask Ken</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="window-close-solid"
                    viewBox="0 0 24 24"
                    className="size-5 "
                  >
                    <path
                      fill="var(--primary)"
                      d="m22,2v-1H2v1h-1v20h1v1h20v-1h1V2h-1Zm-4,7h-1v1h-1v1h-1v2h1v1h1v1h1v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h-2v1h-1v1h-1v1h-1v-1h-1v-1h-1v-1h1v-1h1v-1h1v-2h-1v-1h-1v-1h-1v-1h1v-1h1v-1h1v1h1v1h1v1h2v-1h1v-1h1v-1h1v1h1v1h1v1Z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <Conversation className="flex-1 overflow-y-auto">
              <ConversationContent className="p-4">
                {messages.map((message, messageIndex) => {
                  // Check if message has any text content
                  const hasTextContent = message.parts.some(
                    (part) =>
                      part.type === 'text' && part.text && part.text.trim()
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
                      <MessageContent>
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case 'text':
                              return (
                                <Response key={`${message.id}-${i}`}>
                                  {part.text}
                                </Response>
                              )
                            default:
                              return null
                          }
                        })}
                      </MessageContent>
                    </Message>
                  )
                })}

                {/* Show thinking indicator when waiting for response */}
                {isThinking && (
                  <Message from="assistant" key="thinking">
                    <MessageContent>
                      <div className="flex items-center">
                        <TextShimmer duration={1} className="text-xs">
                          Gnuggling....
                        </TextShimmer>
                      </div>
                    </MessageContent>
                  </Message>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (input && input.trim()) {
                  sendMessage({ text: input })
                  setInput('')
                }
              }}
              className="p-4 rounded-b-3xl  bg-white"
            >
              <div className="relative">
                <div
                  className={cn(
                    'flex flex-col focus-within:outline focus-within:outline-[var(--primary)] shadow-[0px_10px_24px_-6px_#0000001a,0px_2px_4px_-1px_#0000000f,0_0_0_1px_#54483114] gap-2 px-4 py-2.5 h-32 rounded-[1.25rem] border-r-0'
                  )}
                >
                  <div className="text-center text-gray-500 text-sm">
                    <p className="border flex items-center gap-1 border-[#dcdcdc]/50 bg-gray-50 rounded-full text-xs px-[10px] py-[5px] text-left w-fit">
                      {blog}
                      {blogSlug || context}
                    </p>
                  </div>

                  <textarea
                    ref={textareaRef}
                    value={input || ''}
                    onChange={(e) => setInput(e.target.value || '')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage({ text: input })
                        setInput('')
                      }
                    }}
                    placeholder={
                      context === 'blog'
                        ? "You can ask about what I've written."
                        : `Ask Kenny about ${context}`
                    }
                    disabled={isLoading}
                    className="w-full h-full outline-none  disabled:bg-inherit resize-none disabled:cursor-not-allowed text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className={cn(
                    'size-8 absolute bottom-2 right-2',
                    'bg-[var(--primary)] rounded-full text-white',
                    'hover:bg-[var(--primary)] active:scale-95',
                    'transition-all',
                    'disabled:cursor-not-allowed disabled:hover:bg-[var(--primary)]',
                    'flex items-center justify-center'
                  )}
                >
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="size-5 -rotate-90"
                      fill="currentColor"
                    >
                      <path d="m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-1,6h-1v2h-1v2h-2v1h-2v1h-6v-1h-2v-1h-2v-2h-1v-2h-1v-6h1v-2h1v-2h2v-1h2v-1h6v1h2v1h2v2h1v2h1v6Z" />
                      <polygon points="17 11 17 13 16 13 16 14 15 14 15 15 14 15 14 16 13 16 13 17 12 17 12 13 6 13 6 11 12 11 12 7 13 7 13 8 14 8 14 9 15 9 15 10 16 10 16 11 17 11" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
