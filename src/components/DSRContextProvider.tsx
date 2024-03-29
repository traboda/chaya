'use client';
import React, { memo, ReactElement, ReactNode, useEffect, useMemo } from 'react';
import Color from 'color';

import DSRContext, { IconWrapperType, LinkWrapper } from '../contexts/DSRContext';
import { Theme } from '../types/theme';
import { RGBAtoRGB } from '../utils/color';

const defaultLinkWrapper = (link: string, component: ReactElement) => component;

const ThemeScript = memo(
  ({ theme, isDarkTheme }: { theme: Theme; isDarkTheme: boolean }) => {
    const generateCSS = () => {
      const cssProperties = [];
      Object.entries(theme).forEach(([key, value]) => {
        cssProperties.push(`--${key}: ${value};`);
      });

      const primaryColor = Color(theme.primary);

      cssProperties.push(`--primary50: ${primaryColor.alpha(0.5).toString()};`);
      cssProperties.push(`--primary10: ${primaryColor.alpha(0.1).toString()};`);

      cssProperties.push(`--primary-bright: ${primaryColor.lighten(0.8).saturate(0.8).toString()};`);

      cssProperties.push(`--primary-minimal: ${Color(RGBAtoRGB(
        primaryColor.fade(isDarkTheme ? 0.3 : 0.9),
        isDarkTheme ? 5 : 255,
      )).toString()};`);

      const secondaryColor = Color(theme.secondary);
      cssProperties.push(`--secondary50: ${secondaryColor.alpha(0.5).toString()};`);
      cssProperties.push(`--secondary10: ${secondaryColor.alpha(0.1).toString()};`);
      cssProperties.push(`--secondary-bright: ${secondaryColor.lighten(0.8).saturate(0.8).toString()};`);
      cssProperties.push(`--secondary-minimal: ${Color(RGBAtoRGB(
        secondaryColor.fade(isDarkTheme ? 0.3 : 0.9),
        isDarkTheme ? 5 : 255,
      )).toString()};`);

      const background = Color(theme.background);
      cssProperties.push(`--contrast: ${background.negate().toString()};`);
      cssProperties.push(`--contrast50: ${background.negate().alpha(0.5).toString()};`);

      [0.1, 0.2, 0.3].forEach((n) => {
        cssProperties.push(`--background-lighten-${n * 10}: ${background.lighten(n).toString()};`);
        cssProperties.push(`--background-darken-${n * 10}: ${background.darken(n).toString()};`);
      });

      return cssProperties.join('\n');
    };

    const getScriptSrc = () => {
      const css = generateCSS();
      return `
        var style = document.getElementById('theme-style');
        if (!style) {
          style = document.createElement('style');
          style.id = 'theme-style';
          document.head.appendChild(style);
        }
        style.innerHTML = \`:root { ${css} }\`;

        if (${isDarkTheme}) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
      `;
    };

    useEffect(() => {
      const script = document.getElementById('theme-script');

      if (script) {
        eval(`!function(){${getScriptSrc()}}();`);
      }
    }, [theme]);

    return (
      <script
        id="theme-script"
        dangerouslySetInnerHTML={{
          __html: `!function(){${getScriptSrc()}}();`,
        }}
      />
    );
  },
  (prevProps, nextProps) => prevProps.theme === nextProps.theme,
);


const DSRContextProvider = ({ children, linkWrapper = defaultLinkWrapper, theme, iconWrapper }: {
  children: ReactNode,
  linkWrapper?: LinkWrapper,
  iconWrapper?: IconWrapperType,
  theme: Theme
}) => {

  const isDarkTheme = useMemo(() => Color(theme?.background).isDark(), [theme]);

  return (
    <DSRContext.Provider
      value={{
        linkWrapper,
        iconWrapper,
        theme,
        isDarkTheme,
      }}
    >
      <ThemeScript theme={theme} isDarkTheme={isDarkTheme} />
      {children}
    </DSRContext.Provider>
  );
};

export default DSRContextProvider;