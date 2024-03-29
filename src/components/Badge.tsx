import React from 'react';
import { cva } from 'cva';

import {
  colorVariantMapper, ChayaColorType,
  BORDER_COLOR_MAP, MINIMAL_BG_COLOR_MAP, SOLID_BG_COLOR_MAP,
  SOLID_TEXT_COLOR_MAP, TEXT_COLOR_MAP, TRANSPARENT_BG_TEXT_COLOR_MAP,
} from '../utils/classMaps/colors';
import mcs from '../utils/merge';

import Icon, { IconInputType } from './Icon';

export type BadgeVariantsType = 'solid' | 'outline' | 'minimal';
export type BadgeSizesType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type BaseBadgeProps = {
  variant?: BadgeVariantsType,
  color?: ChayaColorType,
  size?: BadgeSizesType,
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
  xs: [12, 'mr-1', 'ml-1'],
  sm: [14, 'mr-1', 'ml-1'],
  md: [16, 'mr-2', 'ml-2'],
  lg: [18, 'mr-2', 'ml-2'],
  xl: [20, 'mr-2', 'ml-2'],
} as const;

const badgeStyling = cva({
  base: [
    'badge relative transition overflow-hidden border',
    'inline-flex  items-center justify-center text-center',
  ],
  variants: {
    size: {
      xs: 'px-1.5 py-0.5 text-xs',
      sm: 'px-2.5 py-1 text-sm',
      md: 'px-3.5 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
      xl: 'px-6 py-4 text-xl',
    },
    variant: {
      solid: '',
      outline: 'border-2',
      minimal: 'border-0',
      link: '', // @todo added for using with colorVariantMapper
    },
    color: BORDER_COLOR_MAP,
  },
  compoundVariants: [
    ...colorVariantMapper<BadgeVariantsType>([SOLID_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP], 'solid'),
    ...colorVariantMapper<BadgeVariantsType>([MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP], 'minimal'),
    ...colorVariantMapper<BadgeVariantsType>([TRANSPARENT_BG_TEXT_COLOR_MAP, BORDER_COLOR_MAP], 'outline'),
  ],
});


const Badge = ({
  children, variant = 'minimal', color = 'primary', size = 'sm',
  id, className = '', style, circular = false, leftIcon, rightIcon,
}: BadgeProps) => {

  const computedClassName = mcs([
    badgeStyling({ variant, size, color }),
    circular ? 'rounded-full' : 'rounded',
    className,
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