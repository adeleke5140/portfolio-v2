import localFont from 'next/font/local'

export const mono = localFont({
  src: './Google-sans-code.ttf',
  display: 'swap',
  variable: '--font-mono',
})

export const sans = localFont({
  src: './Google-sans-variable.ttf',
  display: 'swap',
  variable: '--font-sans',
})

export const fonts = {
  mono,
  sans,
}
