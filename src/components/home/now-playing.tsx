import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { useState } from 'react'

export const NowPlayingSection = ({
  showVariant,
  setShowVariant,
}: {
  showVariant: boolean
  setShowVariant: (showVariant: boolean) => void
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    <motion.div layoutId="wrapper" className="w-1/4 h-20">
      <div
        style={{
          boxShadow: showVariant
            ? 'none'
            : '0px 0px 0px 1px rgba(9, 9, 11, 0.08), 0px 1px 2px -1px rgba(9, 9, 11, 0.08), 0px 2px 4px 0px rgba(9, 9, 11, 0.04)',
        }}
        className={cn(
          'bg-white rounded-xl  transition-shadow group overflow-hidden relative flex justify-center items-center text-sm gap-1.5 w-full h-full font-mono'
        )}
      >
        <motion.button
          layoutId="play"
          onClick={() => {
            setIsPlaying(!isPlaying)
            setShowVariant(true)
          }}
          type="button"
        >
          <svg
            id="play"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 mx-auto"
          >
            <path
              stroke="#fafafa"
              d="m21,11v-1h-1v-1h-2v-1h-2v-1h-1v-1h-2v-1h-2v-1h-1v-1h-2v-1h-2v-1h-3v1h-1v20h1v1h3v-1h2v-1h2v-1h1v-1h2v-1h2v-1h1v-1h2v-1h2v-1h1v-1h1v-2h-1Zm-2,2h-2v1h-2v1h-1v1h-2v1h-2v1h-1v1h-2v1h-2v1h-1V3h1v1h2v1h2v1h1v1h2v1h2v1h1v1h2v1h2v2Z"
            />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  )
}
