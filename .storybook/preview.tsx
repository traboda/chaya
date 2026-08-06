import type { Preview } from "@storybook/react-vite";
import React, { useState, useEffect } from "react";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { themes } from 'storybook/theming';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

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
        const [isDark, setIsDark] = useState(false);

        useEffect(() => {
          const channel = context?.channel;
          if (!channel) return;

          const update = (event: any) => {
            setIsDark(event?.globals?.theme === 'dark');
          };

          channel.on(GLOBALS_UPDATED, update);
          try {
            const initial = context?.store?.globals?.globals?.theme
              ?? context?.store?.userGlobals?.globals?.theme;
            setIsDark(initial === 'dark');
          } catch (error) {
            void error;
          }

          return () => channel.off(GLOBALS_UPDATED, update);
        }, [context]);

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
