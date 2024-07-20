import { KeyboardEvent } from 'react';

export type RadioColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type RadioProps<Type> = {
  label: string,
  value: Type,
  tabIndex?: number,
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void,
  onChange?: (value: Type) => void,
  color?: RadioColor,
  size?: RadioSize,
  isDisabled?: boolean,
  isSelected?: boolean,
  className?: string
};
