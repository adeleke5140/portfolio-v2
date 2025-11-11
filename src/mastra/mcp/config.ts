import { MCPClient } from '@mastra/core'

// Initialize Slack MCP Client
export const slackMCPClient = new MCPClient({
  name: 'slack',
  transport: {
    type: 'stdio',
    command: 'npx',
    args: ['-y', 'slack-mcp-server'],
    env: {
      SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN || process.env.SLACK_TOKEN || '',
      SLACK_TEAM_ID: process.env.SLACK_TEAM_ID || '',
    },
  },
})

// Initialize Linear Remote MCP Client (official Linear MCP server)
export const linearMCPClient = new MCPClient({
  name: 'linear',
  transport: {
    type: 'sse',
    url: 'https://mcp.linear.app/sse',
    headers: {
      Authorization: `Bearer ${process.env.LINEAR_API_KEY || ''}`,
    },
  },
})

// Function to initialize all MCP clients
export async function initializeMCPClients() {
  try {
    await slackMCPClient.connect()
    await linearMCPClient.connect()
    console.log('✅ MCP clients connected successfully')
  } catch (error) {
    console.error('❌ Error connecting MCP clients:', error)
    throw error
  }
}

// Function to get all tools from MCP clients
export async function getAllMCPTools() {
  const slackTools = await slackMCPClient.getTools()
  const linearTools = await linearMCPClient.getTools()
  
  return {
    ...slackTools,
    ...linearTools,
  }
}
