/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,njk}"],
  theme: {
    extend: {
      colors: {
        'cv-light': '#9e9e9e',
        'cv-dark': '#1b1b1b',
        'cv-primary': '#424242',
        'cv-red': '#b71c1c',
        'cv-background': '#e9ebee',
      },
      width: {
        'letter': '8.27in',
        'left-column': '200px',
      },
      height: {
        'letter': '12in',
      },
      padding: {
        'page': '16pt',
      },
      margin: {
        'page': '16pt',
      },
      spacing: {
        'column-section': '3rem',
        'columns-gap': '30px',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      keyframes: {
        'octocat-wave': {
          '0%, 100%': { transform: 'rotate(0)' },
          '20%, 60%': { transform: 'rotate(-25deg)' },
          '40%, 80%': { transform: 'rotate(10deg)' },
        }
      },
      animation: {
        'octocat-wave': 'octocat-wave 560ms ease-in-out',
      }
    },
  },
  plugins: [],
}
