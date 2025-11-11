'use client'

import * as React from 'react'
import { useChat } from '@ai-sdk/react'
import type { UIMessage } from 'ai'
import { nanoid } from 'nanoid'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const DEFAULT_CHECKIN_PROMPT =
  'Give me a snapshot of unread Slack messages and active Linear tickets, grouped by urgency, with next actions.'

type ChatMessage = UIMessage

type ToolInvocation = {
  toolName?: string
  state?: string
  args?: Record<string, unknown>
  result?: unknown
  toolCallId?: string
}

const roleLabel = (role: ChatMessage['role']) => {
  if (role === 'assistant') return 'Alfred'
  if (role === 'user') return 'You'
  if (role === 'system') return 'System'
  return role.charAt(0).toUpperCase() + role.slice(1)
}

const renderMessageContent = (message: ChatMessage) => {
  if (typeof message.content === 'string') {
    return (
      <p className="whitespace-pre-wrap leading-relaxed text-sm">
        {message.content}
      </p>
    )
  }

  if (Array.isArray(message.content)) {
    return message.content.map((part, index) => {
      if (part.type === 'text') {
        return (
          <p
            key={index}
            className="whitespace-pre-wrap leading-relaxed text-sm"
          >
            {part.text}
          </p>
        )
      }

      if (part.type === 'tool-result') {
        return (
          <pre
            key={index}
            className="rounded-lg bg-ken-secondary/50 p-3 text-xs text-ken-black/80"
          >
            {typeof part.result === 'string'
              ? part.result
              : JSON.stringify(part.result, null, 2)}
          </pre>
        )
      }

      if (part.type === 'tool-call') {
        return (
          <div
            key={index}
            className="rounded-lg border border-dashed border-border bg-white/70 p-3 text-xs text-muted-foreground"
          >
            <p className="font-medium uppercase tracking-wide text-[11px] text-ken-black/70">
              Tool call &bull; {part.toolName}
            </p>
            <pre className="mt-2 whitespace-pre-wrap">
              {JSON.stringify(part.args, null, 2)}
            </pre>
          </div>
        )
      }

      return (
        <pre
          key={index}
          className="rounded-lg bg-ken-secondary/60 p-3 text-xs text-ken-black/80"
        >
          {JSON.stringify(part, null, 2)}
        </pre>
      )
    })
  }

  return null
}

const ToolInvocationTrail = ({ message }: { message: ChatMessage }) => {
  const toolInvocations =
    ((message as unknown as { toolInvocations?: ToolInvocation[] })
      .toolInvocations ?? []) ?? []

  if (toolInvocations.length === 0) {
    return null
  }

  return (
    <div className="mt-3 space-y-2">
      {toolInvocations.map((invocation, index) => (
        <div
          key={invocation.toolCallId ?? index}
          className="rounded-lg border border-dashed border-border bg-white/70 p-3 text-xs"
        >
          <div className="flex items-center gap-2">
            <Badge variant="subtle">
              {invocation.state ? invocation.state : 'called'}
            </Badge>
            <span className="font-medium text-ken-black/80">
              {invocation.toolName ?? 'Unknown tool'}
            </span>
          </div>
          {invocation.args && (
            <pre className="mt-2 max-h-32 overflow-auto whitespace-pre-wrap text-[11px] text-muted-foreground">
              {JSON.stringify(invocation.args, null, 2)}
            </pre>
          )}
          {invocation.result && (
            <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap text-[11px] text-ken-black/80">
              {JSON.stringify(invocation.result, null, 2)}
            </pre>
          )}
        </div>
      ))}
    </div>
  )
}

