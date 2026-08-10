import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/introduction.mdx',
    '../stories/getting-started/*.mdx',
    '../stories/features/*.mdx',
    '../stories/components/**/*.@(mdx|js|jsx|mjs|ts|tsx)',
    '../stories/hooks/**/*.@(mdx|js|jsx|mjs|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.build = {
      ...config.build,
      chunkSizeWarningLimit: 2500,
      rollupOptions: {
        ...config.build?.rollupOptions,
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('"use client"'))
            return;
          if (warning.code === 'SOURCEMAP_ERROR') return;
          warn(warning);
        },
      },
    };
    return config;
  },
};
export default config;
