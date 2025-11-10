import { mastra } from '@/mastra'
import { RuntimeContext } from '@mastra/core/runtime-context'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

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

    // Get the agent from the Mastra instance
    const kennyAgent = mastra.getAgent('kennyAgent')

    const runtimeContext = new RuntimeContext()
    runtimeContext.set('context', context)
    runtimeContext.set('blogSlug', blogSlug)
    runtimeContext.set('pathname', pathname)

    console.log({ context, blogSlug, pathname })

    // Stream the response with AI SDK v5 format
    const stream = await kennyAgent.stream(messages, {
      format: 'aisdk', // Enable AI SDK v5 compatibility
      runtimeContext
    })

    // Return the stream response (AI SDK v5 compatible)
    return stream.toUIMessageStreamResponse({
      sendSources: true
    })
  } catch (error) {
    console.error('Agent error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
