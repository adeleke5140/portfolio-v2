import { mastra } from '@/mastra'
import { RuntimeContext } from '@mastra/core/runtime-context'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, context, blogSlug, pathname, threadId } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Missing or invalid messages array' },
        { status: 400 }
      )
    }

    const kennyAgent = mastra.getAgent('kennyAgent')

    const runtimeContext = new RuntimeContext()
    runtimeContext.set('context', context)
    runtimeContext.set('blogSlug', blogSlug)
    runtimeContext.set('pathname', pathname)

    const existingThreadId = threadId
      ? threadId
      : `session-${Date.now().toString(36).slice(0, 8)}`

    const stream = await kennyAgent.stream(messages, {
      format: 'aisdk',
      runtimeContext,
      memory: {
        thread: existingThreadId,
        resource: 'chat-session',
      },
    })

    const response = stream.toUIMessageStreamResponse({})
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
