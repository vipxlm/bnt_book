/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B17457',
        secondary: '#D8D2C2',
        'text-base': '#4A4947',
        'light-gray': '#FAF7F0',
        'gray': '#D8D2C2',
        'dark-gray': '#4A4947',
        'gradient-start': '#B17457',
        'gradient-end': '#B17457',
        'card-bg': '#B17457',
        'special': '#B17457',
        'accent': '#B17457',
        'price': '#4A4947'
      }
    },
  },
  plugins: [],
}