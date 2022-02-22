const classes = ['red-500', 'green-500', 'yellow-500'];

module.exports = {
  important: true,
  mode: 'jit',
  purge: {
    content: './src/**/*.{js,jsx,ts,tsx}',
    safelist: ['bg', 'border', 'text', 'hover:text', 'hover:bg', 'hover:border']
        .flatMap(i => {
            const _class = [];
            classes.forEach(c => _class.push(`${i}-${c}`));
            return _class;
        })
  },
  variants: {
    extend: {
      zIndex: ['hover'],
      filter: ['hover']
    },
  },
  plugins: [],
};
