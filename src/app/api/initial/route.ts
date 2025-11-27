import { NextRequest, NextResponse } from 'next/server'
import { convertMessages } from '@mastra/core/agent'
import { mastra } from '@/mastra'

const myAgent = mastra.getAgent('kennyAgent')

export async function GET(req: NextRequest) {
  const mem = await myAgent.getMemory()
  if (!mem) return NextResponse.json([])

  const searchParams = req.nextUrl.searchParams
  const threadIdFromQuery = searchParams.get('threadId')

  const threadId = threadIdFromQuery || 'blog'

  try {
    const res = await mem.query({
      threadId,
      resourceId: 'chat-session',
    })

    const messages = convertMessages(res?.uiMessages || []).to('AIV5.UI')
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching initial messages:', error)
    return NextResponse.json([])
  }
}
