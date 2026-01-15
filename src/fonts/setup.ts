import localFont from 'next/font/local'

export const berkeleyMono = localFont({
  src: './BerkeleyMono-Regular.otf',
  display: 'swap',
  variable: '--font-berkeley-mono',
})

export const sans = localFont({
  src: './Google-sans-variable.ttf',
  display: 'swap',
  variable: '--font-sans',
})

export const fonts = {
  berkeleyMono,
  sans,
}
