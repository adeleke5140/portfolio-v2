import { Tool } from '@mastra/core'
import { mcpClientManager } from '../mcp/client'
import { z } from 'zod'

const getLinearIssuesSchema = z.object({
  team: z.string().optional().describe('Optional team name or ID to filter issues'),
  status: z.string().optional().describe('Optional status filter (e.g., "In Progress", "Todo")'),
})

export const getLinearIssuesTool = new Tool({
  id: 'get-linear-issues',
  description: 'Get current issues/tickets from Linear',
  inputSchema: getLinearIssuesSchema,
  execute: async ({ team, status }) => {
    try {
      const client = mcpClientManager.getClient('linear')
      if (!client) {
        throw new Error('Linear MCP client not connected')
      }

      // List available tools/resources from Linear MCP
      const tools = await client.listTools()
      
      // Find the appropriate tool for getting issues
      const issuesTool = tools.tools.find(
        (tool) => tool.name.includes('issue') || tool.name.includes('ticket')
      )

      if (!issuesTool) {
        // Fallback: try to use resources
        const resources = await client.listResources()
        const issuesResource = resources.resources.find(
          (r) => r.name.includes('issue') || r.name.includes('ticket')
        )

        if (issuesResource) {
          const result = await client.readResource({
            uri: issuesResource.uri,
          })
          return {
            issues: result.contents,
            team: team || 'all',
            status: status || 'all',
          }
        }

        return {
          issues: [],
          error: 'No issues tool found in Linear MCP',
        }
      }

      // Call the tool with filters
      const args: Record<string, any> = {}
      if (team) args.team = team
      if (status) args.status = status

      const result = await client.callTool({
        name: issuesTool.name,
        arguments: args,
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
        issues: content,
        team: team || 'all',
        status: status || 'all',
        success: true,
      }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        issues: [],
      }
    }
  },
})
