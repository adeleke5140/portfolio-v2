'use client'

import { motion } from 'motion/react'
import { useState } from 'react'

export const LetterSpacingPlayground = () => {
  const [letterSpacing, setLetterSpacing] = useState(0)

  const sampleText = 'Jack and the Bean Stalk'

  return (
    <div className="flex border bg-white p-2 flex-col gap-2 rounded-xl my-8">
      <motion.div
        className="text-2xl border border-[hsl(0,0%,92%)] rounded-lg p-6 py-5 font-medium text-gray-900 leading-relaxed bg-gradient-to-t from-[#f8f8f8] to-[#fcfcfc]"
        style={{
          letterSpacing: `${letterSpacing}px`,
        }}
        layout
      >
        {sampleText}
      </motion.div>

      <div className="p-6 py-4 space-y-4 rounded-lg border border-[hsl(0,0%,92%)] bg-gradient-to-t from-[#f8f8f8] to-[#fcfcfc]">
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium text-gray-700">
            Letter Spacing
          </label>
          <div className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-md min-w-[3rem] text-center">
            {letterSpacing.toFixed(1)}px
          </div>
        </div>

        <div className="relative">
          <input
            type="range"
            min={-2}
            max={8}
            step={0.1}
            value={letterSpacing}
            onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
            className="custom-slider w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
            style={
              {
                '--slider-progress': `${
                  ((letterSpacing - -2) / (8 - -2)) * 100
                }%`,
              } as React.CSSProperties
            }
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>Tighter</span>
          <span>Looser</span>
        </div>
      </div>
    </div>
  )
}
