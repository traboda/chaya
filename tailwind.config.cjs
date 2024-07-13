const theme = require('./tailwind-theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './src/**/*.{tsx,jsx,ts}',
      './stories/**/*.{mdx,tsx,jsx,ts}',
      './.storybook/**/*.{mdx,tsx,jsx,ts}'
  ],
  darkMode: 'class',
  theme: {
    extend: theme,
  },
  plugins: [],
}
