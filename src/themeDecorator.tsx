import { useDarkMode } from 'storybook-dark-mode';

import React from 'react';
import {ThemeProvider as TP} from "emotion-theming";
import { ThemeProvider } from "@emotion/react";

export type AppThemeType = {
    isDarkTheme: boolean
    primary: string
    primaryTextColor: string
    secondary: string
    secondaryTextColor: string
    color: string
    background: string
    backgroundDark: string
};

const defaultTheme: AppThemeType = {
    isDarkTheme: false,
    primary: '#019e4b',
    primaryTextColor: 'white',
    secondary: '#019e4b',
    secondaryTextColor: '#222',
    color: '#333',
    background: '#FFF',
    backgroundDark: '#f3f2f2'
};

const darkTheme: AppThemeType = {
    isDarkTheme: true,
    primary: '#019e4b',
    primaryTextColor: 'white',
    secondary: '#019e4b',
    secondaryTextColor: '#222',
    color: '#FFF',
    background: '#111',
    backgroundDark: '#000'
};

const ThemeContextDecorator = storyFn => (
    <TP theme={useDarkMode() ? darkTheme : defaultTheme}>
        <ThemeProvider theme={useDarkMode() ? darkTheme : defaultTheme}>
            {storyFn()}
        </ThemeProvider>
    </TP>
);

export default ThemeContextDecorator;