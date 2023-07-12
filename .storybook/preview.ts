import { themes } from '@storybook/theming';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import '../dist/style.css';
import chayaTheme from "./chayaTheme";
import chayaDarkTheme from "./chayaDarkTheme";

export { decorators } from "./decorators";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
          "Introduction",
          "Components",
      ]
    }
  },
  darkMode: {
    current: 'dark',
    dark: {
      ...themes.dark,
      ...chayaDarkTheme,
      brandImage: 'https://raw.githubusercontent.com/traboda/chaya/main/.storybook/public/chaya-white-logo.svg',
    },
    light: {
      ...themes.normal,
      ...chayaTheme,
    },
    classTarget: 'body',
    stylePreview: true,
  }
}


const preview = {
  parameters: {
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
