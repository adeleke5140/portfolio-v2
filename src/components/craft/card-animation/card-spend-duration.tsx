import { cn } from '@/lib/utils'
import { useState } from 'react'

export const durations = ['daily', 'weekly', 'monthly'] as const

export const CardSpendDuration = ({
  currentDuration,
  setCurrentDuration,
}: {
  currentDuration: (typeof durations)[number]
  setCurrentDuration: (i: (typeof durations)[number]) => void
}) => {
  return (
    <div className="flex border rounded-md shadow-sm border-[#e6e6e6] dark:border-[#343434] items-center">
      {durations.map((duration, index) => {
        const isActive = duration == currentDuration
        return (
          <button
            type="button"
            onClick={() => setCurrentDuration(duration)}
            key={duration}
            className={cn(
              `capitalize text-sm flex-1 py-1 px-4`,
              isActive ? 'bg-[#f6f7fa] dark:bg-[#282828] inset-0' : '',
              index === 0 ? 'border-r dark:border-r-[#343434]' : '',
              index === durations.length - 1
                ? 'border-l dark:border-l-[#343434]'
                : ''
            )}
          >
            {duration}
          </button>
        )
      })}
    </div>
  )
}
