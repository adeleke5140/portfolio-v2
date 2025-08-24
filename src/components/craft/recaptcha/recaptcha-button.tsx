'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

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

const Canvas = (props: React.ComponentProps<'canvas'>) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 10, 0, 2 * Math.PI)
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d', { antialias: true })

    if (!context) return
    //Our first draw
    draw(context)
  }, [draw])

  return <canvas ref={canvasRef} {...props} />
}

export const RecaptchaButton = () => {
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="p-8 flex flex-col gap-2">
      <Reset doStuff={() => setIsVisible(false)} />
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
            <div
              style={{
                boxShadow:
                  '0px 0px 0px 0.5px #0000000f,0px 0.5px 2px -1px #0000000f,0px 1px 2px 0px #0000000a',
              }}
              className=" relative overflow-hidden h-[calc(100%-3rem)] rounded-2xl w-full bg-[#fff] "
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
                  className="font-semibold"
                >
                  Connect the Numbers in Order
                </p>
                <p
                  style={{
                    fontFamily: 'Nunito',
                  }}
                  className="text-gray-500 text-xs"
                >
                  (1 to 8)
                </p>
              </div>

              <Canvas />
            </div>
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
                className="bg-[#006cff] shadow-md min-w-[88.02px] data-[loading=true]:opacity-50 rounded-full px-2 py-1 text-white font-semibold"
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
