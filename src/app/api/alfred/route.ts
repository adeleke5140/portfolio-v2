import { getAlfredAgent } from '@/mastra/agents/alfred'
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

    // Get the Alfred agent (will initialize MCP servers and discover tools)
    const alfredAgent = await getAlfredAgent()

    // Stream the response with AI SDK v5 format
    const stream = await alfredAgent.stream(messages, {
      format: 'aisdk', // Enable AI SDK v5 compatibility
      memory: {
        thread: 'alfred-session',
        resource: 'conversation',
      },
    })

    // Return the stream response (AI SDK v5 compatible)
    return stream.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Alfred agent error:', error)
    return NextResponse.json(
      {
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
