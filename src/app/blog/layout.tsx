'use client'

import { useState } from 'react'
import { ChatSidebar } from '@/components/blog/chat-sidebar'
import { ChatToggleButton } from '@/components/blog/chat-toggle-button'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      {children}
      <ChatToggleButton onClick={() => setIsChatOpen(true)} />
      <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}
