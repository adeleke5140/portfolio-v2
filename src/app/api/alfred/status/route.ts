import { NextRequest, NextResponse } from 'next/server'
import { slackMCPClient, linearMCPClient } from '@/mastra/mcp/config'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  try {
    const slackConfigured = !!(process.env.SLACK_BOT_TOKEN || process.env.SLACK_TOKEN)
    const linearConfigured = !!process.env.LINEAR_API_KEY

    let slackConnected = false
    let slackMessage = 'Not configured'
    
    let linearConnected = false
    let linearMessage = 'Not configured'

    // Check Slack connection
    if (slackConfigured) {
      try {
        // Try to check if client is connected
        const slackTools = await slackMCPClient.getTools()
        slackConnected = slackTools && Object.keys(slackTools).length > 0
        slackMessage = slackConnected 
          ? `Connected - ${Object.keys(slackTools).length} tools available`
          : 'Connection failed - check token'
      } catch (error) {
        slackConnected = false
        slackMessage = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }

    // Check Linear connection
    if (linearConfigured) {
      try {
        const linearTools = await linearMCPClient.getTools()
        linearConnected = linearTools && Object.keys(linearTools).length > 0
        linearMessage = linearConnected
          ? `Connected - ${Object.keys(linearTools).length} tools available`
          : 'Connection failed - check API key'
      } catch (error) {
        linearConnected = false
        linearMessage = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }
    }

    return NextResponse.json({
      slack: {
        connected: slackConnected,
        configured: slackConfigured,
        message: slackMessage,
      },
      linear: {
        connected: linearConnected,
        configured: linearConfigured,
        message: linearMessage,
      },
    })
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      {
        error: 'Failed to check connection status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
