import { mastra } from '@/mastra'
import { getOrCreateUserId } from '@/lib/session'
import { RuntimeContext } from '@mastra/core/runtime-context'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, '24 h'),
  analytics: true,
  prefix: '@upstash/ratelimit',
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, context, pathname } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Missing or invalid messages array' },
        { status: 400 }
      )
    }

    const userId = await getOrCreateUserId()

    let remaining = 10
    let reset = Date.now() + 24 * 60 * 60 * 1000

    if (process.env.NODE_ENV === 'production') {
      const identifier = userId || 'anonymous'
      const result = await ratelimit.limit(identifier)

      if (!result.success) {
        const resetDate = new Date(result.reset)
        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            message:
              'You have reached your daily limit of 10 messages. Please try again tomorrow.',
            remaining: 0,
            resetAt: resetDate.toISOString(),
          },
          { status: 429 }
        )
      }
      remaining = result.remaining
      reset = result.reset
    }

    const kennyAgent = mastra.getAgent('kennyAgent')

    const runtimeContext = new RuntimeContext<{
      context: string
      pathname: string
    }>()
    runtimeContext.set('context', context)
    runtimeContext.set('pathname', pathname)

    const existingThreadId = userId

    // Only send the last user message to the agent.
    // The agent will fetch conversation history from memory itself.
    // This prevents duplicate message ID errors when the client sends
    // the full history that's already stored in memory.
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop()
    const messagesToSend = lastUserMessage ? [lastUserMessage] : messages

    const stream = await kennyAgent.stream(messagesToSend, {
      format: 'aisdk',
      runtimeContext,
      memory: {
        thread: existingThreadId,
        resource: 'chat-session',
      },
    })

    const response = stream.toUIMessageStreamResponse({})

    // Add rate limit info to headers
    if (process.env.NODE_ENV === 'production') {
      response.headers.set('X-RateLimit-Limit', '10')
      response.headers.set('X-RateLimit-Remaining', remaining.toString())
      response.headers.set('X-RateLimit-Reset', reset.toString())
    }

    return response
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
