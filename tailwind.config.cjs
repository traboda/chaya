/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'dsr-',
  content: ['./src/**/*.{tsx,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary/50': 'var(--primary50)',
        primaryTextColor: 'var(--primaryTextColor)',
        secondary: 'var(--secondary)',
        'secondary/50': 'var(--secondary50)',
        secondaryTextColor: 'var(--secondaryTextColor)',
        background: 'var(--background)',
        contrast: 'var(--contrast)',
        'contrast/50': 'var(--contrast50)',
        color: 'var(--color)',
      },
      animation: {
        'stripes': 'stripes 60s linear infinite',
      },
      keyframes: {
        'stripes': {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
      },
      gridTemplateColumns: {
        'flexible-fit': 'repeat(auto-fit, minmax(var(--dsr-flexible-cols-min-width), 1fr))',
        'flexible-fill': 'repeat(auto-fill, minmax(var(--dsr-flexible-cols-min-width), 1fr))'
      }
    },
  },
  plugins: [],
}
