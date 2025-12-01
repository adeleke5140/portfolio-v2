'use client'

import { KenAssistant } from '@/components/blog/assistant'
import { ToggleAssistant } from '@/components/blog/toggle-assistant'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { assistantStateAtom, chatModeAtom } from './assistant-context'

// Generate or retrieve a unique user ID from localStorage
function getUserId(): string {
  if (typeof window === 'undefined') return ''

  const STORAGE_KEY = 'ken-assistant-user-id'
  let userId = localStorage.getItem(STORAGE_KEY)

  if (!userId) {
    // Generate a unique ID using timestamp + random string
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    localStorage.setItem(STORAGE_KEY, userId)
  }

  return userId
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
    },
  },
})

function BlogAssistantPortal() {
  const [chatMode, setChatMode] = useAtom(chatModeAtom)
  const [isAssistantOpen, setIsAssistantOpen] = useAtom(assistantStateAtom)
  const [userId, setUserId] = useState<string>('')

  // Initialize userId on mount
  useEffect(() => {
    setUserId(getUserId())
  }, [])

  const {
    isPending,
    error,
    data: savedMessages,
  } = useQuery({
    queryKey: ['savedMessages', userId],
    queryFn: async () => {
      const url = `/api/initial?threadId=${userId}`
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error('Failed to fetch initial messages')
      }
      return res.json()
    },
    enabled: !!userId,
  })

  return (
    <>
      {chatMode === 'sidebar' && isAssistantOpen ? (
        <div className="bg-white w-[400px] z-40 flex flex-col justify-end fixed top-0 bottom-0 right-0 h-full">
          <KenAssistant
            isOpen={true}
            onClose={() => {
              setIsAssistantOpen(false)
              setChatMode('floating')
            }}
            recentArticles={[]}
            savedMessages={error ? [] : savedMessages}
            isLoadingSavedMessages={isPending}
            userId={userId}
          />
        </div>
      ) : null}

      {chatMode === 'floating' ? (
        <div className={cn('fixed bottom-6 right-6 z-30')}>
          <Popover open={isAssistantOpen} onOpenChange={setIsAssistantOpen}>
            <PopoverTrigger className="data-[state=open]:translate-y-[120%] data-[state=open]:opacity-0 data-[state=closed]:translate-y-0 transition-all duration-300">
              <ToggleAssistant />
            </PopoverTrigger>
            <PopoverContent
              onInteractOutside={(e) => {
                e.preventDefault()
              }}
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
                  isOpen={isAssistantOpen}
                  onClose={() => setIsAssistantOpen(false)}
                  recentArticles={[]}
                  savedMessages={error ? [] : savedMessages}
                  isLoadingSavedMessages={isPending}
                  userId={userId}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : null}
    </>
  )
}

export function BlogAssistantWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogAssistantPortal />
    </QueryClientProvider>
  )
}
