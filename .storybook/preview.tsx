import type { Preview } from "@storybook/react-vite";
import React, { useState, useEffect } from "react";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { themes } from 'storybook/theming';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

export { decorators } from "./decorators";

const ThemedDocsContainer = ({ children, context, ...rest }: any) => {
  const [isDark, setIsDark] = useState(() => {
    try {
      return context?.store?.globals?.globals?.theme === 'dark'
        || context?.store?.userGlobals?.globals?.theme === 'dark'
        || context?.globals?.theme === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const channel = context?.channel;
    if (!channel) return;

    const update = (event: any) => {
      setIsDark(event?.globals?.theme === 'dark');
    };

    channel.on(GLOBALS_UPDATED, update);
    return () => channel.off(GLOBALS_UPDATED, update);
  }, [context]);

  return (
    <DocsContainer {...rest} context={context} theme={isDark ? themes.dark : themes.light}>
      {children}
    </DocsContainer>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewMode: 'docs',
    backgrounds: { disable: true },
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
      container: ThemedDocsContainer,
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
