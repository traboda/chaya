const path = require('path');
module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-postcss",
    '@storybook/addon-a11y',
    "storybook-dark-mode",
    "@storybook/addon-viewport"
  ],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },
  "staticDirs": ['../src/assets'],
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
    autodocs: true
  }
};