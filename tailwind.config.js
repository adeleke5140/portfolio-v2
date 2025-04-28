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
            'code::before': {
              content: '',
            },
            'code::after': {
              content: '',
            },
            pre: {
              backgroundColor: '#fff',
              color: '#575279',
              paddingRight: '1em',
              paddingLeft: 10,
              userSelect: 'auto',
              tabSize: '4',
              border: '1px solid #e5e7eb',
              fontFamily: 'var(--font-fira)!important',
            },
            code: {
              color: 'inherit',
              backgroundColor: '#fff',
              fontSize: '0.895rem',
              fontWeight: '400',
              userSelect: 'auto',
              borderRadius: 4,
              padding: '2px 8px',
              fontFamily: 'var(--font-fira)!important',
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
              fontSize: 15,
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
            img: {
              borderRadius: '8px',
            },
          },
        },
      },
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
        mono: ['var(--font-fira)', ...defaultTheme.fontFamily.mono],
      },
      transitionProperty: {
        'transform-opacity': 'transform, opacity',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
