import { Commissioner } from 'next/font/google'
import localFont from 'next/font/local'

export const mono = localFont({
  src: './Google-sans-code.ttf',
  display: 'swap',
  variable: '--font-mono',
})

export const sans = Commissioner({
  display: 'swap',
  variable: '--font-sans',
})

export const fonts = {
  mono,
  sans,
}
