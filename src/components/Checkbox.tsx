'use client';
import React, { ChangeEvent, KeyboardEvent, MouseEvent, forwardRef } from 'react';

import clsx from 'clsx';

import mcs from '../utils/merge';

export type CheckboxColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type CheckboxProps<Type> = {
  label: string;
  value: Type;
  isChecked?: boolean;
  tabIndex?: number;
  onKeyDown?: (event: KeyboardEvent<HTMLLabelElement>) => void;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: MouseEvent<HTMLLabelElement>) => void;
  color?: CheckboxColor;
  size?: CheckboxSize;
  isDisabled?: boolean;
  spacing?: string;
  className?: string;
  isHalf?: boolean;
};

export const sizes = {
  xs: { button: 'h-2 w-2', label: 'text-xs' },
  sm: { button: 'h-3 w-3', label: 'text-sm' },
  md: { button: 'h-4 w-4', label: 'text-md' },
  lg: { button: 'h-5 w-5', label: 'text-lg' },
  xl: { button: 'h-6 w-6', label: 'text-xl' },
};

export const colors = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-green-500',
  danger: 'bg-red-500',
  warning: 'bg-yellow-400',
  default: 'bg-gray-500/70',
};

export const focusColors = {
  primary: 'ring-primary',
  secondary: 'ring-secondary',
  success: 'ring-green-500',
  danger: 'ring-red-500',
  warning: 'ring-yellow-400',
  default: 'ring-gray-500/70',
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps<string | number>>(
  (
    {
      value,
      label,
      onChange = () => {},
      isChecked = false,
      color = 'primary',
      size = 'md',
      isDisabled = false,
      className,
      onClick = () => {},
      isHalf = false,
      tabIndex,
      onKeyDown,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    return (
      <label
        onKeyDown={onKeyDown}
        tabIndex={-1}
        onClick={onClick}
        className={mcs([
          'checkbox-container relative inline-flex items-center text-left',
          isDisabled ? 'cursor-not-allowed opacity-80' : 'cursor-pointer',
          className,
        ])}
      >
        <input
          ref={ref}
          tabIndex={tabIndex}
          aria-disabled={isDisabled}
          onChange={onChange}
          type="checkbox"
          name={value.toString()}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          className={clsx([
            'checkbox h-px w-px whitespace-nowrap border-0 border-none p-0',
            'absolute -m-1 overflow-hidden',
          ])}
          style={{ clip: 'rect(0px, 0px, 0px, 0px)' }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <span
          className={clsx([
            'inline-flex flex-shrink-0 items-center justify-center',
            'rounded-sm border-2 border-neutral-300/80 dark:border-neutral-500/70',
            sizes[size]?.button,
            isChecked ? colors[color] : 'bg-white dark:bg-white/10',
            isFocused ? `!ring-2 ${focusColors[color]}` : '',
            !isChecked && !isFocused && !isDisabled ? '' : 'border-2 border-opacity-100',
          ])}
        >
          <span
            className={clsx([
              'flex h-full w-full items-center justify-center p-0.5',
              'origin-bottom-left text-white transition-opacity duration-200 ease-in-out',
              isChecked ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
            ])}
          >
            <svg
              viewBox="0 0 12 10"
              stroke="currentColor"
              fill="none"
              strokeWidth={2}
              strokeDasharray={16}
              strokeLinecap="round"
            >
              {isHalf ? (
                <line x1="2" y1="5" x2="10" y2="5"></line>
              ) : (
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              )}
            </svg>
          </span>
        </span>
        {label && <span className={clsx(['ml-2', sizes[size]?.label])}>{label}</span>}
      </label>
    );
  }
);

export default Checkbox;
