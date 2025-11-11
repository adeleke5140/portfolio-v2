# Alfred - AI Cofounder Assistant

Alfred is an AI-powered assistant that helps you manage your work across Slack and Linear using the Model Context Protocol (MCP).

## Features

- 🤖 **AI-Powered Assistant**: Chat with Alfred to get insights about your work
- 💬 **Slack Integration**: Query unread messages, search conversations, and send messages
- 📋 **Linear Integration**: View and manage your issues/tickets
- 🔌 **MCP Architecture**: Uses official MCP servers for Slack and Linear
- 🎨 **Modern UI**: Clean, responsive interface with Instrument Sans and Instrument Serif fonts
- ⚡ **Real-time Streaming**: Powered by Vercel AI SDK and Mastra

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

#### Anthropic API (for Claude model)
- `ANTHROPIC_API_KEY`: Get from https://console.anthropic.com/

#### Slack
- `SLACK_BOT_TOKEN`: Get from https://api.slack.com/apps
  - Create a Slack App
  - Add Bot Token Scopes: `channels:history`, `channels:read`, `chat:write`, `groups:history`, `groups:read`, `im:history`, `im:read`, `mpim:history`, `mpim:read`, `users:read`
  - Install app to workspace
  - Copy the Bot User OAuth Token

- `SLACK_TEAM_ID`: Your Slack workspace ID (e.g., `T01234567`)

#### Linear
- `LINEAR_API_KEY`: Get from https://linear.app/settings/api
  - Go to Settings → API
  - Create a Personal API Key
  - Copy the key

### 3. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000/alfred` to start chatting with Alfred!

## Usage

### Example Questions

- "What unread messages do I have in Slack?"
- "Show me my current Linear tickets"
- "Search for messages about the marketing report"
- "List all channels in my workspace"
- "What are my urgent issues in Linear?"

## Architecture

### MCP Integration

Alfred uses two MCP (Model Context Protocol) servers:

1. **Slack MCP Server** (`slack-mcp-server`)
   - Stdio transport
   - Provides tools for conversations, search, and messaging
   - Supports channel lookup by name or ID

2. **Linear MCP Server** (Official Remote Server)
   - SSE transport at `https://mcp.linear.app/sse`
   - Provides tools for issue management
   - Direct integration with Linear's API

### Agent Configuration

The Alfred agent is configured in `/src/mastra/agents/alfred.ts`:
- Uses Claude 3.5 Sonnet model
- Connects to both MCP clients
- Has memory for conversation context
- Provides a professional and efficient assistant personality

### Tech Stack

- **Framework**: Next.js 15 with React 19
- **AI Framework**: Mastra for agent orchestration
- **AI SDK**: Vercel AI SDK for streaming
- **MCP**: Model Context Protocol for tool integration
- **Styling**: Tailwind CSS with Instrument Sans/Serif fonts
- **Type Safety**: TypeScript

## Project Structure

```
src/
├── app/
│   ├── alfred/
│   │   └── page.tsx          # Alfred chat UI
│   └── api/
│       └── alfred/
│           └── route.ts       # Alfred API endpoint
├── mastra/
│   ├── agents/
│   │   └── alfred.ts          # Alfred agent configuration
│   ├── mcp/
│   │   └── config.ts          # MCP client configuration
│   └── index.ts               # Mastra instance
└── fonts/
    └── setup.ts               # Font configuration
```

## Troubleshooting

### MCP Connection Issues

If you encounter MCP connection errors:

1. **Slack**: Ensure your `SLACK_BOT_TOKEN` has the necessary scopes
2. **Linear**: Verify your `LINEAR_API_KEY` is valid and not expired
3. Check that environment variables are properly loaded in `.env.local`

### Anthropic API Issues

Make sure you have:
- A valid Anthropic API key
- Sufficient credits in your Anthropic account
- The correct model name (`claude-3-5-sonnet-20241022`)

### Build Issues

If you encounter TypeScript errors:
```bash
pnpm build
```

## Contributing

This is a proof of concept demonstrating:
- MCP integration with Mastra
- AI agent orchestration
- Multi-tool coordination
- Modern UI/UX for AI assistants

Feel free to extend Alfred with additional MCP servers or capabilities!

## License

MIT
