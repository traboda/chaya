import React, { useEffect } from "react";
import { nanoid } from "nanoid";
import { useGlobals } from "storybook/preview-api";
import { withThemeByClassName } from "@storybook/addon-themes";

// @ts-expect-error Side-effect CSS import is handled by Storybook bundler.
import '../dist/style.css';

import ThemeProvider from "./ThemeProvider";

const DARK_BODY_STYLE_ID = 'chaya-dark-body-style';

const withChayaTheme = () => {
  return (story: any) => {
    const [globals] = useGlobals();
    const isDarkMode = globals.theme === 'dark';

    useEffect(() => {
      if (!document.getElementById(DARK_BODY_STYLE_ID)) {
        const style = document.createElement('style');
        style.id = DARK_BODY_STYLE_ID;
        style.textContent = 'body.dark { background-color: #171717; }';
        document.head.appendChild(style);
      }
    }, []);

    return (
      <div key={nanoid()} className="p-6 dark:text-white dark:bg-neutral-900 min-h-screen">
        <ThemeProvider isDarkTheme={isDarkMode}>
          {story()}
        </ThemeProvider>
      </div>
    );
  };
};

export const decorators = [
  withChayaTheme(),
  withThemeByClassName({
    themes: {
      light: '',
      dark: 'dark',
    },
    defaultTheme: 'light',
    parentSelector: 'body',
  }),
];
