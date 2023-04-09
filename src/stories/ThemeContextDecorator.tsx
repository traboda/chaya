import React, { ReactNode } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import {
  AlertTriangle, Check,
  ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronUp,
  ExternalLink, Home, Info, Search, Settings, X,
} from 'react-feather';
import { nanoid } from 'nanoid';

import { DSRContextProvider } from '../index';

const defaultTheme = {
  primary: '#0f51c3',
  primaryTextColor: '#fff',
  secondary: '#77019e',
  secondaryTextColor: '#fff',
  color: '#333',
  background: '#eee',
};

const darkTheme = {
  primary: '#1d66e5',
  primaryTextColor: '#fff',
  secondary: '#b64fd7',
  secondaryTextColor: '#fff',
  color: '#FFF',
  background: '#222',
};

const ThemeContextDecorator = ({ children }: { children: ReactNode }) => {
  const theme = useDarkMode() ? darkTheme : defaultTheme;

  return (
    <div
      key={nanoid()}
      className="dsr-p-4 dsr-rounded-lg"
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
          externalLink: <ExternalLink {...props} />,
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