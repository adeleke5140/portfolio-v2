import { NextRequest, NextResponse } from 'next/server'
import { getInitialMessages } from '@/lib/chat'
import { getOrCreateUserId } from '@/lib/session'

export async function GET(_: NextRequest) {
  try {
    const userId = await getOrCreateUserId()
    const messages = await getInitialMessages(userId)
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching initial messages:', error)
    return NextResponse.json([])
  }
}
