import React from 'react';
import {ThemeProvider} from '@emotion/react';

export type AppThemeType = {
    primary: string
    primaryTextColor: string
    secondary: string
    secondaryTextColor: string
    color: string
    background: string
    backgroundDark: string
};

const defaultTheme: AppThemeType = {
    primary: '#019e4b',
    primaryTextColor: 'white',
    secondary: '#019e4b',
    secondaryTextColor: '#222',
    color: '#333',
    background: '#FFF',
    backgroundDark: '#f3f2f2'
};

const ThemeContext = ({ children }) => (
    <ThemeProvider theme={defaultTheme}>
        {children}
    </ThemeProvider>
);

export default ThemeContext;