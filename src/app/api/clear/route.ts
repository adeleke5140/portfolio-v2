import { NextRequest, NextResponse } from 'next/server'
import { mastra } from '@/mastra'

const myAgent = mastra.getAgent('kennyAgent')

export async function DELETE(req: NextRequest) {
  try {
    const mem = await myAgent.getMemory()
    if (!mem) {
      return NextResponse.json({
        success: true,
        message: 'No memory configured',
      })
    }

    // Get threadId from query params, default to 'blog'
    const searchParams = req.nextUrl.searchParams
    const blogSlug = searchParams.get('blogSlug')
    const threadId = blogSlug || 'blog'

    // Query messages to get their IDs
    const res = await mem.query({
      threadId,
      resourceId: 'chat-session',
    })

    // Extract message IDs
    const messageIds = res?.uiMessages?.map((message) => message.id) || []

    if (messageIds.length > 0) {
      // Delete all messages
      await mem.deleteMessages(messageIds)
    }

    return NextResponse.json({ success: true, deletedCount: messageIds.length })
  } catch (error) {
    console.error('Clear memory error:', error)
    return NextResponse.json(
      {
        error: 'Failed to clear memory',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
