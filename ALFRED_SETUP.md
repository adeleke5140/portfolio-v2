# Alfred - AI Assistant for Slack and Linear

A proof-of-concept AI assistant built with Next.js, Mastra, and MCP (Model Context Protocol) that helps you manage Slack messages and Linear tickets.

## Features

- 🤖 AI-powered assistant named Alfred
- 💬 Chat interface using AI SDK React components
- 📱 Slack integration via MCP
- 📋 Linear integration via MCP
- 🎨 Modern UI with shadcn components
- ✨ Instrument Sans (body) and Instrument Serif (header) fonts

## Setup

### Prerequisites

1. Node.js and pnpm installed
2. Slack MCP server configured
3. Linear MCP server configured

### MCP Server Setup

You'll need to set up MCP servers for Slack and Linear. These typically run as separate processes and communicate via stdio.

#### Option 1: Using Environment Variables

Create a `.env.local` file:

```env
# Slack MCP Configuration
SLACK_MCP_COMMAND=npx
SLACK_MCP_ARGS=-y @modelcontextprotocol/server-slack
SLACK_BOT_TOKEN=your-slack-bot-token

# Linear MCP Configuration
LINEAR_MCP_COMMAND=npx
LINEAR_MCP_ARGS=-y @modelcontextprotocol/server-linear
LINEAR_API_KEY=your-linear-api-key
```

#### Option 2: Manual Configuration

You can also configure MCP servers programmatically by modifying `/src/mastra/mcp/init.ts`.

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

- "What unread messages do I have in Slack?"
- "What are my current tickets in Linear?"
- "Show me unread messages from the engineering channel"
- "What Linear issues are assigned to me?"

## Architecture

- **Frontend**: Next.js 15 with React 19
- **AI Framework**: Mastra with AI SDK integration
- **UI Components**: shadcn/ui
- **MCP Integration**: @modelcontextprotocol/sdk
- **Fonts**: Instrument Sans (body), Instrument Serif (headers)

## Project Structure

```
src/
├── app/
│   ├── alfred/
│   │   ├── page.tsx          # Main Alfred UI
│   │   └── layout.tsx        # Layout without RootLayout wrapper
│   └── api/
│       └── alfred/
│           └── route.ts      # API route for Alfred agent
├── components/
│   └── ui/                   # shadcn components
├── mastra/
│   ├── agents/
│   │   └── alfred.ts         # Alfred agent definition
│   ├── mcp/
│   │   ├── client.ts         # MCP client manager
│   │   └── init.ts           # MCP initialization
│   └── tools/
│       ├── slack-tool.ts     # Slack MCP tool wrapper
│       └── linear-tool.ts    # Linear MCP tool wrapper
└── fonts/
    └── setup.ts              # Font configuration
```

## Notes

- MCP servers need to be running and accessible for the tools to work
- The current implementation uses stdio transport for MCP communication
- Make sure your Slack bot token and Linear API key have the necessary permissions
