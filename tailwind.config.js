/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-bg": "#f7f3ee",
        "link-color": "#415030",
        "heading-color": "#252222",
        "button-text": "#413a30",
        "link-clicked": "#7755ce",
        "button-bg": "#e7dccb",
      },
      fontFamily: {
        satoshi: ["var(--font-satoshi)"],
        erode: ["var(--font-erode)"],
      },
      transitionProperty: {
        "transform-opacity": "transform, opacity",
      },
    },
  },
  plugins: [],
};
