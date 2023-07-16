const path = require('path');
module.exports = {
  "stories": [
      "../src/stories/introduction/*.stories.mdx",
      "../src/stories/components/**",
      "../src/stories/compositions/*.stories.tsx",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-postcss",
    '@storybook/addon-a11y',
    "@storybook/addon-viewport",
    "@storybook/theming",
    "@storybook/addon-storysource",
    "storybook-dark-mode",
  ],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },
  "staticDirs": ['./public'],
  "webpackFinal": async (config, {
    configType
  }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../src/')
    });
    return config;
  },
  docs: {
    autodocs: false
  }
};