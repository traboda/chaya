import React from 'react';
import clsx from 'clsx';
import { cva } from 'cva';

import { ChayaColorType } from '../hooks/useColors';
import {
  colorVariantMapper,
  BORDER_COLOR_MAP, MINIMAL_BG_COLOR_MAP, SOLID_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP, TEXT_COLOR_MAP, TRANSPARENT_BG_TEXT_COLOR_MAP,
} from '../utils/classMaps/colors';

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

const iconSizes = {
  xs: [12, 'dsr-mr-1', 'dsr-ml-1'],
  sm: [14, 'dsr-mr-1', 'dsr-ml-1'],
  md: [16, 'dsr-mr-2', 'dsr-ml-2'],
  lg: [18, 'dsr-mr-2', 'dsr-ml-2'],
  xl: [20, 'dsr-mr-2', 'dsr-ml-2'],
} as const;

const badgeStyling = cva({
  base: [
    'badge dsr-relative dsr-transition dsr-overflow-hidden dsr-border',
    'dsr-inline-flex  dsr-items-center dsr-justify-center dsr-text-center',
  ],
  variants: {
    size: {
      xs: 'dsr-px-1.5 dsr-py-0.5 dsr-text-xs',
      sm: 'dsr-px-2.5 dsr-py-1 dsr-text-sm',
      md: 'dsr-px-3.5 dsr-py-2 dsr-text-base',
      lg: 'dsr-px-5 dsr-py-3 dsr-text-lg',
      xl: 'dsr-px-6 dsr-py-4 dsr-text-xl',
    },
    variant: {
      solid: '',
      outline: 'dsr-border-2',
      minimal: 'dsr-border-0',
      link: '', // @todo added for using with colorVariantMapper
    },
    color: BORDER_COLOR_MAP,
  },
  compoundVariants: [
    ...colorVariantMapper([SOLID_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP], 'solid'),
    ...colorVariantMapper([MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP], 'minimal'),
    ...colorVariantMapper([TRANSPARENT_BG_TEXT_COLOR_MAP, BORDER_COLOR_MAP], 'outline'),
  ],
});


const Badge = ({
  children, variant = 'minimal', color = 'primary', size = 'sm',
  id, className = '', style, circular = false, leftIcon, rightIcon,
}: BadgeProps) => {

  const computedClassName = clsx([
    className,
    badgeStyling({ variant, size, color }),
    circular ? 'dsr-rounded-full' : 'dsr-rounded',
  ]);

  return (
    <span
      id={id}
      className={computedClassName}
      style={style}
    >
      {leftIcon && <Icon className={iconSizes[size][1]} icon={leftIcon} size={iconSizes[size][0]} />}
      {children}
      {rightIcon && <Icon className={iconSizes[size][2]} icon={rightIcon} size={iconSizes[size][0]} />}
    </span>
  );
};

export default Badge;