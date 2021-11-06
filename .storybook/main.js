const postcss = require("postcss");

module.exports = {
  stories: [
      '../stories/**/*.stories.@(ts|tsx|js|jsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
          postcssOptions: {
            plugins: {
              tailwindcss: {
                important: true,
                mode: 'jit',
                purge: [
                  './src/**/*.{js,jsx,ts,tsx}',
                  './stories/*.stories.tsx'
                ],
                variants: {
                  extend: {
                    zIndex: ['hover'],
                    filter: ['hover']
                  },
                },
                plugins: [],
              },
              autoprefixer: {},
            },
          },
        },
      },
    },
  ],
  typescript: {
    check: true,
  }
};
