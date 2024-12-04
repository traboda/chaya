import React from 'react';

import { IconInputType } from '../Icon';
import { BaseBadgeProps } from '../Badge';
import { ChayaColorType } from '../../utils/classMaps/colors';

export type HorizontalNavigatorItemType = {
  key: string,
  label: string,
  link?: string,
  onClick?: () => void,
  icon?: IconInputType,
  labelClassName?: string,
  className?: string,
  isDisabled?: boolean,
  isHidden?: boolean,
  badge?: React.ReactNode,
  badgeProps?: BaseBadgeProps,
};

export type HorizontalNavigatorVariantType = 'pill' | 'line' | 'boxed' | 'minimal';

export type HorizontalNavigatorItemProps = {
  item: HorizontalNavigatorItemType,
  navigatorID: string,
  variant?: HorizontalNavigatorVariantType,
  color?: ChayaColorType,
  activeItem?: string | null,
  badgeProps?: BaseBadgeProps,
  className?: string,
  onClickItem?: (key: string, item: HorizontalNavigatorItemType) => void,
};