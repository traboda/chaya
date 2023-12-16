import { themes } from '@storybook/theming';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { DocsContainer } from '@storybook/addon-docs';
import { useDarkMode } from 'storybook-dark-mode';

import '../dist/style.css';
import React from "react";

export { decorators } from "./decorators";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewMode: 'docs',
  options: {
    storySort: {
      order: [
          "Introduction",
          "Components",
      ]
    }
  },
}


const preview = {
  viewMode: 'docs',
  parameters: {
    darkMode: {
      current: 'dark',
      dark: {
        ...themes.dark,
        brandTitle: 'Chaya UI by Traboda',
        brandUrl: 'https://chaya.traboda.com',
        brandImage: 'chaya-white-logo.svg',
        brandTarget: '_self',
      },
      light: {
        ...themes.normal,
        brandTitle: 'Chaya UI by Traboda',
        brandUrl: 'https://chaya.traboda.com',
        brandImage: 'chaya-black-logo.svg',
        brandTarget: '_self',
      },
      classTarget: 'body',
      stylePreview: true,
    },
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: 'Table of Contents',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
      container: (context) => {
        const isDark = useDarkMode();

        const props = {
          ...context,
          theme: isDark ? themes.dark : themes.light,
        };

        return React.createElement(DocsContainer, props);
      },
    },
    viewport: {
      viewports: {
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
