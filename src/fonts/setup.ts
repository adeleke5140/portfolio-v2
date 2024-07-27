import { Newsreader, Commissioner, Inter_Tight, Italiana } from '@next/font/google';

export const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-newsreader',
});

export const inter = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-inter',
});

export const comm = Commissioner({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-comm',
});


export const italiana = Italiana({
  subsets: ['latin'],
  display: 'swap',
 weight: ['400'],
 variable: '--font-italiana'
})