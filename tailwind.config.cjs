/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'dsr-',
  content: ['./src/**/*.{tsx,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        primaryTextColor: 'var(--primaryTextColor)',
        secondary: 'var(--secondary)',
        secondaryTextColor: 'var(--secondaryTextColor)',
        background: 'var(--background)',
        color: 'var(--color)'
      },
      gridTemplateColumns: {
        'flexible-fit': 'repeat(auto-fit, minmax(var(--dsr-flexible-cols-min-width), 1fr))',
        'flexible-fill': 'repeat(auto-fill, minmax(var(--dsr-flexible-cols-min-width), 1fr))'
      }
    },
  },
  plugins: [],
}
