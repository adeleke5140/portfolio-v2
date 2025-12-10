import { convertMessages } from '@mastra/core/agent'
import { mastra } from '@/mastra'

const myAgent = mastra.getAgent('kennyAgent')

export async function getInitialMessages(userId: string) {
  const mem = await myAgent.getMemory()
  if (!mem) return []

  try {
    const res = await mem.query({
      threadId: userId,
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
