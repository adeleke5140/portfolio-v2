'use client'
import { motion, AnimatePresence, Variants } from 'motion/react'
import { Check, Copy } from 'lucide-react'
import { RefObject, useEffect, useRef, useState } from 'react'
import { integrations } from './int'
import { cn } from '@/lib/utils'
import { useOnClickOutside } from 'usehooks-ts'

export const CopyButton = ({
  copy,
  setCopy,
}: {
  copy: boolean
  setCopy: (copy: boolean) => void
}) => {
  useEffect(() => {
    if (copy)
      setTimeout(() => {
        setCopy(false)
      }, 1500)
  }, [copy])
  return (
    <button aria-label="copy pr link" onClick={() => setCopy(true)}>
      <div className="grid">
        <span
          style={{
            gridArea: '1/1',
          }}
          key="clipboard"
        >
          <Copy
            className={cn(
              'w-3 h-3 text-gray-500 transition-transform duration-300',
              copy ? 'scale-0' : 'scale-100'
            )}
          />
        </span>
        <span
          style={{
            gridArea: '1/1',
          }}
          key="checkmark"
        >
          <Check
            className={cn(
              'w-3 h-3 text-gray-500 transition-transform duration-300',
              copy ? 'scale-100' : 'scale-0'
            )}
          />
        </span>
      </div>
    </button>
  )
}

export const IntegrationMenu = () => {
  const [current, setCurrent] = useState('github')
  const [showMenu, setShowMenu] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref as RefObject<HTMLElement>, () => setShowMenu(false))

  return (
    <div className="grid place-items-center h-[294px] w-full">
      <motion.button
        layoutId="button-wrapper"
        onClick={() => setShowMenu(!showMenu)}
        style={{
          borderRadius: '16px',
        }}
        className="py-1 border border-gray-200 bg-white px-3 text-sm"
      >
        <motion.span layoutId="button-title" className="block">
          All Integrations
        </motion.span>
      </motion.button>
      <AnimatePresence>
        {showMenu ? (
          <motion.div
            ref={ref}
            layoutId="button-wrapper"
            className="absolute overflow-hidden "
          >
            <div
              style={{
                borderRadius: '16px',
              }}
              className="flex w-full flex-col gap-2 cursor-pointer border-[0.5px] dark:border-[#282828]  border-gray-200 bg-white dark:bg-[#1a1a1a] p-1.5 "
            >
              <motion.span
                layoutId="button-title"
                style={{
                  borderRadius: '9999px',
                }}
                className="py-1 bg-[#f7f8fa] w-fit px-3 text-sm"
              >
                All Integrations
              </motion.span>
              <div className="bg-[#f7f8fa] dark:bg-[#232323] flex flex-col gap-1 rounded-xl p-3 font-mono">
                {integrationItems.map((item) => (
                  <IntegrationItem key={item.title} {...item} />
                ))}
              </div>
              <div className="flex overflow-hidden">
                {integrations.map((integration) => (
                  <button
                    onClick={() => setCurrent(integration.name)}
                    key={integration.name}
                    className="relative pb-0.5 py-1 px-2"
                  >
                    {current == integration.name ? (
                      <motion.span
                        layoutId="movable"
                        style={{
                          borderRadius: 9999,
                        }}
                        className="absolute z-10 inset-0 bg-gray-100 dark:bg-[#282828] mix-blend-darken dark:mix-blend-lighten"
                        transition={{
                          type: 'spring',
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    ) : null}
                    <span className="inline-flex items-center gap-2">
                      {integration.icon}
                      <span className="text-sm capitalize">
                        {integration.name}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

const integrationItems = [
  {
    id: '#380',
    title: 'fix-checkout-process',
    color: '#3fb950',
    icon: undefined,
  },
  {
    id: '#346',
    title: 'update-api-docs',
    color: '#ab7df8',
    icon: undefined,
  },
  {
    id: '#205',
    title: 'payment-gateway',
    color: '#3fb950',
    icon: (
      <svg
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        height="16"
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z"></path>
      </svg>
    ),
  },
]

function IntegrationItem({
  id,
  title,
  color,
  icon,
}: {
  id: string
  title: string
  color: string
  icon: React.ReactNode
}) {
  const [copy, setCopy] = useState(false)
  return (
    <div
      onClick={() => {
        setCopy(true)
      }}
      className="flex group/item items-center justify-between border-b border-dashed dark:border-b-[#343434] pb-1"
    >
      <span className="text-sm inline-flex gap-1 items-center">
        <span
          className={cn(
            title === 'fix-checkout-process'
              ? 'text-[#3fb950]'
              : title === 'update-api-docs'
                ? 'text-[#ab7df8]'
                : 'text-[#3fb950]'
          )}
        >
          {icon ? (
            icon
          ) : (
            <svg
              className="size-4"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              height="16"
              aria-hidden="true"
              fill="currentColor"
            >
              <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
            </svg>
          )}
        </span>
        <span className="text-gray-500 dark:text-[#a0a0a0]">{id}</span>
      </span>

      <div className="flex gap-2 overflow-hidden pl-10 relative items-center">
        <p className="text-sm relative transition-transform duration-300 delay-75 group-hover/item:-translate-x-5  text-blue-600 dark:text-blue-400 font-medium">
          {title}
        </p>

        <div className="-right-4 group-hover/item:-translate-x-4 transition-transform duration-300 delay-75 absolute">
          <CopyButton copy={copy} setCopy={setCopy} />
        </div>
      </div>
    </div>
  )
}
