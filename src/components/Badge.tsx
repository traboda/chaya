import React, { MouseEvent, useContext, useMemo } from 'react';
import Color from 'color';
import tailwindColors from 'tailwindcss/colors';
import DSRContext from '../contexts/DSRContext';
import clsx from 'clsx';

export type BadgeProps = {
  variant?: ('solid' | 'outline' | 'minimal'),
  color?: ('primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast' | 'shade'),
  size?: ('xs' | 'sm' | 'md' | 'lg' | 'xl')
  id?: string,
  className?: string,
  style?: React.CSSProperties,
  onClick?: (e: MouseEvent) => void,
  children: React.ReactNode,
  circular?: boolean,
};


const RGBAtoRGB = (color: Color, by: number) => {
  const a = color.alpha();
  return [
    Math.round(((1 - a) * by) + (a * color.red())),
    Math.round(((1 - a) * by) + (a * color.green())),
    Math.round(((1 - a) * by) + (a * color.blue())),
  ];
};

const paddings = {
  xs: 'dsr-px-1.5 dsr-py-0',
  sm: 'dsr-px-2.5 dsr-py-1',
  md: 'dsr-px-3.5 dsr-py-2',
  lg: 'dsr-px-4 dsr-py-3',
  xl: 'dsr-px-5 dsr-py-4',
};

const Badge = ({
  children, variant = 'minimal', color = 'primary', size = 'sm',
  id, className = '', style, onClick = () => {}, circular = true,
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
    paddings[size],
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
          onClick={e => {
            e.stopPropagation();
            onClick(e);
          }}
          className={computedClassName}
          style={computedStyle}
      >
          {children}
      </span>
  );
};

export default Badge;