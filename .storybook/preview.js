import { themes } from '@storybook/theming';
import "../src/index.css"

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
  options: {
    storySort: {
      order: ['Intro','*'],
    },
  },
  darkMode: {
    current: 'light',
    dark: { ...themes.dark },
    light: { ...themes.light }
  }
};
