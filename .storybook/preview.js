import '../dist/style.css';
import { themes } from '@storybook/theming';
import ThemeContextDecorator from "../src/stories/ThemeContextDecorator";

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