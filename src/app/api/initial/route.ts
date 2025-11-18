import { NextRequest, NextResponse } from 'next/server'
import { convertMessages } from '@mastra/core/agent'
import { mastra } from '@/mastra'

const myAgent = mastra.getAgent('kennyAgent')

export async function GET(req: NextRequest) {
  const mem = await myAgent.getMemory()
  if (!mem) return NextResponse.json([])

  // Get threadId from query params, default to 'blog'
  const searchParams = req.nextUrl.searchParams
  const blogSlug = searchParams.get('blogSlug')
  const threadId = blogSlug || 'blog'

  const res = await mem.query({
    threadId,
    resourceId: 'chat-session',
  })

  const messages = convertMessages(res?.uiMessages || []).to('AIV5.UI')
  return NextResponse.json(messages)
}
