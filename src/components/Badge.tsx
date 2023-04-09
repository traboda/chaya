import React, { useContext, useMemo } from 'react';
import Color from 'color';
import tailwindColors from 'tailwindcss/colors';
import clsx from 'clsx';

import DSRContext from '../contexts/DSRContext';
import { RGBAtoRGB } from '../utils/color';

import Icon, { IconInputType } from './Icon';

export type BaseBadgeProps = {
  variant?: 'solid' | 'outline' | 'minimal',
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast' | 'shade',
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  style?: React.CSSProperties,
  className?: string,
  circular?: boolean,
  id?: string,
  leftIcon?: IconInputType
  rightIcon?: IconInputType
};

export type BadgeProps = BaseBadgeProps & {
  children: React.ReactNode,
};

const sizeDefinitions = {
  xs: 'dsr-px-1.5 dsr-py-0.5 dsr-text-xs',
  sm: 'dsr-px-2.5 dsr-py-1 dsr-text-sm',
  md: 'dsr-px-3.5 dsr-py-2 dsr-text-base',
  lg: 'dsr-px-5 dsr-py-3 dsr-text-lg',
  xl: 'dsr-px-6 dsr-py-4 dsr-text-xl',
} as const;

const iconSizes = {
  xs: [12, 'dsr-mr-1', 'dsr-ml-1'],
  sm: [14, 'dsr-mr-1', 'dsr-ml-1'],
  md: [16, 'dsr-mr-2', 'dsr-ml-2'],
  lg: [18, 'dsr-mr-2', 'dsr-ml-2'],
  xl: [20, 'dsr-mr-2', 'dsr-ml-2'],
} as const;

const Badge = ({
  children, variant = 'minimal', color = 'primary', size = 'sm',
  id, className = '', style, circular = false, leftIcon, rightIcon,
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
  }, [activeColor, variant, isDarkTheme]);
 
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
    sizeDefinitions[size],
    'badge dsr-inline-flex dsr-relative dsr-overflow-hidden dsr-text-center dsr-border dsr-border-transparent',
    'dsr-transition dsr-items-center dsr-justify-center',
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
      {leftIcon && <Icon icon={leftIcon} className={iconSizes[size][1]} size={iconSizes[size][0]} />}
      {children}
      {rightIcon && <Icon icon={rightIcon} className={iconSizes[size][2]} size={iconSizes[size][0]} />}
    </span>
  );
};

export default Badge;