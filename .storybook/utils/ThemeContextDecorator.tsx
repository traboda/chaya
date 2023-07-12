import React, { ReactNode } from 'react';
import {
    AlertTriangle, Check,
    ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp,
    ExternalLink, Home, Info, Search, Settings, X,
} from 'react-feather';
import { nanoid } from 'nanoid';

import { DSRContextProvider } from '../../src/index';
import {useDarkMode} from "storybook-dark-mode";

const defaultTheme = {
    primary: '#0f51c3',
    primaryTextColor: '#fff',
    secondary: '#77019e',
    secondaryTextColor: '#fff',
    color: '#333',
    background: '#FAFAFA',
};

const darkTheme = {
    primary: '#1d66e5',
    primaryTextColor: '#fff',
    secondary: '#b64fd7',
    secondaryTextColor: '#fff',
    color: '#FFF',
    background: '#111',
};

const ThemeContextDecorator = ({ children }: { children: ReactNode }) => {
    const theme = useDarkMode() ? darkTheme : defaultTheme;

    return (
        <div
            key={nanoid()}
            style={{ background: theme.background, color: theme.color }}
        >
            <DSRContextProvider
                theme={theme}
                iconWrapper={(icon, props) => ({
                    search: <Search {...props} />,
                    times: <X {...props} />,
                    'chevron-up': <ChevronUp {...props} />,
                    'chevron-down': <ChevronDown {...props} />,
                    'chevrons-left': <ChevronsLeft {...props} />,
                    'chevron-left': <ChevronLeft {...props} />,
                    'chevron-right': <ChevronRight {...props} />,
                    'chevrons-right': <ChevronsRight {...props} />,
                    'external-link': <ExternalLink {...props} />,
                    home: <Home {...props} />,
                    settings: <Settings {...props} />,
                    info: <Info {...props} />,
                    'alert-triangle': <AlertTriangle {...props} />,
                    check: <Check {...props} />,
                })[icon] ?? <>n/a</>}
            >
                {children}
            </DSRContextProvider>
        </div>
    );

};

export default ThemeContextDecorator;