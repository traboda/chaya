module.exports = {
  important: true,
  mode: 'jit',
  purge: [
      './src/**/*.{js,jsx,ts,tsx}',
  ],
  variants: {
    extend: {
      zIndex: ['hover'],
      filter: ['hover']
    },
  },
  plugins: [],
};
