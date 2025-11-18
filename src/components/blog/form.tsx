import { cn } from '@/lib/utils'
import { BlogIcon } from '../craft/navigation/navigation'
import { transFormDashToSpaceCase } from '@/lib/utils'
import { Loader } from '../ai-elements/loader'

interface FormProps {
  input: string
  setInput: (input: string) => void
  sendMessage: (message: string) => void
  isLoading: boolean
  textareaRef: React.RefObject<HTMLTextAreaElement>
  context: string
}

export const Form = ({
  input,
  setInput,
  sendMessage,
  isLoading,
  textareaRef,
  context,
}: FormProps) => {
  return (
    <form className="p-4 rounded-b-3xl">
      <div className="relative">
        <div
          className={cn(
            'flex flex-col focus-within:outline focus-within:outline-[var(--primary)] shadow-[0px_10px_24px_-6px_#0000001a,0px_2px_4px_-1px_#0000000f,0_0_0_1px_#54483114] gap-2 px-4 py-2.5 h-32 rounded-[1.25rem] border-r-0'
          )}
        >
          <div className="text-center text-gray-500 text-sm">
            <p className="border flex items-center gap-1 border-[#dcdcdc]/50 bg-gray-50 rounded-full text-xs px-[10px] py-[5px] text-left w-fit">
              <BlogIcon />
              {context}
            </p>
          </div>

          <textarea
            ref={textareaRef}
            value={input || ''}
            onChange={(e) => setInput(e.target.value || '')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage(input)
                setInput('')
              }
            }}
            placeholder={
              context === 'blog'
                ? "You can ask about what I've written."
                : `Ask Kenny about ${transFormDashToSpaceCase(context)}`
            }
            className="w-full font-sans bg-inherit h-full outline-none  disabled:bg-inherit resize-none disabled:cursor-not-allowed text-sm"
          />
        </div>

        <button
          type="submit"
          className={cn(
            'size-8 absolute bottom-2 right-2',
            'bg-[var(--primary)] rounded-full text-white',
            'hover:bg-[var(--primary)] active:scale-95',
            'transition-all',
            'disabled:cursor-not-allowed disabled:hover:bg-[var(--primary)]',
            'flex items-center justify-center'
          )}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader />
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
