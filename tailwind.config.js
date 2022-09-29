const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  fontFamily: {
    sans: ['Poppins', 'Roboto', ...defaultTheme.fontFamily.sans],
    serif: [...defaultTheme.fontFamily.serif],
    mono: [...defaultTheme.fontFamily.mono],
  },
  plugins: [],
}


