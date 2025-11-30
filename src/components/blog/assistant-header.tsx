'use client'

import { SelectTrigger } from '@radix-ui/react-select'
import { useAtom } from 'jotai'
import {
  FloatingIcon,
  MinimizeIcon,
  NewChatIcon,
  SidebarIcon,
} from '../ai-elements/loader'
import { Select, SelectContent, SelectItem, SelectValue } from '../ui/select'
import { chatModeAtom } from './assistant-context'

interface AssistantHeaderProps {
  onClose: () => void
  onNewChat?: () => void
}

export const AssistantHeader = ({
  onClose,
  onNewChat,
}: AssistantHeaderProps) => {
  const [chatMode, setChatMode] = useAtom(chatModeAtom)

  return (
    <div className="flex rounded-t-3xl items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <h2 className="font-serif text-gray-900">Ask Kenny</h2>
      </div>
      <div className="flex items-center gap-1">
        {onNewChat && (
          <button
            className="p-1 font-sans text-xs rounded-full hover:bg-gray-100 transition-colors"
            type="button"
            onClick={onNewChat}
          >
            <NewChatIcon />
          </button>
        )}
        <Select
          value={chatMode}
          onValueChange={(value: 'floating' | 'sidebar') => setChatMode(value)}
        >
          <SelectTrigger className="hover:bg-gray-100 rounded-full p-1">
            <SelectValue key={chatMode} aria-label={chatMode}>
              {chatMode === 'floating' ? <FloatingIcon /> : <SidebarIcon />}
            </SelectValue>
          </SelectTrigger>
          <SelectContent
            position="popper"
            side="bottom"
            className="font-sans bg-[rgb(248,249,250)]  w-[200px] rounded-lg"
          >
            <SelectItem value="sidebar" className="rounded-lg">
              <span className="inline-flex gap-1 relative top-0.5 items-center">
                <SidebarIcon className="relative -top-0.5 size-5" />
                <span className="text-sm">Sidebar</span>
              </span>
            </SelectItem>
            <SelectItem value="floating" className="rounded-lg">
              <span className="inline-flex relative top-0.5 items-center gap-1">
                <FloatingIcon className="relative -top-0.5 size-5" />
                <span>Floating</span>
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
        <button
          onClick={() => {
            onClose()
          }}
          className="p-1 hover:bg-gray-100  group rounded-full transition-colors"
          aria-label="Close chat"
        >
          <MinimizeIcon />
        </button>
      </div>
    </div>
  )
}
