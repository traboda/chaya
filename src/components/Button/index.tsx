'use client';
import React from 'react';
import clsx from 'clsx';

import { cva } from '../../utils/cva';
import { LinkWrapper } from '../../utils/misc';
import Icon from '../Icon';
import Spinner from '../Spinner';
import {
  colorVariantMapper,
  BORDER_COLOR_MAP, TEXT_COLOR_MAP, TRANSPARENT_BG_TEXT_COLOR_MAP, SOLID_BG_COLOR_MAP, MINIMAL_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP,
} from '../../utils/classMaps/colors';

import buttonStyle from './button.module.scss';
import { ButtonProps } from './type';
import Ripple from './Ripple';

const iconSizes = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 22,
};

const buttonStyling = cva({
  base: [
    'button dsr-relative dsr-overflow-hidden dsr-text-center dsr-border-transparent dsr-transition',
    'dsr-outline-0 dsr-inline-flex dsr-items-center dsr-justify-center',
    'dsr-border dsr-shadow hover:dsr-shadow-none dsr-gap-2',
    'focus:dsr-ring-1 focus:dsr-ring-offset-2 focus:dsr-ring-offset-transparent',
  ],
  variants: {
    size: {
      xs: 'dsr-gap-1 dsr-px-1.5 dsr-py-0.5 dsr-rounded dsr-text-xs',
      sm: 'dsr-px-2.5 dsr-py-1 dsr-rounded-md dsr-text-sm',
      md: 'dsr-px-3.5 dsr-py-2 dsr-rounded-lg dsr-text-base',
      lg: 'dsr-px-5 dsr-py-3 dsr-rounded-lg dsr-text-lg',
      xl: 'dsr-px-6 dsr-py-4 dsr-rounded-lg dsr-text-xl',
    },
    color: {
      primary: 'dsr-ring-primary/50',
      secondary: 'dsr-ring-secondary/50',
      success: 'dsr-ring-green-600/50',
      danger: 'dsr-ring-red-500/50',
      warning: 'dsr-ring-yellow-500/50',
      contrast: 'dsr-ring-contrast/50',
      white: 'dsr-ring-white/50',
      black: 'dsr-ring-black/50',
      shade: 'dsr-ring-current',
    },
    variant: {
      solid: '',
      outline: 'dsr-border-2',
      minimal: '',
      link: [
        'hover:dsr-underline',
        'dsr-p-0 dsr-shadow-none dsr-rounded-none dsr-ring-transparent focus:dsr-ring-0',
      ],
    },
  },
  compoundVariants: [
    ...colorVariantMapper([SOLID_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP], 'solid'),
    ...colorVariantMapper([MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP], 'minimal'),
    ...colorVariantMapper([TRANSPARENT_BG_TEXT_COLOR_MAP, BORDER_COLOR_MAP], 'outline'),
    ...colorVariantMapper([TRANSPARENT_BG_TEXT_COLOR_MAP], 'link'),
  ],
});

const Button = ({
  variant = 'solid', color = 'primary', size = 'md',
  children, link, onClick = () => {},
  id, className = '', style, label, disableRipple = false, tabIndex, autoFocus,
  target, type, rel, isDisabled = false, leftIcon, rightIcon, isLoading = false,
}: ButtonProps) => {

  const buttonContent = (
    <>
      {(!disableRipple && !(isDisabled || isLoading)) && <Ripple />}
      {leftIcon && <Icon icon={leftIcon} size={iconSizes[size]} />}
      {children}
      {rightIcon && <Icon icon={rightIcon} size={iconSizes[size]} />}
    </>
  );

  const computedClassName = clsx([
    buttonStyling({ variant, size, color }),
    buttonStyle.button,
    (isDisabled || isLoading) && 'dsr-opacity-70 dsr-cursor-not-allowed',
    className,
  ]);

  const buttonRenderer = () => (
    <button
      id={id}
      aria-label={label}
      aria-disabled={isDisabled || isLoading}
      type={type}
      tabIndex={tabIndex}
      autoFocus={autoFocus}
      onClick={e => {
        e.stopPropagation();
        onClick(e);
      }}
      disabled={isDisabled || isLoading}
      className={computedClassName}
      style={style}
    >
      {isLoading ? <Spinner size={size} /> : buttonContent}
    </button>
  );

  return link ? LinkWrapper(link, buttonContent, {
    target, rel, id, label, size,
    className: computedClassName,
    style,
    isDisabled: isDisabled || isLoading,
    isLoading,
    tabIndex,
    autoFocus,
  }) : buttonRenderer();
};

export { ButtonProps as ButtonProps };
export default Button;