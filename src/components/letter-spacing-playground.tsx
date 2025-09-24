'use client'

import { motion } from 'motion/react'
import React, { useState, useRef } from 'react'

interface CustomSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
}

const CustomSlider = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: CustomSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const rectRef = useRef<DOMRect | null>(null)

  const percentage = ((value - min) / (max - min)) * 100

  const updateValue = React.useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      if (!sliderRef.current) return

      // Cache the rect on first calculation or if not cached
      if (!rectRef.current) {
        rectRef.current = sliderRef.current.getBoundingClientRect()
      }

      const rect = rectRef.current
      const x = e.clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      const newValue = min + (percentage / 100) * (max - min)
      const steppedValue = Math.round(newValue / step) * step
      onChange(Math.max(min, Math.min(max, steppedValue)))
    },
    [min, max, step, onChange]
  )

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      // Cache the rect at the start of drag
      if (sliderRef.current) {
        rectRef.current = sliderRef.current.getBoundingClientRect()
      }
      setIsDragging(true)
      updateValue(e)
    },
    [updateValue]
  )

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      updateValue(e)
    },
    [updateValue]
  )

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false)
    rectRef.current = null // Clear cache when done
  }, [])

  // Add event listeners for mouse move and up
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: true })
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-md min-w-[3rem] text-center">
          {value.toFixed(1)}px
        </div>
      </div>

      <div
        ref={sliderRef}
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        {/* Progress track */}
        <div
          className="absolute h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />

        {/* Slider thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-4 bg-white border-2 border-gray-300 rounded-md shadow-sm cursor-grab active:cursor-grabbing transition-all duration-150 hover:border-gray-400"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Tighter</span>
        <span>Looser</span>
      </div>
    </div>
  )
}

export const LetterSpacingPlayground = () => {
  const [letterSpacing, setLetterSpacing] = useState(0)

  const sampleText = 'Jack and the Bean Stalk'

  return (
    <div className="border border-[hsl(0,0%,92%)] rounded-lg my-8 bg-gray-50/50">
      <motion.div
        className="text-2xl p-6 font-medium text-gray-900 leading-relaxed"
        style={{
          letterSpacing: `${letterSpacing}px`,
        }}
        layout
      >
        {sampleText}
      </motion.div>
      <hr />

      <div className="p-6">
        <CustomSlider
          label="Letter Spacing"
          value={letterSpacing}
          onChange={setLetterSpacing}
          min={-2}
          max={8}
          step={0.1}
        />
      </div>
    </div>
  )
}
