import React, { useMemo, useState } from 'react';
import Color from 'color';
import clsx from 'clsx';

import { LinkWrapper } from '../../utils/misc';
import Icon from '../Icon';
import Spinner from '../Spinner';
import useColors from '../../hooks/useColors';

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

const ringColor = {
  primary: 'dsr-ring-primary/50',
  secondary: 'dsr-ring-secondary/50',
  success: 'dsr-ring-green-600/50',
  danger: 'dsr-ring-red-500/50',
  warning: 'dsr-ring-yellow-500/50',
  contrast: 'dsr-ring-contrast/50',
  shade: 'dsr-ring-current',
};

const Button = ({
  variant = 'solid', color = 'primary', size = 'md',
  children, link, onClick = () => {},
  id, className = '', style, label, disableRipple = false,
  target, type, rel, isDisabled = false, leftIcon, rightIcon, isLoading = false,
}: ButtonProps) => {
  const [hover, setHover] = useState(false);

  const { activeColor, backgroundColor, textColor } = useColors(variant, color, hover);

  const hoverColor = useMemo(() => {
    switch (variant) {
      case 'solid': return Color(activeColor).darken(0.2).toString();
      case 'outline': return activeColor;
      case 'minimal': return Color(backgroundColor).darken(0.1).toString();
    }
  }, [activeColor]);

  const buttonContent = (
    <>
      {(!disableRipple && !(isDisabled || isLoading)) && <Ripple />}
      {leftIcon && <Icon icon={leftIcon} size={iconSizes[size]} />}
      {children}
      {rightIcon && <Icon icon={rightIcon} size={iconSizes[size]} />}
    </>
  );

  const computedClassName = clsx([
    sizeDefinitions[size],
    ringColor[color],
    buttonStyle.button,
    variant === 'link' ? 'hover:dsr-underline' : '',
    'button dsr-relative dsr-overflow-hidden dsr-text-center dsr-border dsr-border-transparent',
    'dsr-outline-0 dsr-transition dsr-inline-flex dsr-items-center dsr-justify-center',
    'focus:dsr-ring-1 focus:dsr-ring-offset-2 focus:dsr-ring-offset-transparent',
    size === 'xs' ? 'dsr-gap-1' : 'dsr-gap-2',
    (isDisabled || isLoading) && 'dsr-opacity-70 dsr-cursor-not-allowed',
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
      aria-disabled={isDisabled || isLoading}
      type={type}
      onClick={e => {
        e.stopPropagation();
        onClick(e);
      }}
      disabled={isDisabled || isLoading}
      className={computedClassName}
      style={computedStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {isLoading ? <Spinner size={size} /> : buttonContent}
    </button>
  );

  return link ? LinkWrapper(link, buttonContent, {
    target, rel, id, label, size,
    className: computedClassName,
    style: computedStyle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    isDisabled: isDisabled || isLoading,
    isLoading,
  }) : buttonRenderer();
};

export { ButtonProps as ButtonProps };
export default Button;