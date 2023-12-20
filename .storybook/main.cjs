const path = require('path');


module.exports = {
  "stories": [
      "../stories/introduction/*.stories.mdx",
      "../stories/components/**",
      "../stories/compositions/*.mdx",
      "../stories/*.stories.tsx"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    ident: 'postcss',
                    plugins: [
                      require('tailwindcss'),
                      require('autoprefixer'),
                    ],
                  },
                },
              },
              {
                loader: 'sass-loader',
                options: { implementation: require.resolve('sass') }
              },
            ],
          },
        ]
      }
    },
    '@storybook/addon-a11y',
    "@storybook/addon-viewport",
    "@storybook/theming",
    "@storybook/addon-storysource",
    "storybook-dark-mode",
    "@storybook/addon-mdx-gfm",
  ],
  "framework": {
    name: "@storybook/react-webpack5",
    options: {}
  },
  "staticDirs": ['./public'],
  docs: {
    autodocs: 'tag',
    defaultName: 'Docs',
  }
};