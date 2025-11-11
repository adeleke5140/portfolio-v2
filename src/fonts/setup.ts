import { Instrument_Sans, Instrument_Serif } from 'next/font/google'
import localFont from 'next/font/local'

export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-sans',
})

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-serif',
})

export const berkeleyMono = localFont({
  src: './BerkeleyMono-Regular.otf',
  display: 'swap',
  variable: '--font-berkeley-mono',
})

export const fonts = {
  instrumentSans,
  instrumentSerif,
  berkeleyMono,
}
