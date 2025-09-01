'use client'

import { AnimatePresence, motion, useMotionValue } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

function Reset({ doStuff }: { doStuff: () => void }) {
  const [rotate, setRotate] = useState(false)
  return (
    <button
      onClick={() => {
        doStuff()
        setRotate(true)
      }}
      data-rotate={rotate}
      className="absolute reset transition-colors right-4 top-4 rounded-xl hover:bg-gray-100/50  p-2"
    >
      <svg
        aria-label="Reset"
        xmlns="http://www.w3.org/2000/svg"
        className="size-4  "
        viewBox="0 0 24 24"
        fill="none"
      >
        <a id="rotate">
          <path
            d="M4.47852 12C4.47852 7.85786 7.83638 4.5 11.9785 4.5C14.4012 4.5 16.0555 5.46268 17.7064 7.25H15.25C14.8358 7.25 14.5 7.58579 14.5 8C14.5 8.41421 14.8358 8.75 15.25 8.75H18.75C19.4404 8.75 20 8.19036 20 7.5V4C20 3.58579 19.6642 3.25 19.25 3.25C18.8358 3.25 18.5 3.58579 18.5 4V5.90778C16.7377 4.10436 14.7767 3 11.9785 3C7.00795 3 2.97852 7.02944 2.97852 12C2.97852 16.9706 7.00795 21 11.9785 21C15.8983 21 19.2311 18.4945 20.4662 14.9999C20.6042 14.6094 20.3995 14.1809 20.009 14.0429C19.6185 13.9048 19.19 14.1095 19.0519 14.5001C18.022 17.4141 15.2429 19.5 11.9785 19.5C7.83638 19.5 4.47852 16.1421 4.47852 12Z"
            fill="currentColor"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            to="0,5"
            dur="0.1s"
            fill="freeze"
            begin="rotate.click"
          />
        </a>
      </svg>
    </button>
  )
}

