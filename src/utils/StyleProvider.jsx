import React from 'react';

import '../../styles/style.css';
import { ThemeProvider } from './theme';

const themes = {
  light: {
    primary: '#F5F5F5',
    primaryTextColor: 'black',
    secondary: '#FFD600',
    secondaryTextColor: 'black',
    foreground: "#000000",
    background: "white",
    inputBackground: "rgba(255,255,255,0.5)",
  },
  dark: {
    primary: '#212121',
    primaryTextColor: '#eee',
    secondary: '#FFD600',
    secondaryTextColor: 'black',
    color: "white",
    background: "rgba(0,0,30,0.5)",
    inputBackground: "rgba(0,0,30,0.5)",
  }
};

export default ({ children, theme }) =>  <React.Fragment>
  <ThemeProvider value={{ ...themes[theme] }}>
    {children}
  </ThemeProvider>
</React.Fragment>;