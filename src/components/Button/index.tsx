import React, { useContext, useMemo, useState } from 'react';
import Color from 'color';
import tailwindColors from 'tailwindcss/colors';
import clsx from 'clsx';

import { LinkWrapper } from '../../utils/misc';
import DSRContext from '../../contexts/DSRContext';
import { RGBAtoRGB } from '../../utils/color';
import Icon from '../Icon';

import buttonStyle from './button.module.scss';
import { ButtonProps } from './type';
import Ripple from './Ripple';

const sizeDefinitions = {
  xs: 'dsr-px-1.5 dsr-py-0.5 dsr-text-xs dsr-rounded',
  sm: 'dsr-px-2.5 dsr-py-1 dsr-text-sm dsr-rounded-md',
  md: 'dsr-px-3.5 dsr-py-2 dsr-text-base dsr-rounded-lg',
  lg: 'dsr-px-5 dsr-py-3 dsr-text-lg dsr-rounded-lg',
  xl: 'dsr-px-6 dsr-py-4 dsr-text-xl dsr-rounded-lg',
};

const iconSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 22,
};

const Button = ({
  variant = 'solid', color = 'primary', size = 'md',
  children, link, onClick = () => {},
  id, className = '', style, label, disableRipple = false,
  target, type, rel, isDisabled = false, leftIcon, rightIcon,
}: ButtonProps) => {
  const [hover, setHover] = useState(false);
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
      shade: isDarkTheme ? background.lighten(3).toString() : background.darken(0.5).toString(),
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

  const buttonContent = (
      <>
          {(!disableRipple && !isDisabled) && <Ripple />}
          {leftIcon && <Icon icon={leftIcon} size={iconSizes[size]} />}
          {children}
          {rightIcon && <Icon icon={rightIcon} size={iconSizes[size]} />}
      </>
  );

  const computedClassName = clsx([
    sizeDefinitions[size],
    buttonStyle.button,
    variant === 'link' ? 'hover:dsr-underline' : '',
    'button dsr-relative dsr-overflow-hidden dsr-text-center dsr-border dsr-border-transparent',
    'focus-visible:dsr-outline dsr-outline-2 dsr-transition dsr-inline-flex dsr-items-center dsr-justify-center',
    size === 'xs' ? 'dsr-gap-1' : 'dsr-gap-2',
    isDisabled && 'dsr-opacity-70 dsr-cursor-not-allowed',
    className,
  ]);

  const computedStyle = {
    background: hover ? hoverColor : backgroundColor,
    color: textColor,
    borderColor: variant === 'outline' ? activeColor : 'none',
    ...style,
  };

  const buttonRenderer = () => (
      <button
          id={id}
          aria-label={label}
          aria-disabled={isDisabled}
          type={type}
          onClick={e => {
            e.stopPropagation();
            onClick(e);
          }}
          disabled={isDisabled}
          className={computedClassName}
          style={computedStyle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
      >
          {buttonContent}
      </button>
  );

  return link ? LinkWrapper(link, buttonContent, {
    target, rel, id, label,
    className: computedClassName,
    style: computedStyle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    isDisabled,
  }) : buttonRenderer();
};

export { ButtonProps as ButtonProps };
export default Button;