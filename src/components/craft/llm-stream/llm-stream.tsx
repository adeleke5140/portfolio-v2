'use client'

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Message, MessageContent } from '@/components/ai-elements/message'
import { Response } from '@/components/ai-elements/response'
import { TextEffect } from '@/components/ai-elements/text-effect'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { nunito } from '../split-to-edit/split-to-edit'
import { CUSTOM_RESPONSES } from './responses'

type MessageType = {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

export const LLMStream = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<MessageType[]>([])

  const handleSend = () => {
    if (!input.trim()) return

    const userId = `user-${Date.now()}`
    const userMessage: MessageType = {
      id: userId,
      role: 'user',
      content: input.trim(),
      isStreaming: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // Mark user message as done streaming after TextEffect completes
    // Slower streaming for better visual effect - 70ms per character
    const userStreamDuration = userMessage.content.length * 70
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === userId ? { ...msg, isStreaming: false } : msg
        )
      )
    }, userStreamDuration)

    // Add a delay before showing the assistant response
    setTimeout(() => {
      const randomResponse =
        CUSTOM_RESPONSES[Math.floor(Math.random() * CUSTOM_RESPONSES.length)]

      const assistantId = `assistant-${Date.now()}`
      const assistantMessage: MessageType = {
        id: assistantId,
        role: 'assistant',
        content: randomResponse,
        isStreaming: true,
      }

      setMessages((prev) => [...prev, assistantMessage])

      // After streaming completes, mark as not streaming
      // Slower streaming for better visual effect - 70ms per character
      const assistantStreamDuration = randomResponse.length * 70
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, isStreaming: false } : msg
          )
        )
      }, assistantStreamDuration)
    }, 500 + Math.random() * 1000) // 0.5-1.5 second delay before response
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="bg-[oklch(0.811_0.000_0/0.11)] llm-stream overflow-hidden shadow-xs w-80 h-96 pb-6 rounded-[40px] flex flex-col">
      <Conversation>
        <ConversationContent className="px-8 py-2">
          {messages.map((message) => (
            <Message from={message.role} key={message.id}>
              <MessageContent
                style={{
                  fontFamily: 'Nunito',
                }}
                className="group-[.is-user]:bg-white font-medium group-[.is-assistant]:px-0 group-[.is-user]:!py-2 !rounded-br-none"
              >
                {message.isStreaming ? (
                  <TextEffect
                    preset="fade-in-blur"
                    per="char"
                    className={nunito.className}
                  >
                    {message.content}
                  </TextEffect>
                ) : (
                  <Response className={nunito.className}>
                    {message.content}
                  </Response>
                )}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="relative  px-4">
        <Input
          style={{
            fontFamily: 'Nunito',
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask..."
          className={cn(
            'text-ken-grey !pr-12 rounded-full shadow-sm border-white bg-white font-semibold py-5 px-5 focus:shadow-sm focus-visible:ring-0 focus-visible:ring-offset-0',
            nunito.className
          )}
        />
        <Button
          variant={'ghost'}
          onClick={handleSend}
          className={cn(
            'absolute opacity-0 transition-[transform,opacity] translate-x-2 duration-300 rounded-lg top-[8%] right-4',
            input ? 'opacity-100 translate-x-0 ' : ''
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M184,104v32a8,8,0,0,1-8,8H99.31l10.35,10.34a8,8,0,0,1-11.32,11.32l-24-24a8,8,0,0,1,0-11.32l24-24a8,8,0,0,1,11.32,11.32L99.31,128H168V104a8,8,0,0,1,16,0Zm48-48V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Z"></path>
          </svg>
        </Button>
      </div>
    </div>
  )
}
