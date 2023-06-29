import '../dist/style.css';
import { themes } from '@storybook/theming';
import ThemeContextDecorator from "../src/stories/ThemeContextDecorator";

import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

const customViewports = {
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
  }
};

const preview = {
  parameters: {
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
    },
  },
};

export default preview;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    dark: {
      ...themes.dark,
      brandImage: 'https://raw.githubusercontent.com/traboda/chaya/main/src/assets/chaya-white-logo.svg',
    },
    light: {
      ...themes.normal,
      brandImage: 'https://raw.githubusercontent.com/traboda/chaya/main/src/assets/chaya-black-logo.svg',
    }
  }
}

export const decorators = [
  (Story) => (
      <ThemeContextDecorator>
        <Story />
      </ThemeContextDecorator>
  ),
];