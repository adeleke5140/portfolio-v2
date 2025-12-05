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
    const { messages, context, blogSlug, pathname } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Missing or invalid messages array' },
        { status: 400 }
      )
    }

    const userId = await getOrCreateUserId()

    const identifier = userId || 'anonymous'
    const { success, remaining, reset } = await ratelimit.limit(identifier)

    if (!success) {
      const resetDate = new Date(reset)
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

    const kennyAgent = mastra.getAgent('kennyAgent')

    const runtimeContext = new RuntimeContext()
    runtimeContext.set('context', context)
    runtimeContext.set('blogSlug', blogSlug)
    runtimeContext.set('pathname', pathname)

    const existingThreadId = userId

    const stream = await kennyAgent.stream(messages, {
      format: 'aisdk',
      runtimeContext,
      memory: {
        thread: existingThreadId,
        resource: 'chat-session',
      },
    })

    const response = stream.toUIMessageStreamResponse({})

    // Add rate limit info to headers
    response.headers.set('X-RateLimit-Limit', '10')
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', reset.toString())

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
