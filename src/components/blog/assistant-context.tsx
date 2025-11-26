'use client'

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

type BlogAssistantContextValue = {
  isMaximized: boolean
  setIsMaximized: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isChatOpen: boolean
  setIsChatOpen: Dispatch<SetStateAction<boolean>>
}

const BlogAssistantContext = createContext<
  BlogAssistantContextValue | undefined
>(undefined)

export function BlogAssistantProvider({ children }: { children: ReactNode }) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <BlogAssistantContext.Provider
      value={{
        isMaximized,
        setIsMaximized,
        isOpen,
        setIsOpen,
        isChatOpen,
        setIsChatOpen,
      }}
    >
      {children}
    </BlogAssistantContext.Provider>
  )
}

export function useBlogAssistant() {
  const context = useContext(BlogAssistantContext)

  if (context === undefined) {
    throw new Error(
      'useBlogAssistant must be used within a BlogAssistantProvider'
    )
  }

  return context
}
