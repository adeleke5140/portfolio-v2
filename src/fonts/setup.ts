import { Commissioner, Fira_Mono, Inter } from 'next/font/google'
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

export const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-sans',
})

export const fonts = {
  comm,
  firaMono,
  sans,
}
