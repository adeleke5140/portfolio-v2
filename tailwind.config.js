/** @type {import('tailwindcss').Config} */
const { mauve } = require("@radix-ui/colors");
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            code: {
              backgroundColor: "#E7DFCF",
              color: "#413a30",
              borderRadius: "0.25rem",
              padding: "0.25rem",
              fontWeight: "500",
            },
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
            pre: {
              backgroundColor: "#E7DFCF",
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
          },
        },
      },
      colors: {
        "app-bg": "#f7f3ee",
        "link-color": "#415030",
        "heading-color": "#252222",
        "button-text": "#413a30",
        "link-clicked": "#7755ce",
        "button-bg": "#e7dccb",
        ...mauve,
      },
      fontFamily: {
        satoshi: ["var(--font-satoshi)"],
        erode: ["var(--font-erode)"],
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
      animation: {
        slideUpAndFade: "slideUpAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        slideDownAndFade:
          "slideDownAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        slideRightAndFade:
          "slideRightAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)",
        wiggle: "wiggle 1000ms infinite ease-in-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
