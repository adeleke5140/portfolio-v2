import { convertMessages } from '@mastra/core/agent'
import { mastra } from '@/mastra'
import { getOrCreateUserId } from '@/lib/session'

const myAgent = mastra.getAgent('kennyAgent')

export async function getInitialMessages() {
  const mem = await myAgent.getMemory()
  if (!mem) return []

  try {
    const threadId = await getOrCreateUserId()

    const res = await mem.query({
      threadId,
      resourceId: 'chat-session',
    })

    // Convert to UI format
    const messages = convertMessages(res?.uiMessages || []).to('AIV5.UI')
    return messages
  } catch (error) {
    console.error('Error fetching initial messages:', error)
    return []
  }
}
