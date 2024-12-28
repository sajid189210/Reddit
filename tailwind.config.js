/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
      }
    },
  },
  plugins: [],
}

