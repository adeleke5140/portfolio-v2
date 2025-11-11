'use client'

import { useChat } from '@ai-sdk/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Bot, User } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function AlfredPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/alfred',
  })
  const scrollRef = useRef<HTMLDivElement>(null)
  const [mcpStatus, setMcpStatus] = useState<{ slack: boolean; linear: boolean } | null>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    // Check MCP server status on mount
    fetch('/api/mcp/init')
      .then((res) => res.json())
      .then((data) => setMcpStatus(data))
      .catch(() => setMcpStatus({ slack: false, linear: false }))
  }, [])

  return (
    <div className="flex h-screen flex-col bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold tracking-tight">Alfred</h1>
              <p className="text-sm text-muted-foreground">
                Your AI assistant for Slack and Linear
              </p>
            </div>
            {mcpStatus && (
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      mcpStatus.slack ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                  <span className="text-muted-foreground">Slack</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      mcpStatus.linear ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                  <span className="text-muted-foreground">Linear</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="container mx-auto max-w-3xl px-4 py-6">
          {messages.length === 0 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome to Alfred</CardTitle>
                  <CardDescription>
                    Ask me about your Slack messages or Linear tickets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Try asking:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>What unread messages do I have in Slack?</li>
                      <li>What are my current tickets in Linear?</li>
                      <li>Show me unread messages from the engineering channel</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </div>
                </div>
                {message.role === 'user' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-lg bg-muted px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-foreground [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-foreground"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <div className="border-t bg-card">
        <div className="container mx-auto max-w-3xl px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Alfred about Slack messages or Linear tickets..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
