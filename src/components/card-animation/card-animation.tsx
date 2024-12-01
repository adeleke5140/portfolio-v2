import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAnimatedText } from './hooks'
import { container, item } from './variants'

const durations = ['daily', 'weekly', 'monthly'] as const

const CardHeader = () => {
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
          className="w-[0.875rem]"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </motion.svg>
        <p className="text-[#171720] text-sm">{animatedText}</p>
      </div>
      <motion.button
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'tween',
          ease: 'linear',
          delay: 0.2,
        }}
        className="text-[#171720] px-2 py-1 border border-[#e6e6e6] rounded-lg shadow-xs text-sm flex gap-1.5 items-center"
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

const CardAmount = () => {
  return (
    <div>
      <motion.p
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.5,
          delay: 1,
        }}
        className="text-sm text-[#5e5d65] min-h-[20px]"
      >
        Savings Card
      </motion.p>
      <div className="flex justify-between items-end">
        <motion.p
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.5,
            delay: 1.2,
          }}
          className="font-semibold text-3xl min-h-[36px]"
        >
          $16,058.94
        </motion.p>
        <div className="flex rounded-md ">
          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            type="button"
            className="px-[6px] border  shadow-sm border-r-[0.5px]  rounded-tl-md rounded-bl-md  grid place-items-center"
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
              className="-rotate-90 w-[0.875rem]"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </motion.button>

          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            type="button"
            className="px-[6px] shadow-sm border-l-[0.5px] border rounded-tr-md rounded-br-md grid place-items-center"
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
              className="rotate-90 w-[0.875rem]"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

const CardStatus = () => {
  return (
    <div className="flex justify-between">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex gap-2 items-center"
      >
        <motion.div
          variants={item}
          className="rounded-full grid place-items-center h-4 w-4 p-1 bg-[#e4f222]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 56 56"
            width="16"
            height="16"
            aria-hidden="true"
            className=" w-2 h-2"
          >
            <path
              fill="currentColor"
              d="M56 47.778v.211L25.5 48v-.222c4.398-2.51 7.434-5.065 10.166-7.735h12.523L56 47.778ZM48.443 7.659 40.713 0h-.226s.13 14.274-12.85 27.255C14.938 39.961 0 39.99 0 39.99v.223l7.876 7.792s14.719.147 27.72-12.734C48.553 22.432 48.444 7.659 48.444 7.659Z"
            ></path>
          </svg>
        </motion.div>
        <motion.svg
          variants={item}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          style={{
            rotate: '90deg',
          }}
          className="w-[0.875rem] text-gray-400"
        >
          <path d="M12 20h.01" />
          <path d="M2 8.82a15 15 0 0 1 20 0" />
          <path d="M5 12.859a10 10 0 0 1 14 0" />
          <path d="M8.5 16.429a5 5 0 0 1 7 0" />
        </motion.svg>
        <motion.div
          variants={item}
          className="border items-center gap-1.5 flex rounded-md px-1 py-0.5  border-[e6e6e6]"
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
            className="text-green-400 w-3 h-3"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span className="text-xs text-[#565656]">Active</span>
        </motion.div>
      </motion.div>

      <div>
        <motion.svg
          aria-label={'mastercard logo'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: 'tween',
            delay: 0.4,
          }}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 152.4 108"
          className="w-8"
          //   style="enable-background:new 0 0 152.4 108;"
          xmlSpace="preserve"
        >
          <g>
            <rect y="0" fill="none" width="152.4" height="108" />
            <g>
              <rect
                x="60.4"
                y="25.7"
                fill="#ff5f00"
                width="31.5"
                height="56.6"
              />
              <path
                fill="#EB001B"
                d="M62.4,54c0-11,5.1-21.5,13.7-28.3c-15.6-12.3-38.3-9.6-50.6,6.1C13.3,47.4,16,70,31.7,82.3
                        c13.1,10.3,31.4,10.3,44.5,0C67.5,75.5,62.4,65,62.4,54z"
              />
              <path
                fill="#F79E1B"
                d="M134.4,54c0,19.9-16.1,36-36,36c-8.1,0-15.9-2.7-22.2-7.7c15.6-12.3,18.3-34.9,6-50.6c-1.8-2.2-3.8-4.3-6-6
                        c15.6-12.3,38.3-9.6,50.5,6.1C131.7,38.1,134.4,45.9,134.4,54z"
              />
            </g>
          </g>
        </motion.svg>
      </div>
    </div>
  )
}

const CardSpendLimit = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center pt-4 pb-2 gap-3">
        <div>
          <ProgressRing />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-[#5e5d65]">Spending Limit</p>
          <p className="flex items-center gap-1.5">
            <span className="font-medium text-sm">$1500.00</span>
            <span className="text-xs text-[#adadb2]"> / week</span>
          </p>
        </div>
      </div>
      <motion.button
        whileTap={{
          borderRadius: '6px',
          scale: 0.8,
          rotate: 10,
        }}
        className="border rounded-md shadow-sm px-[5px] grid place-items-center"
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
          className="rotate-90 w-[0.875rem]"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </motion.button>
    </div>
  )
}

const CardSpendDuration = () => {
  const [currentDuration, setCurrentDuration] = useState<
    'daily' | 'weekly' | 'monthly'
  >('weekly')
  return (
    <div className="flex border rounded-md shadow-sm border-[#e6e6e6] items-center">
      {durations.map((duration, index) => {
        const isActive = duration == currentDuration
        return (
          <button
            type="button"
            onClick={() => setCurrentDuration(duration)}
            key={duration}
            className={cn(
              `capitalize text-sm flex-1 py-1 px-4`,
              isActive ? 'bg-[#f6f7fa] inset-0' : '',
              index === 0 ? 'border-r' : '',
              index === durations.length - 1 ? 'border-l' : ''
            )}
          >
            {duration}
          </button>
        )
      })}
    </div>
  )
}
export const CardAnimation = () => {
  return (
    <section className="bg-white w-96 mx-auto  flex flex-col gap-3 rounded-xl p-3 ">
      <CardHeader />
      <div className="border shadow-sm flex flex-col gap-10 p-4 border-[#e6e6e6] rounded-xl ">
        <CardStatus />
        <CardAmount />
      </div>
      <section>
        <CardSpendDuration />
        <CardSpendLimit />
      </section>
    </section>
  )
}

const ProgressRing = ({ progress = 50, size = 50, strokeWidth = 5 }) => {
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
        delay: 1.4,
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
          className="stroke-gray-100"
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
          variants={circleVariants}
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
