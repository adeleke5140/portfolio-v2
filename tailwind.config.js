/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h2: {
              fontSize: 16,
              fontWeight: 600,
            },
            code: {
              color: 'inherit',
              backgroundColor: 'rgba(247,247,247,0.8)',
              fontSize: '0.895rem',
              fontWeight: '400',
              userSelect: 'auto',
              borderRadius: 4,
              padding: '2px 8px',
            },
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
            pre: {
              backgroundColor: 'rgba(247,247,247,0.8)',
              color: '#413a30',
              paddingRight: 10,
              paddingLeft: 10,
              userSelect: 'auto',
            },
            'pre code:before': {
              paddingLeft: 'unset',
            },
            'pre code:after': {
              paddingRight: 'unset',
            },
            ul: {
              color: '#e5e5e5',
            },
            li: {
              paddingLeft: 0,
              color: '#19260d',
            },
            p: {
              color: '#19260d',
            },

            'li::marker': {
              color: 'currentColor',
              paddingLeft: 0,
            },
            'h1, h2, h3, h4, h5': {
              fontSize: '1.2rem',
            },
            a: {
              textDecoration: 'underline',
            },
            blockquote: {
              color: '#e5e5e5',
              'border-left-color': '#7796d4',
              'border-left-width': '0.12rem',
            },
          },
        },
      },
      colors: {
        'ken-black': '#000',
        'ken-white': '#FFFCFF',
        'ken-grey': '#a0a0a0',
        'ken-primary': '#ededed',
        'ken-secondary': '#f2f2f2',
        'ken-tertiary': '#ededed',
      },
      fontFamily: {
        sans: ['var(--font-comm)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--font-serif)', ...defaultTheme.fontFamily.serif],
        reading: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-fira)', ...defaultTheme.fontFamily.mono],
        hobx: ['var(--font-hobx)', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'ken-pattern': "url('/images/texture.png')",
      },
      transitionProperty: {
        'transform-opacity': 'transform, opacity',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
