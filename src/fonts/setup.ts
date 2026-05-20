import localFont from 'next/font/local'
import { Crimson_Text } from 'next/font/google'
import { EB_Garamond } from 'next/font/google'

export const mono = localFont({
  src: './Google-sans-code.ttf',
  display: 'swap',
  variable: '--font-mono',
})

export const sans = EB_Garamond({
  display: 'swap',
  variable: '--font-sans',
})

export const fonts = {
  mono,
  sans,
}
