'use client';
import React, { forwardRef } from 'react';
import clsx from 'clsx';

import mcs from '../../utils/merge';

import styles from './radio.module.scss';
import { RadioProps } from './Radio.types';

const colors = {
  'primary': 'bg-primary',
  'secondary': 'bg-secondary',
  'success': 'bg-green-500',
  'danger': 'bg-red-500',
  'warning': 'bg-yellow-400',
  'default': 'bg-gray-500/70',
};

const sizes = {
  'xs': { button: 'h-2 w-2', label: 'text-xs' },
  'sm': { button: 'h-3 w-3', label: 'text-sm' },
  'md': { button: 'h-4 w-4', label: 'text-md' },
  'lg': { button: 'h-5 w-5', label: 'text-lg' },
  'xl': { button: 'h-6 w-6', label: 'text-xl' },
};

const Radio = forwardRef<HTMLInputElement, RadioProps<string | number>>(({
  value, label, onChange = () => {}, isSelected = false, color = 'primary', size = 'md', isDisabled = false,
  className, tabIndex, onKeyDown,
}, ref) => {

  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div
      className={mcs([
        'radio inline-flex items-center relative',
        isDisabled ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer',
        className,
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
          'radio-input border-0 border-none h-px w-px p-0 whitespace-nowrap',
          'overflow-hidden absolute -m-1',
        ])}
        style={{ clip: 'rect(0px, 0px, 0px, 0px)' }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <span
        className={clsx([
          'inline-flex items-center justify-center flex-shrink-0',
          'border-none rounded-full text-white transition',
          sizes[size]?.button,
          isSelected ? styles.radioButton : '',
          isSelected ? colors[color] : 'dark:bg-white/20 bg-gray-500/20',
          isFocused && 'ring-2 ring-white ring-offset-1 ring-offset-gray-900',
        ])}
      />
      <span className={clsx(['ml-2', sizes[size]?.label])}>{label}</span>
    </div>
  );
});

export default Radio;