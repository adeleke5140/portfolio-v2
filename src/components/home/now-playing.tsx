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
    <motion.div layoutId="wrapper" className="w-1/4 h-10">
      <div
        className={cn(
          'bg-gray-100 rounded-xl rounded-bl-sm  transition-shadow group overflow-hidden relative flex justify-center items-center text-sm gap-1.5 w-full h-full font-mono'
        )}
      >
        <motion.button
          layoutId="play"
          onClick={() => {
            setIsPlaying(!isPlaying)
            setShowVariant(true)
          }}
          type="button"
          className="inset-0 group/play absolute inline-flex items-center gap-1 justify-center"
        >
          <span>Lab</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
