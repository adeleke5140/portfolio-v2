# Alfred Control Room

A lightweight proof of concept that mirrors the cofounder-style workflow: a single screen where you can ask “What unread messages do I have in Slack and what are my current tickets?” and let Alfred — a Mastra agent — answer by calling real MCP servers for Slack and Linear.

Built with:

- **Next.js 15** with the app router
- **Mastra** agents + **@mastra/mcp** to talk to MCP servers
- **Vercel AI SDK (`@ai-sdk/react`)** for streaming chat UI
- **Shadcn/UI** primitives styled with Instrument Sans & Instrument Serif

## Getting started

```bash
pnpm install
pnpm dev
```

The app runs at `http://localhost:3000`.

## Environment variables

Alfred only works if he can reach both MCP servers. Create an `.env.local` (or configure your host) with:

```env
# Slack MCP server (self-host the repo below and expose an HTTPS SSE endpoint)
SLACK_MCP_URL=           # e.g. https://your-domain/slack/sse
SLACK_MCP_API_KEY=       # Bearer token required by your slack-mcp-server
# Optional headers forwarded to the MCP server:
SLACK_MCP_WORKSPACE=     # Map to x-slack-workspace header (optional)
SLACK_MCP_USER_ID=       # Map to x-slack-user-id header (optional)
SLACK_MCP_TIMEOUT=60000  # Optional per-request timeout in ms

# Linear MCP server (official remote endpoint)
LINEAR_MCP_URL=https://mcp.linear.app/sse
LINEAR_MCP_API_KEY=      # Your Linear API key (scoped to the appropriate workspace)
# Alternative name if you already export LINEAR_API_KEY:
LINEAR_API_KEY=          # Will be used when LINEAR_MCP_API_KEY is absent
LINEAR_MCP_TIMEOUT=60000 # Optional per-request timeout in ms
```

### Slack MCP server notes

- Repo: <https://github.com/korotovsky/slack-mcp-server>
- Recommended transport: run the server (npx/docker) and expose `/sse` via `ngrok`, `fly`, etc.
- Set `SLACK_MCP_API_KEY` on the server and mirror the same value in your `.env.local`.

### Linear MCP server notes

- Official docs: <https://linear.app/docs/mcp>
- Use the hosted endpoint `https://mcp.linear.app/sse` with a Linear API key that has the scopes you need (read issues, etc.).

## Useful scripts

```bash
pnpm dev     # Start the Next.js dev server
pnpm build   # Production build
pnpm start   # Run the built app
```

## Project layout

- `src/mastra` — Alfred agent + MCP client configuration
- `src/app/api` — Next.js route handlers backing the chat UI
- `src/components/alfred-app.tsx` — Shadcn-based control room UI
- `src/components/ui/*` — Local copy of the Shadcn primitives in use

## Next steps

- Wire up real Slack/Linear accounts and tailor Alfred’s prompt to your team.
- Add persistence (e.g. Mastra storage backed by LibSQL or Postgres).
- Extend the MCP client to include calendars, CRMs, or other integrations your co-founder needs.
