'use client'

import { MaximizeIcon } from '../ai-elements/loader'
import { useBlogAssistant } from './assistant-context'

interface AssistantHeaderProps {
  onClose: () => void
}

export const AssistantHeader = ({ onClose }: AssistantHeaderProps) => {
  const { setIsMaximized, setIsOpen } = useBlogAssistant()

  return (
    <div className="flex rounded-t-3xl items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <h2 className="font-serif text-gray-900">Ask Kenny</h2>
      </div>
      <div className="flex items-center ">
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Maximize chat"
          onClick={() => {
            setIsMaximized((prev) => !prev)
            setIsOpen(true)
          }}
        >
          <MaximizeIcon className="size-4 text-ken-grey" />
        </button>
        <button
          onClick={() => {
            onClose()
            setIsOpen(false)
          }}
          className="p-2 hover:bg-gray-100  group rounded-full transition-colors"
          aria-label="Close chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-4 text-ken-grey"
          >
            <polygon
              fill="currentColor"
              points="15 13 16 13 16 14 17 14 17 15 18 15 18 16 17 16 17 17 16 17 16 18 15 18 15 17 14 17 14 16 13 16 13 15 11 15 11 16 10 16 10 17 9 17 9 18 8 18 8 17 7 17 7 16 6 16 6 15 7 15 7 14 8 14 8 13 9 13 9 11 8 11 8 10 7 10 7 9 6 9 6 8 7 8 7 7 8 7 8 6 9 6 9 7 10 7 10 8 11 8 11 9 13 9 13 8 14 8 14 7 15 7 15 6 16 6 16 7 17 7 17 8 18 8 18 9 17 9 17 10 16 10 16 11 15 11 15 13"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
