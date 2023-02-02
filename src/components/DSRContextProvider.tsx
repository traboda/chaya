import React, { ReactElement, ReactNode, useEffect, useMemo } from 'react';
import Color from 'color';

import DSRContext, { IconWrapperType, LinkWrapper } from '../contexts/DSRContext';
import { Theme } from '../types/theme';

const defaultLinkWrapper = (link: string, component: ReactElement) => component;

const DSRContextProvider = ({ children, linkWrapper = defaultLinkWrapper, theme, iconWrapper }: {
  children: ReactNode,
  linkWrapper?: LinkWrapper,
  iconWrapper?: IconWrapperType,
  theme: Theme
}) => {
  const isDarkTheme = useMemo(() => Color(theme?.background).isDark(), [theme]);

  useEffect(() => {
    Object.keys(theme).forEach(
      key => document.documentElement.style.setProperty(`--${key}`, theme[key as keyof Theme]),
    );

    if (isDarkTheme) document.body.classList.add('dsr-dark');
    else document.body.classList.remove('dsr-dark');
  }, [theme]);

  return (
      <DSRContext.Provider
          value={{
            linkWrapper,
            iconWrapper,
            theme,
            isDarkTheme,
          }}
      >
          {children}
      </DSRContext.Provider>
  );
};

export default DSRContextProvider;