import React, { useContext, useMemo } from 'react';
import Color from 'color';
import tailwindColors from 'tailwindcss/colors';
import clsx from 'clsx';

import DSRContext from '../contexts/DSRContext';
import { RGBAtoRGB } from '../utils/color';

export type BadgeProps = {
  variant?: 'solid' | 'outline' | 'minimal',
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast' | 'shade',
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  id?: string,
  className?: string,
  style?: React.CSSProperties,
  children: React.ReactNode,
  circular?: boolean,
};

const badgeSizeDefinitions = {
  xs: 'dsr-px-1.5 dsr-py-0 dsr-text-xs',
  sm: 'dsr-px-2.5 dsr-py-1 dsr-text-sm',
  md: 'dsr-px-3.5 dsr-py-2 dsr-text-base',
  lg: 'dsr-px-5 dsr-py-3 dsr-text-lg',
  xl: 'dsr-px-6 dsr-py-4 dsr-text-xl',
};

const Badge = ({
  children, variant = 'minimal', color = 'primary', size = 'sm',
  id, className = '', style, circular = false,
}: BadgeProps) => {

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
      shade: isDarkTheme ? background.lighten(3).toString() : background.darken(0.6).toString(),
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
  }, [activeColor, variant]);
 
  const textColor = useMemo(
    () => {
      if (variant === 'solid') return Color(activeColor).isDark() ? '#fff' : '#333';
      else if (variant === 'minimal' && color === 'contrast') return Color(backgroundColor).isDark() ? '#fff' : '#333';
      return activeColor;
    },
    [activeColor, variant],
  );

  const computedClassName = clsx([
    className,
    badgeSizeDefinitions[size],
    'dsr-inline-block dsr-relative dsr-overflow-hidden dsr-text-center dsr-border dsr-border-transparent dsr-transition',
    circular ? 'dsr-rounded-full' : 'dsr-rounded',
  ]);

  const computedStyle = {
    background: backgroundColor,
    color: textColor,
    borderColor: variant === 'outline' ? activeColor : 'none',
    ...style,
  };

  return (
      <span
          id={id}
          className={computedClassName}
          style={computedStyle}
      >
          {children}
      </span>
  );
};

export default Badge;