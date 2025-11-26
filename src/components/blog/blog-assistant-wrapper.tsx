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
import { isChatOpenAtom, isOpenAtom, maximizedAtom } from './assistant-context'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { usePathname } from 'next/navigation'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
    },
  },
})

function BlogAssistantPortal() {
  const [isMaximized] = useAtom(maximizedAtom)
  const [isOpen, setIsOpen] = useAtom(isOpenAtom)
  const [isChatOpen, setIsChatOpen] = useAtom(isChatOpenAtom)

  const {
    isPending,
    error,
    data: savedMessages,
  } = useQuery({
    queryKey: ['savedMessages'],
    queryFn: async () => {
      const url = `/api/initial`
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error('Failed to fetch initial messages')
      }
      return res.json()
    },
  })

  return (
    <>
      {isMaximized && isOpen ? (
        <div className="bg-white w-[400px] z-40 flex flex-col justify-end fixed top-0 bottom-0 right-0 h-full">
          <KenAssistant
            isOpen={true}
            onClose={() => {
              setIsOpen(false)
            }}
            recentArticles={[]}
            savedMessages={error ? [] : savedMessages}
            isLoadingSavedMessages={isPending}
          />
        </div>
      ) : null}

      <div className={cn('fixed bottom-6 right-6 z-30')}>
        <Popover open={isChatOpen} onOpenChange={setIsChatOpen}>
          <PopoverTrigger
            onClick={() => setIsChatOpen(true)}
            className="data-[state=open]:translate-y-[120%] data-[state=closed]:translate-y-0 transition-all duration-300"
          >
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
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                recentArticles={[]}
                savedMessages={error ? [] : savedMessages}
                isLoadingSavedMessages={isPending}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

export function BlogAssistantWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogAssistantPortal />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}
