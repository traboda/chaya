import React, { ReactElement, ReactNode, useEffect } from 'react';
import DSRContext, { IconSet, LinkWrapper } from '../contexts/DSRContext';
import { Theme } from '../types/theme';
import Color from 'color';

const defaultLinkWrapper = (link: string, component: ReactElement) => <a href={link}>{component}</a>;

const DSRContextProvider = ({ children, linkWrapper = defaultLinkWrapper, theme, iconSet }: {
  children: ReactNode,
  linkWrapper?: LinkWrapper,
  iconSet?: IconSet,
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
            iconSet,
            isDarkTheme: Color(theme?.background).isDark(),
          }}
      >
          {children}
      </DSRContext.Provider>
  );
};

export default DSRContextProvider;