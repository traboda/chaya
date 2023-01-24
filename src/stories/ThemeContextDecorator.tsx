import React, { ReactNode } from 'react';
import { useDarkMode } from 'storybook-dark-mode';
import { DSRContextProvider } from '../index';
import { ChevronDown, ChevronRight, ChevronUp, ExternalLink, Home, Search, X } from 'react-feather';

const defaultTheme = {
  primary: '#0f51c3',
  secondary: '#77019e',
  color: '#333',
  background: '#eee',
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
      <div className="dsr-p-1 dsr-rounded-lg" style={{ background: theme.background, color: theme.color }}>
          <DSRContextProvider
              theme={theme}
              iconWrapper={(icon, props) => ({
                search: <Search {...props} />,
                times: <X {...props} />,
                chevronUp: <ChevronUp {...props} />,
                chevronDown: <ChevronDown {...props} />,
                chevronRight: <ChevronRight {...props} />,
                externalLink: <ExternalLink {...props} />,
                home: <Home {...props} />,
              })[icon] ?? <>n/a</>}
          >
              {storyFn()}
          </DSRContextProvider>
      </div>
  );
};