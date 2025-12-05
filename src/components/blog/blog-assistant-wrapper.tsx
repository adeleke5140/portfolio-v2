import { getInitialMessages } from '@/lib/chat'
import { BlogAssistantClient } from './blog-assistant-client'

export async function BlogAssistantWrapper() {
  const initialMessages = await getInitialMessages()

  return <BlogAssistantClient initialMessages={initialMessages} />
}
