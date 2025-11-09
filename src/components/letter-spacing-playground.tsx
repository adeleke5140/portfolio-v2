'use client'

import { motion } from 'motion/react'
import { useState } from 'react'

export const LetterSpacingPlayground = () => {
  const [letterSpacing, setLetterSpacing] = useState(0)

  const sampleText = 'Jack the Giant Slayer'

  return (
    <div className="flex border border-gray-200 bg-white p-2 flex-col gap-2 rounded-xl my-8">
      <motion.div
        className="text-2xl border border-[hsl(0,0%,92%)] rounded-lg p-6 py-5 font-medium text-gray-900 leading-relaxed bg-gradient-to-t from-[#f8f8f8] to-[#fcfcfc]"
        style={{
          letterSpacing: `${letterSpacing}px`,
        }}
        layout
      >
        {sampleText}
      </motion.div>

      <div className="p-6 py-6 space-y-3 rounded-lg border border-[hsl(0,0%,92%)] bg-gradient-to-t from-[#f8f8f8] to-[#fcfcfc]">
        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-500">
            Letter Spacing
          </label>
        </div>

        <div className="relative flex items-center gap-3">
          <div className="flex-1">
            <input
              type="range"
              min={-2}
              max={8}
              step={0.1}
              value={letterSpacing}
              onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
              className="custom-slider w-full h-3 rounded-full appearance-none cursor-pointer"
              style={
                {
                  '--slider-progress': `${
                    ((letterSpacing - -2) / (8 - -2)) * 100
                  }%`,
                } as React.CSSProperties
              }
            />
          </div>

          <div className="border border-[hsl(0,0%,92%)] bg-white flex items-center justify-center text-sm font-medium px-3 py-3 rounded-xl min-w-[3rem] text-center">
            {letterSpacing.toFixed(1)}px
          </div>
        </div>
      </div>
    </div>
  )
}
