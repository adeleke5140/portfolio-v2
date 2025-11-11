import { mcpClientManager } from '@/mastra/mcp/client'

export interface MCPServerConfig {
  slack?: {
    command: string
    args?: string[]
    env?: Record<string, string>
    transport?: 'stdio'
  }
  linear?: {
    url?: string
    headers?: Record<string, string>
    transport?: 'sse'
    // Legacy stdio support (deprecated, use official SSE server)
    command?: string
    args?: string[]
    env?: Record<string, string>
  }
}

export async function initializeMCPServers(config: MCPServerConfig) {
  const connections: Array<Promise<void>> = []

  if (config.slack) {
    connections.push(
      mcpClientManager
        .connect('slack', {
          transport: config.slack.transport || 'stdio',
          command: config.slack.command,
          args: config.slack.args,
          env: config.slack.env,
        })
        .then(() => {
          console.log('✅ Slack MCP server connected')
        })
        .catch((error) => {
          console.error('❌ Failed to connect to Slack MCP server:', error)
        })
    )
  }

  if (config.linear) {
    connections.push(
      mcpClientManager
        .connect('linear', {
          transport: config.linear.transport || (config.linear.url ? 'sse' : 'stdio'),
          url: config.linear.url,
          headers: config.linear.headers,
          command: config.linear.command,
          args: config.linear.args,
          env: config.linear.env,
        })
        .then(() => {
          console.log('✅ Linear MCP server connected')
        })
        .catch((error) => {
          console.error('❌ Failed to connect to Linear MCP server:', error)
        })
    )
  }

  await Promise.allSettled(connections)
}

// Default configuration - uses actual MCP servers
export function getMCPConfig(): MCPServerConfig {
  const config: MCPServerConfig = {}

  // Slack MCP Server (korotovsky/slack-mcp-server)
  // Can be run via binary or docker
  // For now, we'll use environment variables to configure
  if (process.env.SLACK_MCP_XOXC_TOKEN || process.env.SLACK_MCP_XOXP_TOKEN) {
    config.slack = {
      // Default: expects slack-mcp-server binary in PATH
      // Or use: docker run korotovsky/slack-mcp-server
      command: process.env.SLACK_MCP_COMMAND || 'slack-mcp-server',
      args: process.env.SLACK_MCP_ARGS?.split(' ') || [],
      env: {
        ...(process.env.SLACK_MCP_XOXC_TOKEN && {
          SLACK_MCP_XOXC_TOKEN: process.env.SLACK_MCP_XOXC_TOKEN,
        }),
        ...(process.env.SLACK_MCP_XOXD_TOKEN && {
          SLACK_MCP_XOXD_TOKEN: process.env.SLACK_MCP_XOXD_TOKEN,
        }),
        ...(process.env.SLACK_MCP_XOXP_TOKEN && {
          SLACK_MCP_XOXP_TOKEN: process.env.SLACK_MCP_XOXP_TOKEN,
        }),
        ...(process.env.SLACK_MCP_PORT && {
          SLACK_MCP_PORT: process.env.SLACK_MCP_PORT,
        }),
      },
    }
  }

  // Linear MCP Server - Official Linear MCP Server (SSE)
  // Uses SSE transport at https://mcp.linear.app/sse
  if (process.env.LINEAR_API_KEY || process.env.LINEAR_ACCESS_TOKEN) {
    const accessToken = process.env.LINEAR_ACCESS_TOKEN || process.env.LINEAR_API_KEY
    config.linear = {
      transport: 'sse',
      url: process.env.LINEAR_MCP_URL || 'https://mcp.linear.app/sse',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  } else if (process.env.LINEAR_MCP_COMMAND) {
    // Fallback to legacy stdio server if command is explicitly set
    config.linear = {
      transport: 'stdio',
      command: process.env.LINEAR_MCP_COMMAND,
      args: process.env.LINEAR_MCP_ARGS?.split(' ') || ['-y', 'linear-mcp-server'],
      env: {
        LINEAR_API_KEY: process.env.LINEAR_API_KEY || '',
      },
    }
  }

  return config
}
