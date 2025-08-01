import { motion, Variants } from 'motion/react'
import { durations } from './card-spend-duration'

const durationAmount = {
  daily: 500,
  weekly: 1500,
  monthly: 3000,
}
export const CardSpendLimit = ({
  duration,
}: {
  duration: (typeof durations)[number]
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center pt-4 pb-2 gap-3">
        <div>
          <ProgressRing
            progress={
              duration === 'daily' ? 17 : duration === 'weekly' ? 50 : 100
            }
            delay={0.4}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-[#5e5d65]">Spending Limit</p>
          <p className="flex items-center gap-1.5">
            <span className="font-medium text-sm">{`${durationAmount[duration]}.00`}</span>
            <span className="text-xs text-[#adadb2] dark:text-[#a5a5a5]">
              {' '}
              /{' '}
              {duration === 'daily'
                ? 'day'
                : duration === 'weekly'
                  ? 'week'
                  : 'month'}
            </span>
          </p>
        </div>
      </div>
      <motion.button
        whileTap={{
          borderRadius: '6px',
          scale: 0.8,
          rotate: 10,
        }}
        className="border rounded-md dark:border-[#343434] shadow-sm px-[5px] grid place-items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="rotate-90 w-[0.875rem]"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </motion.button>
    </div>
  )
}

const ProgressRing = ({
  progress = 50,
  size = 50,
  strokeWidth = 5,
  delay = 1.4,
}) => {
  // Calculate the parameters for the circle
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const circleVariants = {
    hidden: {
      strokeDashoffset: circumference,
      transition: {
        type: 'spring',
        duration: 0,
      },
    },
    visible: {
      strokeDashoffset,
      transition: {
        type: 'spring',
        duration: 2,
        delay: delay,
        bounce: 0.25,
      },
    },
  }

  return (
    <div className="relative inline-block">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-gray-100 dark:stroke-[#282828]"
          fill="none"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          style={{ stroke: '#d0de0d' }}
          variants={circleVariants as Variants}
          initial="hidden"
          animate="visible"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeLinecap="square"
        />
      </svg>
    </div>
  )
}