const AlfredApp = () => {
  const { messages, sendMessage, status, setMessages, error, stop } = useChat({
    api: '/api/agent',
    id: 'alfred-thread',
  })

  const [inputValue, setInputValue] = React.useState('')

  const isLoading = status === 'submitted' || status === 'streaming'

  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = scrollRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages])

  const sendDailyDigest = async () => {
    if (isLoading) return
    await sendMessage({ text: DEFAULT_CHECKIN_PROMPT, messageId: nanoid() })
    setInputValue('')
  }

  const clearConversation = () => {
    stop()
    setMessages([])
    setInputValue('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = inputValue.trim()
    if (!next || isLoading) {
      return
    }
    await sendMessage({ text: next, messageId: nanoid() })
    setInputValue('')
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-8 lg:px-8">
      <div className="flex flex-col gap-2">
        <Badge variant="subtle" className="w-fit uppercase tracking-wide">
          Alfred — AI co-founder
        </Badge>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-ken-black sm:text-4xl">
          What does the team need from me right now?
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Alfred examines Slack for unread conversations and Linear for active
          tickets using MCP tools. Ask for a daily digest or request a focused
          briefing.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            variant="secondary"
            size="sm"
              onClick={() => setInputValue(DEFAULT_CHECKIN_PROMPT)}
          >
            Prefill daily digest
          </Button>
          <Button
            size="sm"
            onClick={sendDailyDigest}
            disabled={isLoading}
          >
            Ask Alfred now
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearConversation}
            disabled={isLoading || messages.length === 0}
          >
            Clear session
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="order-2 h-fit lg:order-1">
          <CardHeader>
            <CardTitle>Workspace checklist</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Alfred connects via MCP. Make sure the backend has credentials in
              the environment where this app runs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 rounded-lg border border-dashed border-border/70 bg-ken-secondary/40 p-4">
              <p className="text-sm font-medium text-ken-black">
                Slack MCP server
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  • Host the{' '}
                  <a
                    href="https://github.com/korotovsky/slack-mcp-server"
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    slack-mcp-server
                  </a>{' '}
                  and expose an HTTPS SSE endpoint.
                </li>
                <li>• Set SLACK_MCP_URL and SLACK_MCP_API_KEY for the agent.</li>
                <li>• Optional headers: SLACK_MCP_WORKSPACE, SLACK_MCP_USER_ID.</li>
              </ul>
            </div>
            <div className="space-y-2 rounded-lg border border-dashed border-border/70 bg-ken-secondary/40 p-4">
              <p className="text-sm font-medium text-ken-black">
                Linear MCP server
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  • Use the official Linear endpoint:{' '}
                  <span className="font-mono text-xs">
                    https://mcp.linear.app/sse
                  </span>
                </li>
                <li>
                  • Provide LINEAR_MCP_URL and LINEAR_MCP_API_KEY (or LINEAR_API_KEY).
                </li>
                <li>• Keep your Linear key scoped to the relevant workspace.</li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground">
              Alfred will report when a server is unreachable during a request,
              so you always know which integration needs attention.
            </p>
          </CardContent>
        </Card>

        <Card className="order-1 flex h-[680px] flex-col lg:order-2">
          <CardHeader className="border-b border-border/70 bg-ken-secondary/40">
            <CardTitle className="font-serif text-2xl">
              Command Center
            </CardTitle>
            <CardDescription>
              Chat with Alfred. He will call MCP tools to pull the latest status
              before responding.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4">
            <ScrollArea className="flex-1">
              <div ref={scrollRef} className="flex h-full flex-col gap-4 py-4 pr-2">
                {messages.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border bg-ken-secondary/40 p-6 text-sm text-muted-foreground">
                    Alfred is ready. Ask for unread Slack threads, Linear
                    workload, or a cross-tool briefing.
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'max-w-full rounded-xl border border-border/70 bg-white p-4 shadow-sm',
                      message.role === 'assistant'
                        ? 'border-ken-black/20 bg-ken-secondary/30'
                        : 'bg-white'
                    )}
                  >
                      <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        {roleLabel(message.role)}
                      </span>
                    </div>
                    <div className="mt-2 space-y-3">
                      {renderMessageContent(message)}
                      <ToolInvocationTrail message={message} />
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-2 w-2 animate-ping rounded-full bg-ken-black/60" />
                    Alfred is consulting Slack and Linear…
                  </div>
                )}
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error.message ||
                      'Something went wrong while contacting Alfred.'}
                  </div>
                )}
              </div>
            </ScrollArea>

            <form
              onSubmit={handleSubmit}
              className="space-y-3 border-t border-border/60 pt-3"
            >
              <Textarea
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ask Alfred for a status report…"
                disabled={isLoading}
              />
              <div className="flex items-center justify-end gap-3">
                <Button
                  type="submit"
                  disabled={isLoading || inputValue.trim().length === 0}
                >
                  {isLoading ? 'Working…' : 'Send to Alfred'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AlfredApp