export const RecaptchaButton = () => {
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const handleReset = () => {
    setIsVisible(false)
    setLoading(false)
  }

  return (
    <div className="p-8 flex flex-col gap-2">
      <Reset doStuff={handleReset} />
      <motion.label
        layout
        transition={{
          duration: 0.5,
          type: 'spring',
        }}
        style={{
          fontFamily: 'Nunito',
        }}
        className="bg-gray-100 w-fit mx-auto select-none items-center grid grid-cols-[1em_auto_auto] gap-3 font-semibold text-ken-grey rounded-full p-2 px-3"
      >
        <input
          type="checkbox"
          checked={isVisible}
          onChange={() => setIsVisible(true)}
          className="appearance-none bg-white m-0"
        />
        I'm not a robot
        <svg
          viewBox="0 0 140 120"
          className="size-8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m117 62.063c-2e-3 -0.60232-0.0159-1.2014-0.0429-1.7976v-33.991l-9.3971 9.3971c-7.691-9.4141-19.391-15.427-32.496-15.427-13.638 0-25.754 6.5097-33.413 16.591l15.403 15.565c1.5095-2.7917 3.6539-5.1895 6.2395-7.0005 2.6891-2.0985 6.4993-3.8143 11.77-3.8143 0.63674 0 1.1282 0.0744 1.4893 0.21458 6.5304 0.51543 12.191 4.1194 15.524 9.3503l-10.903 10.903c13.81-0.0542 29.411-0.086 35.825 7e-3"
            fill="#1c3aa9"
          />
          <path
            d="m74.819 20.246c-0.60232 2e-3 -1.2014 0.0159-1.7976 0.0429h-33.991l9.3971 9.3971c-9.4141 7.691-15.427 19.391-15.427 32.496 0 13.638 6.5098 25.754 16.591 33.413l15.565-15.403c-2.7917-1.5095-5.1895-3.6539-7.0005-6.2395-2.0984-2.6891-3.8143-6.4993-3.8143-11.77 0-0.63674 0.0744-1.1282 0.21458-1.4893 0.51543-6.5304 4.1194-12.191 9.3503-15.524l10.903 10.903c-0.0542-13.81-0.0861-29.411 7e-3 -35.825"
            fill="#4285f4"
          />
          <path
            d="m33.002 62.181c2e-3 0.60232 0.0159 1.2014 0.0429 1.7976v33.991l9.3971-9.3971c7.691 9.4141 19.391 15.427 32.496 15.427 13.638 0 25.754-6.5097 33.413-16.591l-15.403-15.565c-1.5095 2.7917-3.6539 5.1895-6.2395 7.0005-2.6891 2.0985-6.4993 3.8143-11.77 3.8143-0.63674 0-1.1282-0.0744-1.4893-0.21458-6.5304-0.51543-12.191-4.1194-15.524-9.3503l10.903-10.903c-13.81 0.0542-29.411 0.086-35.825-7e-3"
            fill="#ababab"
          />
        </svg>
      </motion.label>
      <AnimatePresence initial={false}>
        {isVisible ? (
          <motion.div
            initial={{
              y: '50%',
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              type: 'spring',
              bounce: 0.2,
            }}
            className="h-80 w-80 flex flex-col pb-4 gap-4 bg-[#fafafa] rounded-2xl p-1 shadow-[rgba(149,157,165,0.2)_0px_17px_19px_0px]"
          >
            <DrawingSection />
            <div className="self-end px-4">
              <button
                type="button"
                style={{
                  fontFamily: 'Nunito',
                }}
                onClick={async () => {
                  if (!loading) {
                    setLoading(true)
                    await new Promise((resolve) => setTimeout(resolve, 2000))
                    setLoading(false)
                  }
                }}
                disabled={loading}
                data-loading={loading}
                className="bg-[#006cff] shadow-md min-w-[88.02px] data-[loading=true]:opacity-50 data-[completed=false]:opacity-50 data-[completed=false]:cursor-not-allowed rounded-full px-2 py-1 text-white font-semibold"
              >
                {loading ? 'Verifying' : 'Verify'}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function DrawingSection() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isActive, setIsActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const containerEl = containerRef.current

    if (!containerEl) return

    const parentEl = containerEl.parentElement
    if (!parentEl) return

    parentEl.style.cursor = 'none'
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setIsActive(true)
    }

    const handleMouseLeave = () => {
      setIsActive(false)
    }

    parentEl.addEventListener('mousemove', handleMouseMove)
    parentEl.addEventListener('mouseenter', handleMouseEnter)
    parentEl.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      parentEl.style.cursor = ''
      parentEl.removeEventListener('mousemove', handleMouseMove)
      parentEl.removeEventListener('mouseenter', handleMouseEnter)
      parentEl.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  return (
    <div
      style={{
        boxShadow:
          '0px 0px 0px 0.5px #0000000f,0px 0.5px 2px -1px #0000000f,0px 1px 2px 0px #0000000a',
      }}
      className="relative overflow-hidden h-[calc(100%-3rem)] rounded-2xl w-full bg-[#fff]"
    >
      <svg
        className="absolute inset-0"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dotPattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="0.5" fill="#4135353d" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotPattern)" />
      </svg>

      <div className="px-4 relative z-30 py-4">
        <p
          style={{
            fontFamily: 'Nunito',
          }}
          className="font-semibold select-none"
        >
          Connect the Numbers in Order
        </p>
        <p
          style={{
            fontFamily: 'Nunito',
          }}
          className="text-gray-500 text-xs select-none"
        >
          (1 to 8)
        </p>
      </div>

      <div ref={containerRef} />
      <AnimatePresence>
        {isActive ? (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            className="size-7 fixed pointer-events-none"
            viewBox="0 0 512 512"
            style={{
              top: y,
              left: x,
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
          >
            <path
              fill="#FF6E83"
              d="M462.555 51.464c-27.492-27.492-58.857-40.701-70.055-29.503l-75.72 75.72l99.558 99.558l75.72-75.72c11.198-11.198-2.011-42.562-29.503-70.055"
            />
            <path
              fill="#BFBCAF"
              d="M414.557 99.462c-31.367-31.367-67.151-46.437-79.927-33.661l-77.54 77.54L370.678 256.93l77.54-77.54c12.776-12.776-2.294-48.561-33.661-79.928"
            />
            <path
              fill="#2B2622"
              d="M115.545 449.979L47.25 479.683c-4.97 2.162-10.752-.115-12.913-5.085a9.86 9.86 0 0 1 0-7.828l29.705-68.295c8.622-19.823 31.681-28.903 51.504-20.281s28.903 31.681 20.281 51.504c-4.102 9.429-11.55 16.462-20.282 20.281"
            />
            <path
              fill="#FFD469"
              d="M403.416 223.955q.111-.155.216-.315c9.851-14.117-5.223-48.099-35.188-78.064c-29.966-29.966-63.949-45.039-78.065-35.187q-.157.104-.311.213c-.127.094-.259.183-.383.281c-.348.268-.688.551-1.007.87l-.161.161h-.001v.001L108.477 291.954s-50.978 126.152-31.77 145.359s145.359-31.77 145.359-31.77l180.2-180.2c.319-.319.603-.659.871-1.008c.097-.123.185-.254.279-.38"
            />
            <path
              fill="#E5AA6E"
              d="m108.477 291.954l-4.002 24.94c-.589 3.668 2.588 6.835 6.254 6.237l17.873-2.919c3.53-.576 6.647 2.349 6.296 5.908l-1.99 20.174c-.349 3.542 2.737 6.461 6.253 5.915l18.063-2.802c3.693-.573 6.853 2.66 6.195 6.339l-3.09 17.282c-.636 3.559 2.309 6.739 5.906 6.376l20.33-2.05c3.43-.346 6.314 2.542 5.963 5.971l-2.096 20.51c-.361 3.529 2.696 6.455 6.206 5.941l25.871-3.79l-145.8 61.009c11.631-11.631-18.485-41.748-30.117-30.117z"
            />
            <path
              fill="#FFB636"
              d="M145.892 298.543a6.79 6.79 0 0 1-4.801-11.591l150.356-150.356a6.79 6.79 0 0 1 9.602 9.603L150.693 296.554a6.77 6.77 0 0 1-4.801 1.989m43.211 36.421l150.355-150.356a6.79 6.79 0 1 0-9.602-9.603L179.5 325.362a6.79 6.79 0 0 0 9.603 9.602m38.41 38.409l150.355-150.355a6.79 6.79 0 1 0-9.602-9.603L217.91 363.771a6.79 6.79 0 0 0 9.603 9.602"
            />
          </motion.svg>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
