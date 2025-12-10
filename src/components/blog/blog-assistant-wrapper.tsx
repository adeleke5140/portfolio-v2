import { BlogAssistantClient } from './blog-assistant-client'
import { cookies } from 'next/headers'
import ky from 'ky'
import { RateLimitResponse } from './types'

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.VERCEL_URL ||
  'http://localhost:3001'

export async function BlogAssistantWrapper() {
  let initialMessages: any[] = []
  let rateLimitData: RateLimitResponse | null = null

  console.log('baseUrl', baseUrl)
  console.log('initialMessages---', initialMessages)
  console.log('rateLimitData---', rateLimitData)

  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    const [messagesResponse, rateLimitResponse] = await Promise.all([
      ky(`${baseUrl}/api/initial`, {
        cache: 'no-store',
        headers: {
          Cookie: cookieHeader,
        },
      }).json<any[]>(),
      ky(`${baseUrl}/api/rate-limit`, {
        cache: 'no-store',
        headers: {
          Cookie: cookieHeader,
        },
      }).json<RateLimitResponse>(),
    ])

    initialMessages = messagesResponse
    rateLimitData = rateLimitResponse
  } catch (error) {
    console.error('Error fetching initial data:', error)
  }

  return (
    <BlogAssistantClient
      initialMessages={initialMessages}
      initialRateLimitData={rateLimitData}
    />
  )
}
