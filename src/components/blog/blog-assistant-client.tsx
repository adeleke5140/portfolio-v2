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
  useQueryClient,
} from '@tanstack/react-query'
import { UIMessage } from 'ai'
import { Provider, useAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { assistantStateAtom, chatModeAtom } from './assistant-context'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
    },
  },
})

interface BlogAssistantClientProps {
  initialMessages: UIMessage[]
}

function BlogAssistantPortal({ initialMessages }: BlogAssistantClientProps) {
  const [chatMode, setChatMode] = useAtom(chatModeAtom)
  const [isAssistantOpen, setIsAssistantOpen] = useAtom(assistantStateAtom)
  const queryClient = useQueryClient()
  const prevChatModeRef = useRef(chatMode)

  const {
    data: rateLimitData,
    isPending: isRateLimitPending,
    error: rateLimitQueryError,
  } = useQuery({
    queryKey: ['rateLimit'],
    queryFn: async () => {
      const res = await fetch('/api/rate-limit', {
        credentials: 'include',
      })
      if (!res.ok) {
        throw new Error('Failed to fetch rate limit')
      }
      return res.json() as Promise<{
        limit: number
        remaining: number
        reset: number
        resetAt: string
      }>
    },
    enabled: process.env.NODE_ENV === 'production',
  })

  // Refetch saved messages and rate limit when switching between floating/sidebar modes
  useEffect(() => {
    if (prevChatModeRef.current !== chatMode) {
      queryClient.invalidateQueries({ queryKey: ['savedMessages'] })
      queryClient.invalidateQueries({ queryKey: ['rateLimit'] })
    }
    prevChatModeRef.current = chatMode
  }, [chatMode, queryClient])

  const {
    isPending,
    error,
    data: savedMessages,
  } = useQuery({
    queryKey: ['savedMessages'],
    initialData: initialMessages,
    queryFn: async () => {
      const url = `/api/initial`
      const res = await fetch(url, { credentials: 'include' })
      if (!res.ok) {
        throw new Error('Failed to fetch initial messages')
      }
      return res.json()
    },
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
            rateLimitRemaining={rateLimitData?.remaining || 0}
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
                  rateLimitRemaining={rateLimitData?.remaining || 0}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : null}
    </>
  )
}

export function BlogAssistantClient({
  initialMessages,
}: BlogAssistantClientProps) {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <BlogAssistantPortal initialMessages={initialMessages} />
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </QueryClientProvider>
    </Provider>
  )
}
