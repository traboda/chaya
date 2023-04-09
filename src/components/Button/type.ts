import { CSSProperties, ReactNode, MouseEvent } from 'react';

import { LinkRelType, LinkTargetType } from '../../utils/misc';
import { IconInputType } from '../Icon';
import { DSRColorType, DSRVariantType } from '../../hooks/useColors';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonProps = {
  variant?: DSRVariantType,
  color?: DSRColorType,
  size?: ButtonSize,
  children?: ReactNode,
  id?: string,
  className?: string,
  style?: CSSProperties,
  disableRipple?: boolean

  link?: string
  target?: LinkTargetType,
  rel?: LinkRelType,

  isDisabled?: boolean,
  isLoading?: boolean,
  onClick?: (e: MouseEvent) => void
  type?: ('button' | 'submit' | 'reset')
  onBlur?: () => void
  onFocus?: () => void
  label?: string
  title?: string

  leftIcon?: IconInputType
  rightIcon?: IconInputType
};