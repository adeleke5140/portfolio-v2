import { animate } from 'framer-motion'
import { useState, useEffect } from 'react'

export const useAnimatedText = (text: string, duration = 0.5, delay = 0) => {
  const [cursor, setCursor] = useState(0)
  const [sCursor, setSCurosr] = useState(0)
  const [prevText, setPrevText] = useState(text)

  if (prevText !== text) {
    setPrevText(text)
    setSCurosr(text.startsWith(prevText) ? cursor : 0)
  }

  useEffect(() => {
    const controls = animate(sCursor, text.split('').length, {
      duration,
      delay,
      ease: 'easeOut',
      onUpdate(latest) {
        setCursor(Math.floor(latest))
      },
    })

    return () => controls.stop()
  }, [sCursor, duration, delay, text])

  return text.split('').slice(0, cursor).join('')
}
