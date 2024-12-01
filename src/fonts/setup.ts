import {
  Cairo_Play,
  Commissioner,
  Crimson_Pro,
  Space_Mono,
} from '@next/font/google'
import localFont from '@next/font/local'
export const comm = Commissioner({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-comm',
})

export const crim_pro = Cairo_Play({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-crim',
})

export const sm = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-sm',
})

export const neueMontreal = localFont({
  src: './PPNeueMontreal-Book.otf',
  variable: '--font-neue',
})
export const fonts = {
  crim_pro,
  comm,
  sm,
  neueMontreal,
}
