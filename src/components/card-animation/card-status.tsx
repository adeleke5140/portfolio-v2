import { motion } from 'motion/react'
import { container, item } from './variants'

export const CardStatus = () => {
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            rotate: '90deg',
          }}
          className="w-[0.875rem] text-gray-400 dark:text-[#a5a5a5]"
        >
          <path d="M12 20h.01" />
          <path d="M2 8.82a15 15 0 0 1 20 0" />
          <path d="M5 12.859a10 10 0 0 1 14 0" />
          <path d="M8.5 16.429a5 5 0 0 1 7 0" />
        </motion.svg>
        <motion.div
          variants={item}
          className="border dark:border-[#343434] items-center gap-1.5 flex rounded-md px-1 py-0.5  border-[e6e6e6]"
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
            className="text-green-400 w-3 h-3"
          >
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span className="text-xs text-[#565656] dark:text-[#e5e5e5]">
            Active
          </span>
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
