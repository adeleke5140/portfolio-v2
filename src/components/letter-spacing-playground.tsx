'use client'

import { motion } from 'motion/react'
import { useState } from 'react'

export const LetterSpacingPlayground = () => {
  const [letterSpacing, setLetterSpacing] = useState(0)

  const sampleText = 'Jack and the Bean Stalk'

  return (
    <div className="border border-[hsl(0,0%,92%)] rounded-lg  my-8 bg-gray-50/50">
      <motion.div
        className="text-2xl p-6 font-medium text-gray-900 leading-relaxed"
        style={{ letterSpacing: `${letterSpacing}px` }}
        layout
      >
        {sampleText}
      </motion.div>
      <hr />

      <div className="overflow-hidden p-6">
        <div>
          <div className="flex items-center gap-4">
            <label
              htmlFor="letter-spacing"
              className="text-sm font-medium text-gray-700 min-w-0"
            >
              Letter Spacing:
            </label>
            <div className="flex items-center gap-3 flex-1">
              <input
                id="letter-spacing"
                type="range"
                min={-2}
                max={8}
                step={0.1}
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                className="flex-1 accent-gray-800"
              />
              <span className="text-sm text-gray-600 min-w-0 w-12 text-right">
                {letterSpacing.toFixed(1)}px
              </span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Tighter</span>
            <span>Looser</span>
          </div>
        </div>
      </div>
    </div>
  )
}
