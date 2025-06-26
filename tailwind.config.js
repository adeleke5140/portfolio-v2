/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'ken-black': '#000',
        'ken-white': '#FFFCFF',
        'ken-grey': 'oklch(.439 0 0)',
        'ken-primary': '#ededed',
        'ken-secondary': '#f2f2f2',
        'ken-tertiary': '#ededed',
      },
      fontFamily: {
        sans: ['var(--font-comm)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-berkeley-mono)', ...defaultTheme.fontFamily.mono],
        clash: ['var(--clash-display)', ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        'transform-opacity': 'transform, opacity',
      },
      backgroundImage: {
        macintosh: "url('/images/macintosh-blue.png')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
