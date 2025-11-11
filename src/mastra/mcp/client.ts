import type { MastraMCPServerDefinition } from '@mastra/mcp'
import { MCPClient } from '@mastra/mcp'

type HeaderRecord = Record<string, string>

const buildHttpServerDefinition = (
  urlValue: string | undefined,
  headers: HeaderRecord,
  timeoutEnv?: string
): MastraMCPServerDefinition | undefined => {
  if (!urlValue) {
    return undefined
  }

  let url: URL
  try {
    url = new URL(urlValue)
  } catch (error) {
    console.warn(
      `[alfred-mcp] Ignoring invalid MCP URL "${urlValue}":`,
      error instanceof Error ? error.message : error
    )
    return undefined
  }

  const requestHeaders = { ...headers }

  const hasHeaders = Object.keys(requestHeaders).length > 0

  const timeout =
    typeof timeoutEnv === 'string' && timeoutEnv.trim().length > 0
      ? Number.parseInt(timeoutEnv, 10)
      : undefined

  if (timeout !== undefined && Number.isNaN(timeout)) {
    console.warn(
      `[alfred-mcp] Ignoring invalid MCP timeout "${timeoutEnv}" for ${urlValue}`
    )
  }

  return {
    url,
    requestInit: hasHeaders ? { headers: requestHeaders } : undefined,
    eventSourceInit: hasHeaders
      ? {
          fetch(input, init) {
            const headerBag = new Headers(init?.headers ?? {})
            for (const [key, value] of Object.entries(requestHeaders)) {
              headerBag.set(key, value)
            }

            return fetch(input, {
              ...init,
              headers: headerBag,
            })
          },
        }
      : undefined,
    timeout: timeout && !Number.isNaN(timeout) ? timeout : undefined,
  }
}

const servers: Record<string, MastraMCPServerDefinition> = {}

const slackHeaders: HeaderRecord = {}
if (process.env.SLACK_MCP_API_KEY) {
  slackHeaders.Authorization = `Bearer ${process.env.SLACK_MCP_API_KEY}`
}
if (process.env.SLACK_MCP_WORKSPACE) {
  slackHeaders['x-slack-workspace'] = process.env.SLACK_MCP_WORKSPACE
}
if (process.env.SLACK_MCP_USER_ID) {
  slackHeaders['x-slack-user-id'] = process.env.SLACK_MCP_USER_ID
}

const slackServer = buildHttpServerDefinition(
  process.env.SLACK_MCP_URL ?? process.env.SLACK_MCP_SSE_URL,
  slackHeaders,
  process.env.SLACK_MCP_TIMEOUT
)

if (slackServer) {
  servers.slack = slackServer
} else if (process.env.NODE_ENV !== 'production') {
  console.warn(
    '[alfred-mcp] Slack MCP server is not configured. Set SLACK_MCP_URL (or SLACK_MCP_SSE_URL) along with SLACK_MCP_API_KEY.'
  )
}

const linearHeaders: HeaderRecord = {}
const linearApiKey =
  process.env.LINEAR_MCP_API_KEY ?? process.env.LINEAR_API_KEY
if (linearApiKey) {
  linearHeaders.Authorization = `Bearer ${linearApiKey}`
}

const linearServer = buildHttpServerDefinition(
  process.env.LINEAR_MCP_URL,
  linearHeaders,
  process.env.LINEAR_MCP_TIMEOUT
)

if (linearServer) {
  servers.linear = linearServer
} else if (linearApiKey && (process.env.NODE_ENV ?? 'development') !== 'production') {
  console.warn(
    '[alfred-mcp] LINEAR_MCP_API_KEY is set but LINEAR_MCP_URL is missing. Configure LINEAR_MCP_URL (e.g. https://mcp.linear.app/sse).'
  )
}

export const alfredMCPClient = new MCPClient({
  id: 'alfred-mcp-client',
  servers,
})

export const hasActiveMCPServers = Object.keys(servers).length > 0
