import { Newsreader } from 'next/font/google'
import localFont from 'next/font/local'

export const berkeleyMono = localFont({
  src: './BerkeleyMono-Regular.otf',
  display: 'swap',
  variable: '--font-berkeley-mono',
})

export const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const fonts = {
  berkeleyMono,
  newsreader,
}
