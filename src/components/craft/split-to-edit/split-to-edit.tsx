'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const t = {
  duration: 0.6,
  type: 'spring',
  bounce: 0.6,
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
          className={cn(
            'bg-[hsl(255deg,31%,97%)] h-10 rounded-[0.65rem]'
            // p ? '[&_label]:gap-0.5' : ''
          )}
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
                fontFamily: 'Nunito',
                margin: p ? '0 0 0 1px' : '0 0 0 12px',
              }}
              className="font-bold inline-block text-[hsl(251deg,9%,74%)]"
            >
              Hr.
            </motion.span>
          </Label>
        </motion.div>
        <motion.div
          className={cn('bg-[hsl(255deg,31%,97%)] h-10 max-w-fit')}
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
                fontFamily: 'Nunito',
                margin: p ? '0 0 0 1px' : '0 0 0 12px',
              }}
              className="font-bold inline-block text-[hsl(251deg,9%,74%)]"
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
          onClick={() => setP((prev) => !prev)}
          className={cn(
            'text-black h-10 bg-[hsl(255deg,31%,97%)] p-3'
            // playAnimation ? 'translate-x-0' : 'translate-x-2',
            // playAnimation ? 'rounded-l-none' : ''
          )}
        >
          <span>
            {p ? <Pen className="size-4" /> : <CheckMark className="size-4" />}
          </span>
        </motion.button>
      </div>
    </div>
  )
}

const CheckMark = ({ className }: { className: string }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        fill="currentColor"
        className={className}
      >
        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
      </svg>
    </>
  )
}

const Pen = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={className}
    >
      <path
        d="M18.086,5.5,3.293,20.293a1.008,1.008,0,0,0-.27.49l-2,9A1,1,0,0,0,2,31a1.067,1.067,0,0,0,.217-.023l9-2a1.008,1.008,0,0,0,.49-.27L26.5,13.914Z"
        fill="#92909d"
      />
      <path
        d="M30.121,6.051,25.949,1.878a3.006,3.006,0,0,0-4.242,0L19.5,4.086,27.914,12.5l2.208-2.207A3.007,3.007,0,0,0,30.121,6.051Z"
        fill="#92909d"
      />
    </svg>
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
