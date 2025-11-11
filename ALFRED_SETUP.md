# Alfred - AI Assistant for Slack and Linear

A proof-of-concept AI assistant built with Next.js, Mastra, and MCP (Model Context Protocol) that helps you manage Slack messages and Linear tickets.

## Features

- 🤖 AI-powered assistant named Alfred
- 💬 Chat interface using AI SDK React components
- 📱 Slack integration via MCP (using [korotovsky/slack-mcp-server](https://github.com/korotovsky/slack-mcp-server))
- 📋 Linear integration via MCP (using [jerhadf/linear-mcp-server](https://github.com/jerhadf/linear-mcp-server))
- 🎨 Modern UI with shadcn components
- ✨ Instrument Sans (body) and Instrument Serif (header) fonts
- 🔧 Dynamic tool discovery from MCP servers

## Setup

### Prerequisites

1. Node.js and pnpm installed
2. Slack tokens (xoxc/xoxd or xoxp token)
3. Linear API key

### MCP Server Setup

#### Slack MCP Server

The Slack MCP server is a Go binary. You have a few options:

1. **Download the binary** from [releases](https://github.com/korotovsky/slack-mcp-server/releases)
2. **Use Docker**: `docker pull korotovsky/slack-mcp-server`
3. **Build from source**: Follow instructions in the [repository](https://github.com/korotovsky/slack-mcp-server)

#### Linear MCP Server

Linear provides an **official MCP server** that uses SSE (Server-Sent Events) transport. This is the recommended way to use Linear with MCP.

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Slack MCP Configuration
# Option 1: Using xoxc/xoxd tokens (browser tokens)
SLACK_MCP_XOXC_TOKEN=xoxc-your-token-here
SLACK_MCP_XOXD_TOKEN=xoxd-your-token-here

# Option 2: Using xoxp token (OAuth token)
# SLACK_MCP_XOXP_TOKEN=xoxp-your-token-here

# Optional: Custom command if binary is not in PATH
# SLACK_MCP_COMMAND=/path/to/slack-mcp-server
# SLACK_MCP_ARGS=--port 13080

# Linear MCP Configuration (Official SSE Server)
LINEAR_ACCESS_TOKEN=your-linear-access-token-here
# OR use LINEAR_API_KEY (will be used as access token)
# LINEAR_API_KEY=your-linear-api-key-here

# Optional: Custom URL (defaults to https://mcp.linear.app/sse)
# LINEAR_MCP_URL=https://mcp.linear.app/sse
```

### Getting Slack Tokens

You can extract Slack tokens from your browser:
1. Open Slack in your browser
2. Open Developer Tools (F12)
3. Go to Application/Storage → Cookies → `https://app.slack.com`
4. Find cookies: `d` (xoxd token) and look for `xoxc` in localStorage or network requests

Alternatively, use OAuth to get an `xoxp` token.

### Getting Linear Access Token

For the official Linear MCP server, you need a Linear access token:

1. Go to your Linear workspace settings: `https://linear.app/YOUR-TEAM/settings/api`
2. Create a new Personal API Key
3. Copy the key to your `.env.local` file as `LINEAR_ACCESS_TOKEN` (or `LINEAR_API_KEY`)

The official Linear MCP server uses SSE transport and is hosted at `https://mcp.linear.app/sse`.

### Installation

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000/alfred` to access the Alfred assistant.

## Usage

Once the app is running and MCP servers are connected, you can ask Alfred:

- **Slack:**
  - "What unread messages do I have in Slack?"
  - "Show me messages from the #general channel"
  - "Search for messages about 'deployment'"
  - "List all channels"

- **Linear:**
  - "What are my current tickets in Linear?"
  - "Show me high priority issues"
  - "Search for issues assigned to me"
  - "Create a new issue for bug fixing"

## Available MCP Tools

### Slack Tools (from slack-mcp-server)
- `conversations_history` - Get messages from channels/DMs
- `conversations_replies` - Get thread replies
- `conversations_search_messages` - Search messages with filters
- `channels_list` - List all channels
- `conversations_add_message` - Post messages (disabled by default)

### Linear Tools (from official Linear MCP server)
The official Linear MCP server provides comprehensive tools for managing Linear issues. Available tools are discovered dynamically and may include:
- Issue search and filtering
- Issue creation and updates
- Comment management
- Team and project management
- And more (discovered automatically)

## Architecture

- **Frontend**: Next.js 15 with React 19
- **AI Framework**: Mastra with AI SDK integration
- **UI Components**: shadcn/ui
- **MCP Integration**: @modelcontextprotocol/sdk
- **Fonts**: Instrument Sans (body), Instrument Serif (headers)
- **Dynamic Tool Discovery**: Tools are discovered from MCP servers at runtime

## Project Structure

```
src/
├── app/
│   ├── alfred/
│   │   ├── page.tsx          # Main Alfred UI
│   │   └── layout.tsx        # Layout without RootLayout wrapper
│   └── api/
│       ├── alfred/
│       │   └── route.ts      # API route for Alfred agent
│       └── mcp/
│           └── init/
│               └── route.ts  # MCP initialization
├── components/
│   └── ui/                   # shadcn components
├── mastra/
│   ├── agents/
│   │   └── alfred.ts         # Alfred agent (dynamic tool discovery)
│   ├── mcp/
│   │   ├── client.ts         # MCP client manager
│   │   └── init.ts           # MCP initialization logic
│   └── tools/
│       └── mcp-tool-wrapper.ts # Dynamic MCP tool wrapper
└── fonts/
    └── setup.ts              # Font configuration
```

## How It Works

1. When the Alfred agent is first accessed, it:
   - Initializes MCP servers (Slack and Linear) based on environment variables
   - Discovers available tools from each MCP server
   - Creates Mastra Tool wrappers for each MCP tool
   - Initializes the agent with all discovered tools

2. When a user asks a question:
   - The agent analyzes the request
   - Selects appropriate MCP tools to use
   - Calls the tools via MCP protocol
   - Formats and returns the results

## Notes

- MCP servers need to be running and accessible for the tools to work
- The Slack MCP server uses stdio transport (local process)
- The Linear MCP server uses SSE transport (remote server at https://mcp.linear.app/sse)
- Tools are discovered dynamically, so new tools added to MCP servers will be automatically available
- Make sure your Slack tokens and Linear access token have the necessary permissions
- The official Linear MCP server requires authentication via Bearer token in the Authorization header
