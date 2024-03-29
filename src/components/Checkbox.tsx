'use client';
import React, { ChangeEvent, MouseEvent, KeyboardEvent, forwardRef } from 'react';
import clsx from 'clsx';

import mcs from '../utils/merge';

export type CheckboxColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type CheckboxProps<Type> = {
  label: string,
  value: Type,
  isChecked?: boolean,
  tabIndex?: number,
  onKeyDown?: (event: KeyboardEvent<HTMLLabelElement>) => void,
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void,
  onClick?: (event: MouseEvent<HTMLLabelElement>) => void,
  color?: CheckboxColor,
  size?: CheckboxSize,
  isDisabled?: boolean,
  spacing?: string,
  className?: string,
  isHalf?: boolean
};

export const sizes = {
  'xs': { button: 'h-2 w-2', label: 'text-xs' },
  'sm': { button: 'h-3 w-3', label: 'text-sm' },
  'md': { button: 'h-4 w-4', label: 'text-md' },
  'lg': { button: 'h-5 w-5', label: 'text-lg' },
  'xl': { button: 'h-6 w-6', label: 'text-xl' },
};

export const colors = {
  'primary': 'bg-primary',
  'secondary': 'bg-secondary',
  'success': 'bg-green-500',
  'danger': 'bg-red-500',
  'warning': 'bg-yellow-400',
  'default': 'bg-gray-500/70',
};

export const focusColors = {
  'primary': 'ring-primary',
  'secondary': 'ring-secondary',
  'success': 'ring-green-500',
  'danger': 'ring-red-500',
  'warning': 'ring-yellow-400',
  'default': 'ring-gray-500/70',
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps<string | number>>(
  ({
    value, label, onChange = () => {}, isChecked = false, color = 'primary', size = 'md', isDisabled = false,
    className, onClick = () => {}, isHalf = false, tabIndex, onKeyDown,
  }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    return (
      <label
        onKeyDown={onKeyDown}
        tabIndex={-1}
        onClick={onClick}
        className={mcs([
          'checkbox-container inline-flex items-center text-left relative',
          isDisabled ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer',
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
            'checkbox border-0 border-none h-px w-px p-0 whitespace-nowrap',
            'overflow-hidden absolute -m-1',
          ])}
          style={{ clip: 'rect(0px, 0px, 0px, 0px)' }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <span
          className={clsx([
            'inline-flex items-center justify-center flex-shrink-0',
            'rounded-sm border-2 dark:border-neutral-500/70 border-neutral-500/20', sizes[size]?.button,
            isChecked ? colors[color] : 'dark:bg-background-lighten-1',
            isFocused ? `!ring-2 ${focusColors[color]}` : '',
            (!isChecked && !isFocused && !isDisabled) ? '' : 'border-2 border-opacity-100',
          ])}
        >
          <span
            className={clsx([
              'flex justify-center items-center h-full w-full p-0.5',
              'duration-200 origin-bottom-left text-white ease-in-out transition-opacity',
              isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-75',
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
              {isHalf ? <line x1="2" y1="5" x2="10" y2="5"></line> : <polyline points="1.5 6 4.5 9 10.5 1"></polyline>}
            </svg>
          </span>
        </span>
        {label && <span className={clsx(['ml-2', sizes[size]?.label])}>{label}</span>}
      </label>
    );
  });

export default Checkbox;