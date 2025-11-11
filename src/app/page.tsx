import type { Metadata } from 'next'

import AlfredApp from '@/components/alfred-app'

export const metadata: Metadata = {
  title: 'Alfred Control Room',
  description:
    'Command Alfred, the AI co-founder, to summarize unread Slack work and Linear tickets via MCP integrations.',
  icons: {
    icon: '/kehinde.ico',
  },
}

export default function Home() {
  return <AlfredApp />
}
