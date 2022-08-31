module.exports = {
  stories: [
      '../stories/**/*.stories.@(ts|tsx|js|jsx|mdx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  typescript: {
    check: true,
  }
};
