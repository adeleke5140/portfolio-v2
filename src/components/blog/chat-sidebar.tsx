'use client'

import { cn } from '@/lib/utils'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { RotateCcw, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Shimmer } from './shimmer'

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
}

function toSpaceCase(str: string) {
  return str?.replace(/([A-Z])/g, ' $1').trim()
}

export const ChatSidebar = ({ isOpen, onClose }: ChatSidebarProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState('')

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/agent',
    }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  const pathname = usePathname()
  const path = toSpaceCase(pathname.split('/')[2])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when sidebar opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'fixed right-2 h-[400px]  bottom-2 z-50',
              'w-full md:w-[400px]',
              'bg-white border border-gray-200',
              'flex flex-col rounded-[16px] shadow-2xl'
            )}
          >
            {/* Header */}
            <div className="flex rounded-t-[16px] items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <div>
                <h2 className="font-semibold text-gray-900">Ask Kenny</h2>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    onClick={() => {}}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Clear chat"
                  >
                    <RotateCcw className="w-4 h-4 text-gray-600" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 text-sm">
                  <p>Ask me about {path}</p>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id}>
                  {message.role === 'user' ? 'User: ' : 'AI: '}
                  {message.parts.map((part, index) =>
                    part.type === 'text' ? (
                      <span key={index}>{part.text}</span>
                    ) : null
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center justify-center p-8 size-full">
                  <Shimmer>Thinking a bit...</Shimmer>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (input && input.trim()) {
                  sendMessage({ text: input })
                  setInput('')
                }
              }}
              className="p-4 border-t rounded-b-xl border-gray-200 bg-white"
            >
              <div className="flex">
                <input
                  ref={inputRef}
                  type="text"
                  value={input || ''}
                  onChange={(e) => setInput(e.target.value || '')}
                  placeholder="Ask Kenny anything..."
                  disabled={isLoading}
                  className={cn(
                    'flex-1 px-4 py-2.5',
                    'border border-gray-300 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]',
                    'outline-none transition-all',
                    'disabled:bg-gray-100 disabled:cursor-not-allowed',
                    'text-sm'
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    'px-4 py-2.5 ',
                    'bg-[var(--primary)] rounded-r-md text-white',
                    'hover:bg-[#d66800] active:scale-95',
                    'transition-all',
                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--primary)]',
                    'flex items-center justify-center'
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="currentColor"
                  >
                    <path d="m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-1,6h-1v2h-1v2h-2v1h-2v1h-6v-1h-2v-1h-2v-2h-1v-2h-1v-6h1v-2h1v-2h2v-1h2v-1h6v1h2v1h2v2h1v2h1v6Z" />
                    <polygon points="17 11 17 13 16 13 16 14 15 14 15 15 14 15 14 16 13 16 13 17 12 17 12 13 6 13 6 11 12 11 12 7 13 7 13 8 14 8 14 9 15 9 15 10 16 10 16 11 17 11" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
