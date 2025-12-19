'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion, Transition } from 'motion/react'
import { Nunito } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'
import { CheckMark, Pen } from './icons'

export const nunito = Nunito({ subsets: ['latin'] })

const t = {
  duration: 0.6,
  type: 'spring',
  bounce: 0.5,
} as Transition

const buttonIcons = {
  edit: <Pen className="size-4" />,
  done: <CheckMark className="size-4" />,
}
export const SplitToEdit = () => {
  const [hour, setHour] = useState('')
  const [min, setMin] = useState('')
  const hourRef = useRef<HTMLInputElement | null>(null)
  const minRef = useRef<HTMLInputElement | null>(null)
  const [length, setLength] = useState({
    hour: 0,
    min: 9,
  })
  const [p, setP] = useState(false)
  const [buttonState, setButtonState] = useState<'edit' | 'done'>('edit')

  useEffect(() => {
    const hourEl = hourRef.current
    if (!hourEl) return

    const contentLength = hourEl.value.length
    setLength((prev) => ({
      ...prev,
      hour: contentLength,
    }))
  }, [hour])

  useEffect(() => {
    const minEl = minRef.current
    if (!minEl) return

    const contentLength = minEl.value.length
    setLength((prev) => ({
      ...prev,
      min: contentLength,
    }))
  }, [min])
  return (
    <div>
      <div className="flex items-center">
        <motion.div
          style={{
            borderRadius: p ? '10.4px 0 0 10.4px' : '10.4px',
          }}
          initial={false}
          animate={{
            x: p ? 0 : -10,
            padding: p ? '8px 0 8px 8px' : '8px',
          }}
          transition={t}
          className="bg-gray-100/50 h-10 rounded-[0.65rem]"
        >
          <Label
            htmlFor="hour"
            style={
              {
                '--move-x': length.hour,
              } as React.CSSProperties
            }
          >
            <Input
              id="hour"
              type="text"
              ref={hourRef}
              value={hour}
              setValue={setHour}
            />
            <motion.span
              style={{
                margin: p ? '0 0 0 1px' : '0 0 0 12px',
              }}
              className={cn(
                'font-bold inline-block text-[hsl(251deg,9%,74%)]',
                nunito.className
              )}
            >
              Hr.
            </motion.span>
          </Label>
        </motion.div>
        <motion.div
          className={cn('bg-gray-100/50 h-10 max-w-fit')}
          style={{
            borderRadius: p ? '0' : '10.4px',
            padding: p ? '8px 0px 8px 0px' : '8px',
          }}
          transition={t}
        >
          <Label
            htmlFor="min"
            style={
              {
                '--move-x': length.min,
              } as React.CSSProperties
            }
          >
            <Input
              ref={minRef}
              id="min"
              type="text"
              value={min}
              setValue={setMin}
            />
            <motion.span
              style={{
                margin: p ? '0 0 0 1px' : '0 0 0 12px',
              }}
              className={cn(
                'font-bold inline-block text-[hsl(251deg,9%,74%)]',
                nunito.className
              )}
            >
              Min.
            </motion.span>
          </Label>
        </motion.div>
        <motion.button
          initial={false}
          style={{
            borderRadius: p ? '0 10.4px 10.4px 0' : '10.4px',
          }}
          animate={{
            x: p ? 0 : 10,
          }}
          transition={t}
          aria-label="submit"
          onClick={() => {
            setP((prev) => !prev)
            setButtonState((prev) => {
              if (prev === 'done') {
                return 'edit'
              }
              return 'done'
            })
          }}
          className="text-black relative h-10 bg-gray-100/50 p-3"
        >
          <span className="inline-block z-20 rounded-[10.4px] absolute inset-0  bg-[hsl(318deg,51.72%,54.51%,0%)]" />
          <AnimatePresence initial={false} mode="wait">
            <motion.span className="inline-block relative bottom-0.5">
              {buttonIcons[buttonState]}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )
}

const Label = ({ children, ...rest }: React.ComponentProps<'label'>) => {
  return (
    <label
      {...rest}
      className="flex px-1 items-center relative after:absolute after:rounded-md after:content-[''] after:h-5 after:w-[1.5px]"
    >
      {children}
    </label>
  )
}

const Input = ({
  id,
  value,
  setValue,
  type,
  ref,
  className,
}: React.ComponentProps<'input'> & {
  setValue: (val: string) => void
}) => {
  return (
    <input
      id={id}
      type={type}
      ref={ref}
      value={value}
      max={12}
      onChange={(e) => {
        const val = e.target.value
        if (Number(val) > 99) {
          return
        }
        setValue(e.target.value)
      }}
      style={{
        fontFamily: 'Nunito',
      }}
      className={cn(
        'w-5 focus:outline-none caret-transparent  font-bold bg-transparent',
        className
      )}
    />
  )
}
