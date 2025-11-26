import { cn } from '@/lib/utils'
import { SmirkIcon } from '../craft/split-to-edit/icons'

interface ChatToggleButtonProps {
  className?: string
}

export const ToggleAssistant = ({ className }: ChatToggleButtonProps) => {
  return (
    <div
      className={cn(
        'flex items-center cursor-pointer gap-2 px-4 py-3',
        ' text-white',
        'hover:scale-105 active:scale-95',
        'transition-all duration-200',
        'font-medium text-sm',
        'group',
        className
      )}
      aria-label="Open chat with Kenny"
    >
      <SmirkIcon />
      <span className="text-black">Ask Kenny</span>
    </div>
  )
}
