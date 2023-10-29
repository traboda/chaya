import { useContext, useMemo } from 'react';
import Color from 'color';
import tailwindColors from 'tailwindcss/colors';

import DSRContext from '../contexts/DSRContext';
import { RGBAtoRGB } from '../utils/color';

export type ChayaColorType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast' | 'shade';
export type ChayaVariantType = 'solid' | 'outline' | 'minimal' | 'link';

const useColors = (variant: ChayaVariantType, color: ChayaColorType, hover: boolean = false) => {
  const { theme, isDarkTheme } = useContext(DSRContext);

  const activeColor = useMemo(() => {
    const background = Color(theme?.background);

    const colors = {
      primary: theme?.primary,
      secondary: theme?.secondary,
      success: tailwindColors.green['600'],
      danger: tailwindColors.red['500'],
      warning: tailwindColors.yellow['500'],
      contrast: background.negate().toString(),
      shade: isDarkTheme ? background.lighten(3).toString() : background.darken(1).toString(),
    };

    return colors[color];
  }, [theme, color]);

  const backgroundColor = useMemo(() => {
    const backgroundColors = {
      solid: activeColor,
      outline: 'rgba(0, 0, 0, 0)',
      minimal: Color(RGBAtoRGB(
        Color(activeColor).fade(0.70),
        isDarkTheme ? 40 : 255,
      )).toString(),
      link: 'rgba(0, 0, 0, 0)',
    };
    return backgroundColors[variant];
  }, [activeColor, variant, isDarkTheme]);

  const textColor = useMemo(
    () => {
      if (variant === 'solid' || (variant === 'outline' && hover)) return Color(activeColor).isDark() ? '#fff' : '#333';
      else if (variant === 'minimal' && ['contrast', 'shade'].includes(color)) return Color(backgroundColor).isDark() ? '#fff' : '#333';
      return isDarkTheme ? Color(activeColor).lighten(0.2).toString() : activeColor;
    },
    [activeColor, variant, hover],
  );

  const hoverColor = useMemo(() => {
    switch (variant) {
      case 'solid': return Color(activeColor).darken(0.2).toString();
      case 'outline': return activeColor;
      case 'minimal': return Color(backgroundColor).darken(0.1).toString();
    }
  }, [activeColor]);

  return { activeColor, backgroundColor, textColor, hoverColor };

};

export default useColors;