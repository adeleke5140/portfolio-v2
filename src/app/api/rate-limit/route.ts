import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'
import { getOrCreateUserId } from '@/lib/session'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Initialize Redis client (same as in agent route)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Create the same rate limiter configuration as in agent route
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, '24 h'),
  analytics: true,
  prefix: '@upstash/ratelimit',
})

export async function GET(req: NextRequest) {
  try {
    const userId = await getOrCreateUserId()
    const identifier = userId || 'anonymous'

    try {
      // Use getRemaining to consistently check the limit using the same algorithm/keys
      const { remaining, reset } = await ratelimit.getRemaining(identifier)

      return NextResponse.json({
        limit: 10,
        remaining,
        reset,
        resetAt: new Date(reset).toISOString(),
      })
    } catch (e) {
      console.error('Error checking rate limit:', e)
    }

    // Fallback
    return NextResponse.json({
      limit: 10,
      remaining: 10,
      reset: Date.now() + 24 * 60 * 60 * 1000,
      resetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    })
  } catch (error) {
    console.error('Error fetching rate limit:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch rate limit',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
