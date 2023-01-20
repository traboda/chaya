import React, { ReactNode } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { DSRContextProvider } from '../index';

const defaultTheme = {
  primary: '#0f51c3',
  secondary: '#77019e',
  color: '#333',
  background: '#fff',
};

const darkTheme = {
  primary: '#1d66e5',
  secondary: '#b64fd7',
  color: '#FFF',
  background: '#222',
};

export default (storyFn: () => ReactNode) => {
  const theme = useDarkMode() ? darkTheme : defaultTheme;
  return (
      <DSRContextProvider theme={theme}>
          <div style={{ background: theme.background, color: theme.color }}>
              {storyFn()}
          </div>
      </DSRContextProvider>
  );
};