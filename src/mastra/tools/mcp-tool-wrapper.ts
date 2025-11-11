import { Tool } from '@mastra/core'
import { mcpClientManager } from '../mcp/client'
import { z } from 'zod'

/**
 * Creates a Mastra Tool from an MCP tool definition
 */
export function createMCPTool(mcpServerName: string, mcpTool: any): Tool {
  // Convert MCP tool input schema to Zod schema
  const inputSchema = mcpTool.inputSchema
    ? convertJSONSchemaToZod(mcpTool.inputSchema)
    : z.object({})

  return new Tool({
    id: `${mcpServerName}-${mcpTool.name}`,
    description: mcpTool.description || `MCP tool: ${mcpTool.name}`,
    inputSchema,
    execute: async (args) => {
      const client = mcpClientManager.getClient(mcpServerName)
      if (!client) {
        throw new Error(`${mcpServerName} MCP client not connected`)
      }

      try {
        const result = await client.callTool({
          name: mcpTool.name,
          arguments: args as Record<string, any>,
        })

        // Handle different result formats
        if (Array.isArray(result.content)) {
          return result.content
            .map((item: any) => {
              if (item.type === 'text') return item.text
              if (item.type === 'resource') return JSON.stringify(item.resource)
              return JSON.stringify(item)
            })
            .join('\n\n')
        }

        return JSON.stringify(result.content)
      } catch (error) {
        throw new Error(
          `Failed to call MCP tool ${mcpTool.name}: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        )
      }
    },
  })
}

/**
 * Discovers and creates tools from an MCP server
 */
export async function discoverMCPTools(mcpServerName: string): Promise<Tool[]> {
  const client = mcpClientManager.getClient(mcpServerName)
  if (!client) {
    console.warn(`${mcpServerName} MCP client not connected, skipping tool discovery`)
    return []
  }

  try {
    const toolsResponse = await client.listTools()
    return toolsResponse.tools.map((tool) => createMCPTool(mcpServerName, tool))
  } catch (error) {
    console.error(`Failed to discover tools from ${mcpServerName}:`, error)
    return []
  }
}

/**
 * Converts JSON Schema to Zod schema
 */
function convertJSONSchemaToZod(jsonSchema: any): z.ZodTypeAny {
  if (!jsonSchema) {
    return z.any()
  }

  // Handle object types
  if (jsonSchema.type === 'object' || jsonSchema.properties) {
    const properties = jsonSchema.properties || {}
    const shape: Record<string, z.ZodTypeAny> = {}

    for (const [key, prop] of Object.entries(properties)) {
      const propSchema = prop as any
      let zodType: z.ZodTypeAny

      // Handle different types
      if (propSchema.type === 'string') {
        zodType = z.string()
      } else if (propSchema.type === 'number' || propSchema.type === 'integer') {
        zodType = z.number()
      } else if (propSchema.type === 'boolean') {
        zodType = z.boolean()
      } else if (propSchema.type === 'array') {
        if (propSchema.items) {
          zodType = z.array(convertJSONSchemaToZod(propSchema.items))
        } else {
          zodType = z.array(z.any())
        }
      } else if (propSchema.type === 'object' || propSchema.properties) {
        zodType = convertJSONSchemaToZod(propSchema)
      } else {
        zodType = z.any()
      }

      // Add description if available
      if (propSchema.description) {
        zodType = zodType.describe(propSchema.description)
      }

      // Make optional if not in required array
      const required = jsonSchema.required || []
      if (!required.includes(key)) {
        zodType = zodType.optional()
      }

      shape[key] = zodType
    }

    return z.object(shape)
  }

  // Handle array types
  if (jsonSchema.type === 'array') {
    if (jsonSchema.items) {
      return z.array(convertJSONSchemaToZod(jsonSchema.items))
    }
    return z.array(z.any())
  }

  // Handle primitive types
  switch (jsonSchema.type) {
    case 'string':
      return z.string()
    case 'number':
    case 'integer':
      return z.number()
    case 'boolean':
      return z.boolean()
    default:
      return z.any()
  }
}
