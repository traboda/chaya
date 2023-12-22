/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'dsr-',
  content: [
      './src/**/*.{tsx,jsx,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'primary/50': 'var(--primary50)',
        'primary/10': 'var(--primary10)',
        'primary-minimal': 'var(--primary-minimal)',
        'primary-bright': 'var(--primary-bright)',
        primaryTextColor: 'var(--primaryTextColor)',

        secondary: 'var(--secondary)',
        'secondary/50': 'var(--secondary50)',
        'secondary/10': 'var(--secondary10)',
        'secondary-minimal': 'var(--secondary-minimal)',
        'secondary-bright': 'var(--secondary-bright)',
        secondaryTextColor: 'var(--secondaryTextColor)',

        background: 'var(--background)',
        'background-darken-1': 'var(--background-darken-1)',
        'background-darken-2': 'var(--background-darken-2)',
        'background-darken-3': 'var(--background-darken-3)',
        'background-lighten-1': 'var(--background-lighten-1)',
        'background-lighten-2': 'var(--background-lighten-2)',
        'background-lighten-3': 'var(--background-lighten-3)',

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
