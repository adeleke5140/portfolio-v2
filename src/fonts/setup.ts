import localFont from 'next/font/local'

export const mono = localFont({
  src: './Google-sans-code.ttf',
  display: 'swap',
  variable: '--font-mono',
})

const sans = localFont({
  src: [
    {
      path: './XETBook/XETBook-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './XETBook/XETBook-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './XETBook/XETBook-Medium.otf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
})

export const fonts = {
  mono,
  sans,
}
