'use client'

import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatToggleButtonProps {
  onClick: () => void
  className?: string
}

export const ChatToggleButton = ({
  onClick,
  className,
}: ChatToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-6 rounded-xl right-6 z-30',
        'flex items-center gap-2 px-4 py-3',
        ' text-white border',
        'hover:scale-105 active:scale-95',
        'transition-all duration-200',
        'font-medium text-sm',
        'group',
        className
      )}
      aria-label="Open chat with Kenny"
    >
      <span className="hidden text-[var(--primary)] font-serif sm:inline">
        Ask Kenny
      </span>
    </button>
  )
}
