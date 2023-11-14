'use client';
import React, { memo, ReactElement, ReactNode, useEffect, useMemo } from 'react';
import Color from 'color';

import DSRContext, { IconWrapperType, LinkWrapper } from '../contexts/DSRContext';
import { Theme } from '../types/theme';

const defaultLinkWrapper = (link: string, component: ReactElement) => component;

const ThemeScript = memo(
  ({ theme, isDarkTheme }: { theme: Theme; isDarkTheme: boolean }) => {
    const generateCSS = () => {
      const cssProperties = [];
      Object.entries(theme).forEach(([key, value]) => {
        cssProperties.push(`--${key}: ${value};`);
      });
      cssProperties.push(`--primary50: ${Color(theme.primary).alpha(0.5).toString()};`);
      cssProperties.push(`--secondary50: ${Color(theme.secondary).alpha(0.5).toString()};`);

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
        var style = document.getElementById('dsr-theme-style');
        if (!style) {
          style = document.createElement('style');
          style.id = 'dsr-theme-style';
          document.head.appendChild(style);
        }
        style.innerHTML = \`:root { ${css} }\`;

        if (${isDarkTheme}) {
          document.body.classList.add("dsr-dark");
        } else {
          document.body.classList.remove("dsr-dark");
        }
      `;
    };

    useEffect(() => {
      const script = document.getElementById('dsr-theme-script');

      if (script) {
        // Execute the script for style and class manipulation
        eval(`!function(){${getScriptSrc()}}();`);
      }
    }, [theme, isDarkTheme]);

    useEffect(() => {
      // Create and append the script element
      const newScript = document.createElement('script');
      newScript.id = 'dsr-theme-script';
      newScript.textContent = `!function(){${getScriptSrc()}}();`;
      document.body.appendChild(newScript);

      // Clean up function to remove the script when the component unmounts
      return () => {
        const scriptToRemove = document.getElementById('dsr-theme-script');
        if (scriptToRemove) {
          scriptToRemove.parentNode?.removeChild(scriptToRemove);
        }
      };
    }, [theme, isDarkTheme]);

    return (
      <script
        id="dsr-theme-script"
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