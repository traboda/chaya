import type { Preview } from "@storybook/react-vite";
import React from "react";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { themes } from 'storybook/theming';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';

import ThemeProvider from "./ThemeProvider";
export { decorators } from "./decorators";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewMode: 'docs',
    backgrounds: {
      disabled: true,
    },
    docs: {
      autodocs: 'tag',
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h2, h3',
        ignoreSelector: '#primary',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
      container: ({ children, context, ...rest }: any) => {
        const isDark = context?.store?.globals?.globals?.theme === 'dark';
        const props = { ...rest, context, theme: isDark ? themes.dark : themes.normal };

        return (
          <ThemeProvider isDarkTheme={isDark}>
            <DocsContainer {...props}>{children}</DocsContainer>
          </ThemeProvider>
        );
      }
    },
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        iphoneSE: {
          name: 'iPhone SE',
          styles: {
            width: '320px',
            height: '568px',
          }
        },
        pixel7A: {
          name: 'Pixel 7A',
          styles: {
            width: '411px',
            height: '823px',
          }
        },
      },
    },
  },
};

export default preview;
