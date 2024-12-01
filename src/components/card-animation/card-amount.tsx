import { motion } from 'framer-motion'

export const CardAmount = () => {
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
        className="text-sm text-[#5e5d65] dark:text-[#a5a5a5] min-h-[20px]"
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
          className="font-semibold dark:text-[#e5e5e5] text-3xl min-h-[36px]"
        >
          $16,058.94
        </motion.p>
        <div className="flex rounded-md ">
          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            type="button"
            className="px-[6px] border dark:border-[#343434]  shadow-sm border-r-[0.5px]  rounded-tl-md rounded-bl-md  grid place-items-center"
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
            className="px-[6px] shadow-sm dark:border-[#343434]  border-l-[0.5px] border rounded-tr-md rounded-br-md grid place-items-center"
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
