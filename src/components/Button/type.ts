import { CSSProperties, ReactNode, MouseEvent } from 'react';

import { LinkRelType, LinkTargetType } from '../../utils/misc';

export type ButtonVariant = 'solid' | 'outline' | 'minimal' | 'link';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast' | 'shade';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonProps = {
  variant?: ButtonVariant,
  color?: ButtonColor,
  size?: ButtonSize,
  children?: ReactNode,
  id?: string,
  className?: string,
  style?: CSSProperties,
  disableRipple?: boolean

  link?: string
  target?: LinkTargetType,
  rel?: LinkRelType,

  disabled?: boolean,
  onClick?: (e: MouseEvent) => void
  type?: ('button' | 'submit' | 'reset')
  onBlur?: () => void
  onFocus?: () => void
  label?: string
  title?: string
};