import { Andika, Commissioner, Fira_Mono, Crimson_Pro } from 'next/font/google'
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

export const sans = Andika({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-sans',
})

export const serif = Crimson_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

const hobx = localFont({
  src: './Hobeaux-Semibold.woff',
  variable: '--font-hobx',
  weight: '600',
})

export const fonts = {
  comm,
  firaMono,
  sans,
  serif,
  hobx,
}
