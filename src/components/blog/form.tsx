import { cn, transFormDashToSpaceCase } from '@/lib/utils'
import { Loader, SendButton } from '../ai-elements/loader'
import { UsageAlert } from './usage-alert'
interface FormProps {
  input: string
  setInput: (input: string) => void
  sendMessage: (message: string) => void
  isLoading: boolean
  textareaRef: React.RefObject<HTMLTextAreaElement>
  context: string
  recentArticles?: Array<{ id: string; title: string }>
  rateLimitRemaining: number
}

export const Form = ({
  input,
  setInput,
  sendMessage,
  isLoading,
  textareaRef,
  context,
  rateLimitRemaining,
}: FormProps) => {
  const customErrorForTextArea =
    process.env.NODE_ENV === 'production' && rateLimitRemaining === 0
      ? 'We can chat again in 24hours...'
      : null
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!input) return
        sendMessage(input.trim())
        setInput('')
      }}
      className="p-4 pt-0 relative"
    >
      <UsageAlert rateLimitRemaining={rateLimitRemaining} />
      <div className="relative">
        <div
          className={cn(
            'flex flex-col bg-white focus-visible:outline focus-visible:outline-[var(--primary)] shadow-[0px_10px_24px_-6px_#0000001a,0px_2px_4px_-1px_#0000000f,0_0_0_1px_#54483114] gap-2 px-4 py-2.5 h-32 rounded-[1.25rem] border-r-0'
          )}
        >
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
                sendMessage(input.trim())
                setInput('')
              }
            }}
            placeholder={
              customErrorForTextArea
                ? customErrorForTextArea
                : context === 'blog'
                ? "You can ask about what I've written."
                : `Ask Kenny about ${transFormDashToSpaceCase(context)}`
            }
            className="w-full font-sans pt-1 bg-white h-full outline-none  disabled:bg-inherit resize-none disabled:cursor-not-allowed text-sm"
          />
        </div>

        <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? <Loader className="text-white" /> : <SendButton />}
        </button>
      </div>
    </form>
  )
}
