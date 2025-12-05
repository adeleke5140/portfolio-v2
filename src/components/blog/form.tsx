import { cn, transFormDashToSpaceCase } from '@/lib/utils'
import { Loader } from '../ai-elements/loader'
import { BlogIcon } from '../craft/navigation/navigation'
interface FormProps {
  input: string
  setInput: (input: string) => void
  sendMessage: (message: string) => void
  isLoading: boolean
  textareaRef: React.RefObject<HTMLTextAreaElement>
  context: string
  recentArticles?: Array<{ id: string; title: string }>
  rateLimitRemaining: number
  rateLimitError: string
}

export const Form = ({
  input,
  setInput,
  sendMessage,
  isLoading,
  textareaRef,
  context,
  recentArticles = [],
  rateLimitRemaining,
  rateLimitError,
}: FormProps) => {
  return (
    <form className="p-4 pt-0 relative">
      <div className="border mx-5 border-b-0 border-[#dcdcdc] h-8 pt-2 rounded-t-xl bg-inherit p-4">
        {rateLimitRemaining === 0 ? (
          <p className="text-red-700 rounded-lg font-sans text-xs">
            {rateLimitError}
          </p>
        ) : (
          <p className="text-[12px] text-xs font-sans text-ken-grey">
            {rateLimitRemaining}{' '}
            {rateLimitRemaining === 1 ? 'message' : 'messages'} remaining today
          </p>
        )}
      </div>
      <div className="relative">
        <div
          className={cn(
            'flex flex-col bg-white focus-visible:outline focus-visible:outline-[var(--primary)] shadow-[0px_10px_24px_-6px_#0000001a,0px_2px_4px_-1px_#0000000f,0_0_0_1px_#54483114] gap-2 px-4 py-2.5 h-32 rounded-[1.25rem] border-r-0'
          )}
        >
          <div className="text-center text-gray-500 text-sm">
            <p className="border flex font-sans items-center gap-1 border-[#dcdcdc]/50 bg-gray-100/50 rounded-full text-xs px-[10px] py-[5px] text-left w-fit">
              <BlogIcon className="size-3" />
              {context}
            </p>
          </div>

          <textarea
            ref={textareaRef}
            value={input || ''}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (!input) return
                sendMessage(input)
                setInput('')
              }
            }}
            placeholder={
              rateLimitError
                ? 'We can chat again in 24hours...'
                : context === 'blog'
                ? "You can ask about what I've written."
                : `Ask Kenny about ${transFormDashToSpaceCase(context)}`
            }
            className="w-full font-sans bg-white h-full outline-none  disabled:bg-inherit resize-none disabled:cursor-not-allowed text-sm"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            if (!input) return
            sendMessage(input)
          }}
          className="form-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="text-white" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-5 -rotate-90"
              fill="currentColor"
            >
              <path d="m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-1,6h-1v2h-1v2h-2v1h-2v1h-6v-1h-2v-1h-2v-2h-1v-2h-1v-6h1v-2h1v-2h2v-1h2v-1h6v1h2v1h2v2h1v2h1v6Z" />
              <polygon points="17 11 17 13 16 13 16 14 15 14 15 15 14 15 14 16 13 16 13 17 12 17 12 13 6 13 6 11 12 11 12 7 13 7 13 8 14 8 14 9 15 9 15 10 16 10 16 11 17 11" />
            </svg>
          )}
        </button>
      </div>
    </form>
  )
}
