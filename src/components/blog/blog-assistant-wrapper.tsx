import { BlogAssistantClient } from './blog-assistant-client'
import { cookies } from 'next/headers'
import ky from 'ky'

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.VERCEL_URL ||
  'http://localhost:3001'

export async function BlogAssistantWrapper() {
  let initialMessages = []

  try {
    // Get the cookie header to forward to the API route
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    const response = (await ky(`${baseUrl}/api/initial`, {
      cache: 'no-store',
      headers: {
        Cookie: cookieHeader,
      },
    }).json()) as any[]

    initialMessages = response
  } catch (error) {
    console.error('Error fetching initial messages:', error)
  }

  return <BlogAssistantClient initialMessages={initialMessages} />
}
