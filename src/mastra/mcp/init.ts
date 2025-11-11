import { mcpClientManager } from '@/mastra/mcp/client'

export interface MCPServerConfig {
  slack?: {
    command: string
    args?: string[]
    env?: Record<string, string>
  }
  linear?: {
    command: string
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

  // Linear MCP Server (jerhadf/linear-mcp-server)
  // Runs via npx
  if (process.env.LINEAR_API_KEY) {
    config.linear = {
      command: process.env.LINEAR_MCP_COMMAND || 'npx',
      args: process.env.LINEAR_MCP_ARGS?.split(' ') || ['-y', 'linear-mcp-server'],
      env: {
        LINEAR_API_KEY: process.env.LINEAR_API_KEY,
      },
    }
  }

  return config
}
