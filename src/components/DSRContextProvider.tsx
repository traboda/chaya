import React, { ReactElement, ReactNode, useEffect } from 'react';
import DSRContext, { LinkWrapper } from '../contexts/DSRContext';
import { Theme } from '../types/theme';

const defaultLinkWrapper = (link: string, component: ReactElement) => <a href={link}>{component}</a>;

const DSRContextProvider = ({ children, linkWrapper = defaultLinkWrapper, theme }: {
  children: ReactNode,
  linkWrapper?: LinkWrapper,
  theme: Theme
}) => {
  useEffect(() => {
    Object.keys(theme).forEach(
      key => document.documentElement.style.setProperty(`--${key}`, theme[key as keyof Theme]),
    );
  }, [theme]);

  return (
      <DSRContext.Provider
          value={{
            linkWrapper,
            theme,
          }}
      >
          {children}
      </DSRContext.Provider>
  );
};

export default DSRContextProvider;