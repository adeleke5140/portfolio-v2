import { NextRequest, NextResponse } from 'next/server'
import { initializeMCPServers, getMCPConfig } from '@/mastra/mcp/init'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const config = getMCPConfig()
    await initializeMCPServers(config)
    
    return NextResponse.json({
      success: true,
      message: 'MCP servers initialized',
      config: {
        slack: !!config.slack,
        linear: !!config.linear,
      },
    })
  } catch (error) {
    console.error('MCP initialization error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  const config = getMCPConfig()
  return NextResponse.json({
    slack: !!config.slack,
    linear: !!config.linear,
  })
}
