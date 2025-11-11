import { mastra } from '@/mastra'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Missing or invalid messages array' },
        { status: 400 }
      )
    }

    // Get the agent from the Mastra instance
    const alfredAgent = mastra.getAgent('alfredAgent')

    // Stream the response with AI SDK v5 format
    const stream = await alfredAgent.stream(messages, {
      format: 'aisdk', // Enable AI SDK v5 compatibility
      memory: {
        thread: 'user-session',
        resource: 'conversation',
      },
    })

    // Return the stream response (AI SDK v5 compatible)
    return stream.toUIMessageStreamResponse()
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
