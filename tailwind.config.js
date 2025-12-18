/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './content/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Claude Code exact gray scale
        gray: {
          50: 'rgb(243, 243, 243)',
          100: 'rgb(238, 238, 238)',
          200: 'rgb(222, 222, 222)',
          300: 'rgb(206, 206, 206)',
          400: 'rgb(158, 158, 158)',
          500: 'rgb(112, 112, 112)',
          600: 'rgb(80, 80, 80)',
          700: 'rgb(62, 62, 62)',
          800: 'rgb(37, 37, 37)',
          900: 'rgb(23, 23, 23)',
          950: 'rgb(10, 10, 10)',
        },
      },
    },
  },
  plugins: [],
}
