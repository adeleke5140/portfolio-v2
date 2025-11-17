import { NextResponse } from 'next/server'
import { convertMessages } from '@mastra/core/agent'
import { mastra } from '@/mastra'

const myAgent = mastra.getAgent('kennyAgent')

export async function GET() {
  const mem = await myAgent.getMemory()
  if (!mem) return []

  const res = await mem.query({
    threadId: 'blog',
    resourceId: 'chat-sesion',
  })

  const messages = convertMessages(res?.uiMessages || []).to('AIV5.UI')
  return NextResponse.json(messages)
}
