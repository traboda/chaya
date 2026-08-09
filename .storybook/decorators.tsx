import React, { useEffect } from 'react';

import { useGlobals } from 'storybook/preview-api';

// @ts-expect-error Side-effect CSS import is handled by Storybook bundler.
import '../dist/style.css';

import ThemeProvider from './ThemeProvider';

const withChayaTheme = () => {
  return (story: any) => {
    const [globals] = useGlobals();
    const isDarkMode = globals.theme === 'dark';

    useEffect(() => {
      document.body.classList.toggle('dark', isDarkMode);
      document.documentElement.classList.toggle('dark', isDarkMode);
      document.body.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#ffffff';
      document.body.style.color = isDarkMode ? '#f0f0f0' : '#1a1a1a';
    }, [isDarkMode]);

    return (
      <div className="p-6">
        <ThemeProvider isDarkTheme={isDarkMode}>{story()}</ThemeProvider>
      </div>
    );
  };
};

export const decorators = [withChayaTheme()];
