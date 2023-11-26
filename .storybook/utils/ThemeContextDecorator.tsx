import React, { ReactNode } from 'react';
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
    color: '#FAFAFA',
    background: '#212121',
};

const ThemeContextDecorator = ({ children }: { children: ReactNode }) => {
    const theme = useDarkMode() ? darkTheme : defaultTheme;

    return (
        <div key={nanoid()} className="dsr-p-4">
            <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
            <DSRContextProvider
                theme={theme}
                iconWrapper={(icon, props) => ({
                    times: <i className={`ri-close-line`} {...props} />,
                    'chevron-up': <i className={`ri-arrow-up-s-fill`} />,
                    'chevron-down': <i className={`ri-arrow-down-s-fill`} />,
                    'chevrons-left': <i className={`ri-arrow-left-double-line`} />,
                    'chevron-left': <i className={`ri-arrow-left-s-fill`} />,
                    'chevron-right': <i className={`ri-arrow-right-s-fill`} {...props} />,
                    'chevrons-right': <i className={`ri-arrow-right-double-line`} {...props} />,
                    plus: <i className={`ri-add-line`} {...props} />,
                    info: <i className={`ri-information-line`} {...props} />,
                    'alert-triangle': <i className={`ri-error-warning-line`} {...props} />,
                    check: <i className={`ri-checkbox-circle-line`} {...props} />,
                    bin: <i className={`ri-delete-bin-line`} {...props} />,
                    search: <i className={`ri-search-line`} {...props} />,
                })[icon] ?? <i className={`ri-${icon}-line ri-${icon}`} {...props} />}
            >
                {children}
            </DSRContextProvider>
        </div>
    );

};

export default ThemeContextDecorator;