const postcss = require("postcss");

module.exports = {
  stories: [
      '../stories/**/*.stories.@(ts|tsx|js|jsx)'
  ],
  features: {
    emotionAlias: false,
  },
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
                purge: false,
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
