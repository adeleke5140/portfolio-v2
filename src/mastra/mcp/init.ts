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

// Default configuration - can be overridden via environment variables
export function getMCPConfig(): MCPServerConfig {
  return {
    slack: process.env.SLACK_MCP_COMMAND
      ? {
          command: process.env.SLACK_MCP_COMMAND,
          args: process.env.SLACK_MCP_ARGS?.split(' ') || [],
          env: {
            ...(process.env.SLACK_BOT_TOKEN && {
              SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
            }),
          },
        }
      : undefined,
    linear: process.env.LINEAR_MCP_COMMAND
      ? {
          command: process.env.LINEAR_MCP_COMMAND,
          args: process.env.LINEAR_MCP_ARGS?.split(' ') || [],
          env: {
            ...(process.env.LINEAR_API_KEY && {
              LINEAR_API_KEY: process.env.LINEAR_API_KEY,
            }),
          },
        }
      : undefined,
  }
}
