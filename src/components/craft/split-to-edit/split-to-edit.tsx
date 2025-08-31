'use client'
import { useEffect, useRef, useState } from 'react'

export const SplitToEdit = () => {
  const [hour, setHour] = useState('')
  const [min, setMin] = useState('')
  const hourRef = useRef<HTMLInputElement | null>(null)
  const minRef = useRef<HTMLInputElement | null>(null)
  const [length, setLength] = useState({
    hour: 0,
    min: 9,
  })

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
    <div className="flex gap-3 items-center">
      <div className="bg-[hsl(255deg,31%,97%)] flex gap-2 h-10 p-2 rounded-lg">
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
          <span
            style={{
              fontFamily: 'Nunito',
            }}
            className="font-bold  text-[hsl(251deg,9%,74%)]"
          >
            Hr.
          </span>
        </Label>
      </div>
      <div className="bg-[hsl(255deg,31%,97%)] h-10 max-w-fit p-2 rounded-lg">
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
          <span
            style={{
              fontFamily: 'Nunito',
            }}
            className="font-bold text-[hsl(251deg,9%,74%)]"
          >
            Min.
          </span>
        </Label>
      </div>
      <button
        aria-label="submit"
        className="text-black rounded-lg h-10 bg-[hsl(255deg,31%,97%)] p-3 "
      >
        <CheckMark className="size-4" />
      </button>
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

const Label = ({ children, ...rest }: React.ComponentProps<'label'>) => {
  return (
    <label
      {...rest}
      className="flex px-1 gap-3 items-center relative after:absolute after:rounded-md after:content-[''] after:h-5 after:w-[1.5px]"
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
      className="w-5 focus:outline-none caret-transparent  font-bold bg-transparent"
    />
  )
}
