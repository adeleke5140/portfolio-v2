import { Commissioner, Fira_Mono, Inter, clash } from 'next/font/google'
import localFont from 'next/font/local'

export const comm = Commissioner({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-comm',
})

export const firaMono = Fira_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-fira',
})

export const berkeleyMono = localFont({
  src: './BerkeleyMono-Regular.otf',
  display: 'swap',
  variable: '--font-berkeley-mono',
})

export const clashDisplay = localFont({
  src: './ClashDisplay-Variable.woff2',
  display: 'swap',
  variable: '--clash-display',
})

export const fonts = {
  comm,
  clashDisplay,
  berkeleyMono,
}
