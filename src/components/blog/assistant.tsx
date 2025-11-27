'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, UIMessage } from 'ai'
import { Loader2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
import { AssistantHeader } from './assistant-header'
import { Form } from './form'

function generateNewThreadId() {
  return 'new'
}
interface ChatSidebarProps {
  threadId?: string
  isOpen: boolean
  onClose: () => void
  recentArticles: Array<{ id: string; title: string }>
  savedMessages: UIMessage[]
  isLoadingSavedMessages: boolean
}

export const KenAssistant = ({
  threadId,
  isOpen,
  onClose,
  recentArticles,
  savedMessages,
  isLoadingSavedMessages,
}: ChatSidebarProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [input, setInput] = useState('')
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null)
  const [loadingMessageId, setLoadingMessageId] = useState<string | null>(null)
  const [pausedMessageId, setPausedMessageId] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  const pathname = usePathname()
  const currentPath = pathname.split('/').filter(Boolean)
  const isOnBlogPost = currentPath[0] === 'blog'
  const context = isOnBlogPost
    ? currentPath[1] == null
      ? 'blog'
      : currentPath[1]
    : 'blog'

  const urlThreadId = searchParams.get('t')
  const initialThreadId = urlThreadId ? urlThreadId : generateNewThreadId()

  useEffect(() => {
    if (!initialThreadId) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('t', initialThreadId)
    router.push(`${pathname}?${params.toString()}`)
  }, [initialThreadId, pathname, searchParams, router])

  const { messages, sendMessage, setMessages, status } = useChat({
    id: initialThreadId,
    transport: new DefaultChatTransport({
      api: '/api/agent',
      body: {
        context: context,
        pathname: pathname,
        threadId: initialThreadId,
      },
    }),
  })

  const handleNewChat = () => {
    const newThreadId = generateNewThreadId()

    const params = new URLSearchParams(searchParams.toString())
    params.set('t', newThreadId)

    const url = `${pathname}?${params.toString()}`

    setMessages([])
    router.push(url, { scroll: false })
  }

  // Hydrate the chat store from saved messages when they change
  useEffect(() => {
    if (!isOpen) return
    if (isLoadingSavedMessages) return
    if (!savedMessages || savedMessages.length === 0) return

    setMessages(savedMessages)
  }, [
    initialThreadId,
    isLoadingSavedMessages,
    isOpen,
    savedMessages,
    setMessages,
  ])

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

  const handlePlayAudio = async (messageId: string, text: string) => {
    // If currently playing this message, pause it
    if (playingMessageId === messageId && audioRef.current) {
      audioRef.current.pause()
      setPausedMessageId(messageId)
      return
    }

    // If paused, resume playback
    if (pausedMessageId === messageId && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error('Error resuming audio:', error)
        setPlayingMessageId(null)
        setPausedMessageId(null)
      })
      setPausedMessageId(null)
      return
    }

    // Stop any currently playing audio and clear it
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      setPlayingMessageId(null)
      setPausedMessageId(null)
    }

    setLoadingMessageId(messageId)

    try {
      const response = await fetch('/api/voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        console.error('Failed to generate audio:', response.statusText)
        setLoadingMessageId(null)
        return
      }

      // Create audio blob and play it
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)

      // Create new audio element and play
      const audio = new Audio(audioUrl)
      audioRef.current = audio
      setLoadingMessageId(null)

      // Track when audio actually starts playing
      audio.addEventListener('play', () => {
        setPlayingMessageId(messageId)
      })

      // Track when audio is paused
      audio.addEventListener('pause', () => {
        // Only clear if it's actually paused and not ended
        if (!audio.ended) {
          setPlayingMessageId(null)
          setPausedMessageId(messageId)
        }
      })

      // Track when audio is actively playing (after buffering)
      audio.addEventListener('playing', () => {
        setPlayingMessageId(messageId)
      })

      // Clean up object URL after playback completes
      audio.addEventListener('ended', () => {
        setPlayingMessageId(null)
        setPausedMessageId(null)
        URL.revokeObjectURL(audioUrl)
        // Clear the audio ref when finished
        if (audioRef.current === audio) {
          audioRef.current = null
        }
      })

      audio.addEventListener('error', () => {
        setPlayingMessageId(null)
        setPausedMessageId(null)
        URL.revokeObjectURL(audioUrl)
      })

      audio.play().catch((error) => {
        console.error('Error playing audio:', error)
        setPlayingMessageId(null)
        setPausedMessageId(null)
        URL.revokeObjectURL(audioUrl)
      })
    } catch (error) {
      console.error('Error generating audio:', error)
      setLoadingMessageId(null)
      setPausedMessageId(null)
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  const isLoadingInitially =
    isLoadingSavedMessages && savedMessages?.length === 0
  return (
    <div className="flex  h-full flex-col">
      <AssistantHeader onClose={onClose} onNewChat={handleNewChat} />

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
        {isLoadingInitially ? (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Loader className="text-[var(--primary)] duration-500" />
          </div>
        ) : null}
        <ConversationContent className="p-4">
          {messages.map((message, messageIndex) => {
            // Check if message has any text content
            const hasTextContent = message.parts.some(
              (part) => part.type === 'text' && part.text && part.text.trim()
            )

            // Skip rendering empty assistant messages when thinking
            const isEmptyAssistant =
              !hasTextContent && message.role === 'assistant'
            if (isEmptyAssistant) {
              return null
            }

            // Extract text content for assistant messages
            const textParts =
              message.role === 'assistant'
                ? message.parts.filter(
                    (part): part is { type: 'text'; text: string } =>
                      part.type === 'text' &&
                      typeof part.text === 'string' &&
                      part.text.trim().length > 0
                  )
                : []

            const fullText =
              textParts.length > 0
                ? textParts.map((part) => part.text).join(' ')
                : ''

            const isPlaying = playingMessageId === message.id
            const isPaused = pausedMessageId === message.id
            const isLoadingAudio = loadingMessageId === message.id
            const showPlayButton =
              message.role === 'assistant' && fullText.length > 0

            return (
              <Message
                from={message.role as 'user' | 'assistant'}
                key={message.id}
              >
                <MessageContent className="relative group">
                  <div className="flex flex-col gap-2">
                    <div>
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
                    </div>
                    {showPlayButton && (
                      <button
                        onClick={() => handlePlayAudio(message.id, fullText)}
                        disabled={isLoadingAudio}
                        className="self-start p-1.5 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={
                          isPlaying
                            ? 'Pause audio'
                            : isPaused
                            ? 'Resume audio'
                            : 'Play audio'
                        }
                      >
                        {isLoadingAudio ? (
                          <Loader2 className="size-4 animate-spin text-gray-600" />
                        ) : isPlaying ? (
                          <svg
                            id="sound-on"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="size-4"
                          >
                            <polygon points="17 15 17 14 16 14 16 13 17 13 17 11 16 11 16 10 17 10 17 9 18 9 18 10 19 10 19 14 18 14 18 15 17 15" />
                            <polygon points="23 10 23 14 22 14 22 16 21 16 21 17 20 17 20 18 19 18 19 17 18 17 18 16 19 16 19 15 20 15 20 14 21 14 21 10 20 10 20 9 19 9 19 8 18 8 18 7 19 7 19 6 20 6 20 7 21 7 21 8 22 8 22 10 23 10" />
                            <path d="m11,2v1h-1v1h-1v1h-1v1h-1v1h-1v1H1v8h5v1h1v1h1v1h1v1h1v1h1v1h3V2h-3Zm1,17h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1H3v-4h4v-1h1v-1h1v-1h1v-1h1v-1h1v14Z" />
                          </svg>
                        ) : (
                          <svg
                            id="sound-paused"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="size-4"
                          >
                            <path d="m11,2v1h-1v1h-1v1h-1v1h-1v1h-1v1H1v8h5v1h1v1h1v1h1v1h1v1h1v1h3V2h-3Zm1,17h-1v-1h-1v-1h-1v-1h-1v-1h-1v-1H3v-4h4v-1h1v-1h1v-1h1v-1h1v-1h1v14Z" />
                            <rect x="17" y="9" width="2" height="6" />
                            <rect x="21" y="9" width="2" height="6" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </MessageContent>
              </Message>
            )
          })}

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
      />
    </div>
  )
}
