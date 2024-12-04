'use client';
import React from 'react';

import { cva } from '../../utils/cva';
import { LinkWrapper } from '../../utils/misc';
import Icon from '../Icon';
import Spinner from '../Spinner';
import {
  colorVariantMapper,
  BORDER_COLOR_MAP, TEXT_COLOR_MAP, TRANSPARENT_BG_TEXT_COLOR_MAP,
  SOLID_BG_COLOR_MAP, MINIMAL_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP, EMPTY_COLOR_MAP,
} from '../../utils/classMaps/colors';
import mcs from '../../utils/merge';

import buttonStyle from './Button.module.scss';
import { ButtonProps, ButtonVariantsType } from './Button.types';
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
    'button relative overflow-hidden text-center border-transparent transition',
    'outline-0 inline-flex items-center justify-center',
    'border shadow hover:shadow-none gap-2',
    'focus:ring-1 focus:ring-offset-2 focus:ring-offset-transparent',
  ],
  variants: {
    size: {
      xs: 'gap-1 px-1.5 py-0.5 rounded text-xs',
      sm: 'px-2.5 py-1 rounded-md text-sm',
      md: 'px-3.5 py-2 rounded-lg text-base',
      lg: 'px-5 py-3 rounded-lg text-lg',
      xl: 'px-6 py-4 rounded-lg text-xl',
    },
    color: {
      primary: 'ring-primary/50',
      secondary: 'ring-secondary/50',
      success: 'ring-green-600/50',
      danger: 'ring-red-500/50',
      warning: 'ring-yellow-500/50',
      contrast: 'ring-contrast/50',
      white: 'ring-white/50',
      black: 'ring-black/50',
      shade: 'ring-current',
    },
    variant: {
      solid: '',
      outline: 'border',
      minimal: '',
      link: [
        'hover:underline',
        'p-0 shadow-none rounded-none ring-transparent focus:ring-0',
      ],
    },
  },
  compoundVariants: [
    ...colorVariantMapper<ButtonVariantsType>([SOLID_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP], 'solid'),
    ...colorVariantMapper<ButtonVariantsType>([MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP], 'minimal'),
    ...colorVariantMapper<ButtonVariantsType>([TRANSPARENT_BG_TEXT_COLOR_MAP, BORDER_COLOR_MAP], 'outline'),
    ...colorVariantMapper<ButtonVariantsType>([TRANSPARENT_BG_TEXT_COLOR_MAP], 'link'),
  ],
});

const SpinnerWrapper = cva({
  base: [],
  variants: {
    variant: { solid: '', minimal: '', outline: '', link: '' },
    color: EMPTY_COLOR_MAP,
  },
  compoundVariants: [
    ...colorVariantMapper<ButtonVariantsType>([SOLID_BG_COLOR_MAP], 'solid'),
    ...colorVariantMapper<ButtonVariantsType>([MINIMAL_BG_COLOR_MAP], 'minimal'),
  ],
});

const Button = ({
  variant = 'solid', color = 'primary', size = 'md',
  children, link, onClick = () => {}, loadingText,
  id, className = '', style, label, disableRipple = false, tabIndex, autoFocus, blurOnClick = true,
  target, type, rel, isDisabled = false, leftIcon, rightIcon, isLoading = false, ...props
}: ButtonProps) => {

  const buttonContent = (
    <>
      {(!disableRipple && !(isDisabled || isLoading)) && <Ripple />}
      {leftIcon && <Icon icon={leftIcon} size={iconSizes[size]} />}
      {children}
      {rightIcon && <Icon icon={rightIcon} size={iconSizes[size]} />}
    </>
  );

  const computedClassName = mcs([
    buttonStyling({ variant, size, color }),
    buttonStyle.button,
    isDisabled && 'opacity-70 cursor-not-allowed',
    isLoading && 'relative',
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
        if (blurOnClick) {
          e.currentTarget.blur();
        }
        onClick(e);
      }}
      disabled={isDisabled || isLoading}
      className={computedClassName}
      style={style}
      {...props}
    >
      {isLoading ? (
        <div
          className={mcs([
            'w-full h-full z-5 absolute flex items-center gap-2 justify-center',
            SpinnerWrapper({ color, variant }),
          ])}
        >
          <Spinner size={size} />
          {loadingText && loadingText?.length > 0 ? `${loadingText}...` : null}
        </div>
      ) : null}
      {isLoading && loadingText?.length ? `......${loadingText}...` : buttonContent}
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

export default Button;