import React from "react";

import ChayaProvider from "../../src/components/ChayaProvider";

import './styles.css';

const ThemeProvider = ({ children, isDarkTheme }: { children: React.ReactNode, isDarkTheme: boolean }) => (
  <React.Fragment>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link
      href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&family=Poppins:wght@600&display=swap"
      rel="stylesheet"
    />
    <ChayaProvider isDarkTheme={isDarkTheme}>
      {children}
    </ChayaProvider>
  </React.Fragment>
);

export default ThemeProvider;