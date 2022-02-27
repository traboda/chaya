const classes = ['red-500', 'green-500', 'yellow-500'];

module.exports = {
  important: true,
  mode: 'jit',
  purge: {
    content: './src/**/*.{js,jsx,ts,tsx}',
  },
  variants: {
    extend: {
      zIndex: ['hover'],
      filter: ['hover']
    },
  },
  plugins: [],
};
