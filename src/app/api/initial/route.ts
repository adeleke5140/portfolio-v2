import { NextRequest, NextResponse } from 'next/server'
import { getInitialMessages } from '@/lib/chat'

export async function GET(req: NextRequest) {
  try {
    const messages = await getInitialMessages()
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching initial messages:', error)
    return NextResponse.json([])
  }
}
