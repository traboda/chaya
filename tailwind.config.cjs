/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'dsr-',
  content: ['./src/**/*.{tsx,jsx}'],
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
