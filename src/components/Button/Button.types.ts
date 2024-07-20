import React, { CSSProperties, ReactNode, MouseEvent } from 'react';

import { LinkRelType, LinkTargetType } from '../../utils/misc';
import { IconInputType } from '../Icon';
import { ChayaColorType } from '../../utils/classMaps/colors';

export type ButtonSizesType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonVariantsType = 'solid' | 'outline' | 'minimal' | 'link';

interface ButtonPropsInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantsType,
  color?: ChayaColorType,
  size?: ButtonSizesType,
  children?: ReactNode,
  id?: string,
  className?: string,
  style?: CSSProperties,
  disableRipple?: boolean,
  blurOnClick?: boolean,

  link?: string
  target?: LinkTargetType,
  rel?: LinkRelType,
  tabIndex?: number,
  autoFocus?: boolean,

  isDisabled?: boolean,
  isLoading?: boolean,
  onClick?: (e: MouseEvent) => void
  type?: ('button' | 'submit' | 'reset')
  onBlur?: () => void
  onFocus?: () => void
  label?: string
  title?: string
  loadingText?: string
  leftIcon?: IconInputType
  rightIcon?: IconInputType
}

export type ButtonProps = ButtonPropsInterface;