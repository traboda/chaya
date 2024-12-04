import React from "react";
import {nanoid} from "nanoid";
import { useDarkMode } from 'storybook-dark-mode';

import '../dist/style.css';

import ThemeProvider from "./ThemeProvider";

export const withTheme = () => {
  return (story: any) => {
    const isDarkMode = useDarkMode();

    return (
      <div key={nanoid()} className="p-6 dark:text-white">
        <ThemeProvider isDarkTheme={isDarkMode}>
          {story()}
        </ThemeProvider>
      </div>
    );
  };
};

export const decorators = [
  withTheme(),
];