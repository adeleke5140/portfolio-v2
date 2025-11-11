'use client'

import { useChat } from 'ai/react'
import { Send, Loader2 } from 'lucide-react'
import { useRef, useEffect } from 'react'

// Pixel art robot icon as SVG
const PixelRobot = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Antenna */}
    <rect x="14" y="2" width="4" height="4" fill="currentColor"/>
    <rect x="12" y="6" width="8" height="2" fill="currentColor"/>
    {/* Head */}
    <rect x="8" y="8" width="16" height="12" fill="currentColor"/>
    <rect x="6" y="10" width="2" height="8" fill="currentColor"/>
    <rect x="24" y="10" width="2" height="8" fill="currentColor"/>
    {/* Eyes */}
    <rect x="12" y="12" width="4" height="4" fill="#000"/>
    <rect x="20" y="12" width="4" height="4" fill="#000"/>
    {/* Mouth */}
    <rect x="14" y="18" width="2" height="2" fill="#000"/>
    <rect x="18" y="18" width="2" height="2" fill="#000"/>
    {/* Body */}
    <rect x="10" y="20" width="12" height="8" fill="currentColor"/>
    {/* Arms */}
    <rect x="4" y="22" width="6" height="4" fill="currentColor"/>
    <rect x="22" y="22" width="6" height="4" fill="currentColor"/>
    {/* Legs */}
    <rect x="12" y="28" width="4" height="4" fill="currentColor"/>
    <rect x="18" y="28" width="4" height="4" fill="currentColor"/>
  </svg>
)

// Pixel art user icon
const PixelUser = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Head */}
    <rect x="10" y="6" width="12" height="10" fill="currentColor"/>
    <rect x="8" y="8" width="2" height="6" fill="currentColor"/>
    <rect x="22" y="8" width="2" height="6" fill="currentColor"/>
    {/* Eyes */}
    <rect x="12" y="10" width="2" height="2" fill="#000"/>
    <rect x="18" y="10" width="2" height="2" fill="#000"/>
    {/* Body */}
    <rect x="8" y="16" width="16" height="10" fill="currentColor"/>
    <rect x="6" y="18" width="2" height="6" fill="currentColor"/>
    <rect x="24" y="18" width="2" height="6" fill="currentColor"/>
    {/* Legs */}
    <rect x="10" y="26" width="4" height="6" fill="currentColor"/>
    <rect x="18" y="26" width="4" height="6" fill="currentColor"/>
  </svg>
)

export default function AlfredPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/alfred',
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-screen bg-[#f5f5f5] dark:bg-[#1a1a1a]" style={{ imageRendering: 'pixelated' }}>
      {/* Pixel art header */}
      <header className="border-b-4 border-black dark:border-white bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#6B46C1] text-white flex items-center justify-center" style={{ imageRendering: 'pixelated' }}>
                <PixelRobot size={40} />
              </div>
              <div>
                <h1 className="font-mono text-2xl font-bold text-black dark:text-white tracking-tight">
                  ALFRED.EXE
                </h1>
                <p className="font-mono text-xs text-gray-600 dark:text-gray-400 tracking-wide">
                  AI COFOUNDER v1.0
                </p>
              </div>
            </div>
            <a
              href="/alfred/connections"
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white font-mono font-bold text-xs hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              CONNECTIONS
            </a>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-[#f5f5f5] dark:bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
              <div className="w-24 h-24 bg-[#6B46C1] text-white flex items-center justify-center border-4 border-black dark:border-white" style={{ imageRendering: 'pixelated' }}>
                <PixelRobot size={80} />
              </div>
              <div className="space-y-3">
                <h2 className="font-mono text-3xl font-bold text-black dark:text-white tracking-tight">
                  ALFRED AI
                </h2>
                <p className="font-mono text-sm text-gray-700 dark:text-gray-300 max-w-md tracking-wide">
                  &gt; Query Slack messages<br/>
                  &gt; Manage Linear tickets<br/>
                  &gt; Stay organized
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-2xl">
                <button
                  onClick={() => {
                    handleInputChange({
                      target: { value: 'What unread messages do I have in Slack?' },
                    } as any)
                  }}
                  className="p-4 text-left bg-white dark:bg-[#2a2a2a] border-4 border-black dark:border-white font-mono hover:bg-[#6B46C1] hover:text-white transition-colors"
                >
                  <p className="text-sm font-bold tracking-wide">
                    [SLACK] CHECK MESSAGES
                  </p>
                  <p className="text-xs mt-1 opacity-75">
                    &gt; What unread messages?
                  </p>
                </button>
                <button
                  onClick={() => {
                    handleInputChange({
                      target: { value: 'What are my current tickets in Linear?' },
                    } as any)
                  }}
                  className="p-4 text-left bg-white dark:bg-[#2a2a2a] border-4 border-black dark:border-white font-mono hover:bg-[#6B46C1] hover:text-white transition-colors"
                >
                  <p className="text-sm font-bold tracking-wide">
                    [LINEAR] VIEW TICKETS
                  </p>
                  <p className="text-xs mt-1 opacity-75">
                    &gt; Show current tickets
                  </p>
                </button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 mb-6 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 bg-[#6B46C1] text-white flex items-center justify-center flex-shrink-0 border-2 border-black dark:border-white" style={{ imageRendering: 'pixelated' }}>
                  <PixelRobot size={32} />
                </div>
              )}
              
              <div
                className={`max-w-[75%] px-4 py-3 border-4 font-mono text-sm ${
                  message.role === 'user'
                    ? 'bg-[#4A90E2] border-black dark:border-white text-white'
                    : 'bg-white dark:bg-[#2a2a2a] border-black dark:border-white text-black dark:text-white'
                }`}
                style={{ imageRendering: 'pixelated' }}
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </div>
              </div>

              {message.role === 'user' && (
                <div className="w-10 h-10 bg-[#4A90E2] text-white flex items-center justify-center flex-shrink-0 border-2 border-black dark:border-white" style={{ imageRendering: 'pixelated' }}>
                  <PixelUser size={32} />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 mb-6">
              <div className="w-10 h-10 bg-[#6B46C1] text-white flex items-center justify-center flex-shrink-0 border-2 border-black dark:border-white" style={{ imageRendering: 'pixelated' }}>
                <PixelRobot size={32} />
              </div>
              <div className="bg-white dark:bg-[#2a2a2a] border-4 border-black dark:border-white px-4 py-3 font-mono text-sm">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Pixel art input */}
      <div className="border-t-4 border-black dark:border-white bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="> Type your query..."
              className="flex-1 px-4 py-3 border-4 border-black dark:border-white bg-white dark:bg-[#2a2a2a] text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-mono text-sm focus:outline-none focus:border-[#6B46C1] dark:focus:border-[#6B46C1]"
              disabled={isLoading}
              style={{ imageRendering: 'pixelated' }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-[#6B46C1] border-4 border-black dark:border-white text-white font-mono font-bold hover:bg-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              style={{ imageRendering: 'pixelated' }}
            >
              <Send className="w-4 h-4" />
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
