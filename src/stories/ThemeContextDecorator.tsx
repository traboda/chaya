import React, { ReactNode } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { DSRContextProvider } from '../index';

const defaultTheme = {
  primary: '#019e4b',
  secondary: '#019e4b',
  color: '#333',
  background: '#FFF',
};

const darkTheme = {
  primary: '#019e4b',
  secondary: '#019e4b',
  color: '#FFF',
  background: '#111',
};

export default (storyFn: () => ReactNode) => {
  return (
      <DSRContextProvider theme={useDarkMode() ? darkTheme : defaultTheme}>
          {storyFn()}
      </DSRContextProvider>
  );
};