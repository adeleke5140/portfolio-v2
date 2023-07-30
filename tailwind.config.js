/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            code: {
              color: "#e5e5e5",
              fontSize: "0.895rem",
              fontWeight: "400",
            },
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
            pre: {
              backgroundColor: "#242424",
              color: "#413a30",
              paddingRight: 0,
              paddingLeft: 0,
            },
            "pre code:before": {
              paddingLeft: "unset",
            },
            "pre code:after": {
              paddingRight: "unset",
            },
            "ul": {
              color: "#e5e5e5",
            },
            "li": {
              paddingLeft: 0
            },
            "li::marker": {
              color: "currentColor",
              paddingLeft: 0
            },
            "h1, h2, h3, h4, h5": {
              fontSize: '1.2rem',
              color: "#a0a0a0"
            },
            "a": {
              color: "#e5e5e5",
              textDecoration: "underline",
            },
            "blockquote": {
              color: "#e5e5e5",
              "border-left-width": '0.12rem'
            },
            "strong": {
              color: "#e5e5e5",
            }
          },
        },
      },
      colors: {
        "ken-black": "#171717",
        "ken-grey": "#a0a0a0",
        "ken-primary": "#e5e5e5",
        "ken-secondary": "#f2f2f2",
        "ken-tertiary": "#ededed"
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-newsreader)", ...defaultTheme.fontFamily.serif],
        inter: ["var(--font-inter)"],
        grotesk: ["var(--font-grotesk)"],
      },
      transitionProperty: {
        "transform-opacity": "transform, opacity",
      },
      keyframes: {
        slideUpAndFade: {
          "0%": { opacity: 0, transform: "translateY(2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          "0%": { opacity: 0, transform: "translateX(-2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideDownAndFade: {
          "0%": { opacity: 0, transform: "translateY(-2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          "0%": { opacity: 0, transform: "translateX(2px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        wiggle: {
          "0%": { transform: "rotate(10deg)" },
          "25%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(20deg)" },
          "75%": { transform: "rotate(-5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
