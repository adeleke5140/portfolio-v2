'use client'

import { KenAssistant } from '@/components/blog/ken-assistant'
import { ToggleKen } from '@/components/blog/toggle-ken'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

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
      <ToggleKen onClick={() => setIsChatOpen(true)} />
      <KenAssistant
        key={pathname}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  )
}
