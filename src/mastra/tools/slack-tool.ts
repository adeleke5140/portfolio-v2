import { Tool } from '@mastra/core'
import { mcpClientManager } from '../mcp/client'
import { z } from 'zod'

const getUnreadMessagesSchema = z.object({
  channel: z.string().optional().describe('Optional channel name or ID to filter messages'),
})

export const getSlackUnreadMessagesTool = new Tool({
  id: 'get-slack-unread-messages',
  description: 'Get unread messages from Slack channels',
  inputSchema: getUnreadMessagesSchema,
  execute: async ({ channel }) => {
    try {
      const client = mcpClientManager.getClient('slack')
      if (!client) {
        throw new Error('Slack MCP client not connected')
      }

      // List available tools/resources from Slack MCP
      const tools = await client.listTools()
      
      // Find the appropriate tool for getting unread messages
      // This will depend on the actual Slack MCP server implementation
      const unreadTool = tools.tools.find(
        (tool) => tool.name.includes('unread') || tool.name.includes('message')
      )

      if (!unreadTool) {
        // Fallback: try to use resources
        const resources = await client.listResources()
        const messagesResource = resources.resources.find(
          (r) => r.name.includes('message') || r.name.includes('unread')
        )

        if (messagesResource) {
          const result = await client.readResource({
            uri: messagesResource.uri,
          })
          return {
            messages: result.contents,
            channel: channel || 'all',
          }
        }

        return {
          messages: [],
          error: 'No unread messages tool found in Slack MCP',
        }
      }

      // Call the tool
      const result = await client.callTool({
        name: unreadTool.name,
        arguments: channel ? { channel } : {},
      })

      // Handle different result formats
      const content = Array.isArray(result.content)
        ? result.content.map((item: any) => {
            if (item.type === 'text') return item.text
            if (item.type === 'resource') return item.resource
            return JSON.stringify(item)
          }).join('\n\n')
        : JSON.stringify(result.content)

      return {
        messages: content,
        channel: channel || 'all',
        success: true,
      }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        messages: [],
      }
    }
  },
})
