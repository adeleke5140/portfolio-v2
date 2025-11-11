import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js'

export interface MCPConfig {
  command?: string
  args?: string[]
  env?: Record<string, string>
  // For SSE transport (like Linear's official MCP server)
  url?: string
  transport?: 'stdio' | 'sse'
  headers?: Record<string, string>
}

export class MCPClientManager {
  private clients: Map<string, Client> = new Map()

  async connect(name: string, config: MCPConfig): Promise<Client> {
    if (this.clients.has(name)) {
      return this.clients.get(name)!
    }

    let transport: StdioClientTransport | SSEClientTransport

    if (config.transport === 'sse' && config.url) {
      // Use SSE transport for remote MCP servers (like Linear's official server)
      const url = new URL(config.url)
      transport = new SSEClientTransport(url, {
        eventSourceInit: {
          headers: config.headers || {},
        },
        requestInit: {
          headers: config.headers || {},
        },
      })
    } else if (config.command) {
      // Use stdio transport for local processes
      transport = new StdioClientTransport({
        command: config.command,
        args: config.args || [],
        env: config.env,
      })
    } else {
      throw new Error(`Invalid MCP config for ${name}: must provide either command (stdio) or url (sse)`)
    }

    const client = new Client(
      {
        name: 'alfred-agent',
        version: '1.0.0',
      },
      {
        capabilities: {},
      }
    )

    await client.connect(transport)
    this.clients.set(name, client)
    return client
  }

  async disconnect(name: string): Promise<void> {
    const client = this.clients.get(name)
    if (client) {
      await client.close()
      this.clients.delete(name)
    }
  }

  getClient(name: string): Client | undefined {
    return this.clients.get(name)
  }

  async disconnectAll(): Promise<void> {
    await Promise.all(
      Array.from(this.clients.keys()).map((name) => this.disconnect(name))
    )
  }
}

export const mcpClientManager = new MCPClientManager()
