import { motion } from 'motion/react'
import { useAnimatedText } from './hooks'
import { toast } from 'sonner'

export const CardHeader = () => {
  const animatedText = useAnimatedText('My Cards')
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-1.5">
        <motion.svg
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'tween',
            delay: 0.2,
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-[0.875rem] dark:text-[#a5a5a5]"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </motion.svg>
        <p className="text-[#171720] dark:text-[#a5a5a5] text-sm">
          {animatedText}
        </p>
      </div>
      <motion.button
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'tween',
          ease: 'linear',
          delay: 0.2,
        }}
        className="text-[#171720] dark:text-[#a5a5a5] dark:border-[#343434] px-2 py-1 border border-[#e6e6e6] rounded-lg shadow-xs text-sm flex gap-1.5 items-center"
        onClick={() =>
          toast(() => (
            <span className="flex items-center gap-1">
              <motion.svg
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: 'tween',
                  delay: 0.2,
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-[0.875rem]"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </motion.svg>
              Card Added
            </span>
          ))
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-[0.875rem]"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        Add Card
      </motion.button>
    </div>
  )
}
