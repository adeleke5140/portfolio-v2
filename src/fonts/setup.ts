import localFont from 'next/font/local'
import { Instrument_Sans, Instrument_Serif } from 'next/font/google'

export const berkeleyMono = localFont({
  src: './BerkeleyMono-Regular.otf',
  display: 'swap',
  variable: '--font-berkeley-mono',
})

export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const neue = localFont({
  src: [
    {
      path: './PPNeueMontreal-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './PPNeueMontreal-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-neue',
  display: 'swap',
})

export const editorialNew = localFont({
  src: [
    {
      path: './PPEditorialNew-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './PPEditorialNew-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './PPEditorialNew-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './PPEditorialNew-Heavy.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-editorial-new',
  display: 'swap',
})

export const fonts = {
  berkeleyMono,
  instrumentSans,
  instrumentSerif,
  neue,
  editorialNew,
}
