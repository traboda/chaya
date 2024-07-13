import type { Preview } from "@storybook/react";
import React, {useEffect, useState} from "react";
import { DocsContainer } from "@storybook/blocks";
import { themes } from '@storybook/theming';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

export { decorators } from "./decorators";

import { DARK_MODE_EVENT_NAME, } from 'storybook-dark-mode';
// @ts-ignore
import { addons } from '@storybook/preview-api';

const channel = addons.getChannel();

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
      disable: true,
    },
    darkMode: {
      dark: {
        ...themes.dark,
        brandTitle: 'Chaya UI',
        brandUrl: 'https://chaya.traboda.com',
        brandImage: 'chaya-white-logo.svg',
        brandTarget: '_self',
      },
      light: {
        ...themes.normal,
        brandTitle: 'Chaya UI',
        brandUrl: 'https://chaya.traboda.com',
        brandImage: 'chaya-black-logo.svg',
        brandTarget: '_self',
      }
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
      container: (context: any) => {
        const [isDark, setDark] = useState();

        useEffect(() => {
          channel.on(DARK_MODE_EVENT_NAME, setDark);
          return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
        }, [channel, setDark]);

        const props = { ...context, theme: isDark ? themes.dark : themes.normal }

        return (
          <DocsContainer {...props} />
        );
      }
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
