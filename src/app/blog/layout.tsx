'use client'

import { KenAssistant } from '@/components/blog/assistant'
import { ToggleAssistant } from '@/components/blog/toggle-assistant'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {children}
      {isMaximized && isOpen ? (
        <div className="bg-white w-[400px] z-40 flex flex-col justify-end fixed top-0 bottom-0 right-0 h-full">
          <KenAssistant
            isOpen={true}
            onClose={() => {
              setIsOpen(false)
            }}
            setIsMaximized={setIsMaximized}
            setIsOpen={setIsOpen}
          />
        </div>
      ) : null}
      <AssistantPopover
        setIsMaximized={setIsMaximized}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  )
}

function AssistantPopover({
  setIsMaximized,
  isOpen,
  setIsOpen,
}: {
  setIsMaximized: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn('fixed bottom-6 right-6 z-30')}>
      <Popover open={isChatOpen} onOpenChange={setIsChatOpen}>
        <PopoverTrigger
          data-trigger-from-sidebar={isOpen}
          onClick={() => setIsChatOpen(true)}
          className="data-[state=open]:translate-y-[120%] data-[state=closed]:translate-y-0 transition-all duration-300"
        >
          <ToggleAssistant />
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className="w-fit shadow-none p-0 mr-2 rounded-none border-none bg-transparent"
        >
          <div
            className={cn(
              'h-[500px] bottom-2 z-50',
              'w-full md:w-[450px]',
              'bg-[rgb(248,249,250)]  border border-gray-200',
              'flex flex-col rounded-t-[20px] rounded-b-[40px] shadow-2xl'
            )}
          >
            <KenAssistant
              key={pathname}
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              setIsMaximized={setIsMaximized}
              setIsOpen={setIsOpen}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
