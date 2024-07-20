import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../stories/introduction.mdx",
    "../stories/getting-started/*.mdx",
    "../stories/features/*.mdx",
    "../stories/components/**/*.@(mdx|js|jsx|mjs|ts|tsx)",
    "../src/components/**/**/stories/*.@(mdx|js|jsx|mjs|ts|tsx)",
    "../stories/hooks/**/*.@(mdx|js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
    '@storybook/addon-a11y',
    "@storybook/addon-viewport",
    "@storybook/addon-storysource",
    "@storybook/addon-docs",
    "storybook-dark-mode"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
