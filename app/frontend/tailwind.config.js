/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16a892',
        'primary-dark': '#0f6f5f',
        secondary: '#1e3a8a',
      },
    },
  },
  plugins: [],
}
