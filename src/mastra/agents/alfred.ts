import { Agent } from '@mastra/core/agent'
import { Memory } from '@mastra/memory'
import { discoverMCPTools } from '../tools/mcp-tool-wrapper'
import { initializeMCPServers, getMCPConfig } from '../mcp/init'

const ALFRED_SYSTEM_PROMPT = `You are Alfred, a helpful AI assistant that helps manage Slack messages and Linear tickets.

## Your Capabilities
- You can check unread messages in Slack channels using Slack MCP tools
- You can retrieve and manage issues/tickets from Linear using Linear MCP tools
- You provide clear, concise answers to questions about Slack and Linear

## Your Communication Style
- Be helpful and professional
- Provide clear summaries of information
- When asked about unread messages or tickets, use the appropriate MCP tools to get the latest information
- Format responses in a readable way with clear sections

## Available MCP Tools
You have access to tools from Slack and Linear MCP servers. Use them when asked about:
- Slack: unread messages, channel history, searching messages, listing channels
- Linear: searching issues, getting user issues, creating/updating issues, adding comments

Always use the appropriate MCP tools when asked about Slack messages or Linear tickets to provide accurate, up-to-date information.`

let alfredAgentInstance: Agent | null = null

/**
 * Creates or returns the Alfred agent with dynamically discovered MCP tools
 */
export async function getAlfredAgent(): Promise<Agent> {
  if (alfredAgentInstance) {
    return alfredAgentInstance
  }

  // Initialize MCP servers
  const config = getMCPConfig()
  await initializeMCPServers(config)

  // Discover tools from MCP servers
  const slackTools = await discoverMCPTools('slack')
  const linearTools = await discoverMCPTools('linear')

  // Create tools object from discovered tools
  const tools: Record<string, any> = {}
  slackTools.forEach((tool) => {
    tools[tool.id] = tool
  })
  linearTools.forEach((tool) => {
    tools[tool.id] = tool
  })

  alfredAgentInstance = new Agent({
    name: 'alfred-agent',
    description:
      'An AI agent that helps manage Slack messages and Linear tickets using MCP tools.',
    instructions: ALFRED_SYSTEM_PROMPT,
    model: 'openai/gpt-4o-mini',
    tools,
    memory: new Memory(),
  })

  return alfredAgentInstance
}

// Export a default instance (will be initialized on first use)
export const alfredAgent = new Proxy({} as Agent, {
  get(target, prop) {
    throw new Error(
      'Alfred agent must be initialized using getAlfredAgent() first. Call await getAlfredAgent() before using.'
    )
  },
})
