'use client';

import React from 'react';
import clsx from 'clsx';

import useColors, { ChayaColorType } from '../hooks/useColors';

import Icon, { IconInputType } from './Icon';

export type BaseBadgeProps = {
  variant?: 'solid' | 'outline' | 'minimal',
  color?: ChayaColorType,
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

  const { activeColor, backgroundColor, textColor } = useColors(variant, color);

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