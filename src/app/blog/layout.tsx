'use client'

import { useState } from 'react'
import { ChatSidebar } from '@/components/blog/chat-sidebar'
import { ChatToggleButton } from '@/components/blog/chat-toggle-button'
import { usePathname } from 'next/navigation'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {children}
      <ChatToggleButton onClick={() => setIsChatOpen(true)} />
      <ChatSidebar
        key={pathname}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  )
}
