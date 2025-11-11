import { NextResponse } from 'next/server'
import { convertMessages } from '@mastra/core/agent'
import { mastra } from '@/mastra'

const myAgent = mastra.getAgent('alfredAgent')

export async function GET() {
  const result = await (
    await myAgent.getMemory()
  )?.query({
    threadId: 'user-session',
  })

  const messages = convertMessages(result?.uiMessages || []).to('AIV5.UI')
  return NextResponse.json(messages)
}
