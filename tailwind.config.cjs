/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'dsr-',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        background: 'var(--background)',
        color: 'var(--color)'
      }
    },
  },
  plugins: [],
}
