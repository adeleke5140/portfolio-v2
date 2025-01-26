import { Andika, Commissioner, Space_Mono, Crimson_Pro } from 'next/font/google'
export const comm = Commissioner({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-comm',
})

export const sm = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-sm',
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

export const fonts = {
  comm,
  sm,
  sans,
  serif,
}
