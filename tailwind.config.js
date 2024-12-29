/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
      },
      fontFamily: {
        custom: [
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif', // Fallback
        ],
      },
    },
  },
  plugins: [],
}

