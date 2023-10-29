'use client';

import React, { forwardRef, KeyboardEvent } from 'react';
import clsx from 'clsx';

import styled from './radio.module.scss';

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

const colors = {
  'primary': 'dsr-bg-primary',
  'secondary': 'dsr-bg-secondary',
  'success': 'dsr-bg-green-500',
  'danger': 'dsr-bg-red-500',
  'warning': 'dsr-bg-yellow-400',
  'default': 'dsr-bg-gray-500/70',
};

const sizes = {
  'xs': { button: 'dsr-h-2 dsr-w-2', label: 'dsr-text-xs' },
  'sm': { button: 'dsr-h-3 dsr-w-3', label: 'dsr-text-sm' },
  'md': { button: 'dsr-h-4 dsr-w-4', label: 'dsr-text-md' },
  'lg': { button: 'dsr-h-5 dsr-w-5', label: 'dsr-text-lg' },
  'xl': { button: 'dsr-h-6 dsr-w-6', label: 'dsr-text-xl' },
};

const Radio = forwardRef<HTMLInputElement, RadioProps<string | number>>(({
  value, label, onChange = () => {}, isSelected = false, color = 'primary', size = 'md', isDisabled = false,
  className, tabIndex, onKeyDown,
}, ref) => {

  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div
      className={clsx([
        'radio dsr-inline-flex dsr-items-center dsr-cursor-pointer dsr-relative',
        className,
        isDisabled && 'dsr-opacity-70',
      ])}
      onClick={() => !isDisabled && onChange(value)}
    >
      <input
        ref={ref}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        aria-disabled={isDisabled}
        type="radio"
        name={label}
        value={value}
        checked={isSelected}
        disabled={isDisabled}
        className={clsx([
          'radio-input dsr-border-0 dsr-border-none dsr-h-px dsr-w-px dsr-p-0 dsr-whitespace-nowrap',
          'dsr-overflow-hidden dsr-absolute -dsr-m-1',
        ])}
        style={{ clip: 'rect(0px, 0px, 0px, 0px)' }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <span
        className={clsx([
          'dsr-inline-flex dsr-items-center dsr-justify-center dsr-flex-shrink-0',
          'dsr-border-none dsr-rounded-full dsr-text-white dsr-transition',
          sizes[size]?.button,
          isSelected ? styled.radioButton : '',
          isSelected ? colors[color] : 'dark:dsr-bg-white/20 dsr-bg-gray-500/20',
          isFocused && 'dsr-ring-2 dsr-ring-white dsr-ring-offset-1 dsr-ring-offset-gray-900',
        ])}
      />
      <span className={clsx(['dsr-ml-2', sizes[size]?.label])}>{label}</span>
    </div>
  );
});

export default Radio;