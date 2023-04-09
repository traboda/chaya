import React, { ChangeEvent } from 'react';
import clsx from 'clsx';

export type CheckboxColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type CheckboxButtonProps = {
  value: string,
  label: string,
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void,
  color?: CheckboxColor,
  size?: CheckboxSize,
  isDisabled?: boolean,
  isChecked?: boolean,
  spacing?: string,
  className?: string,
};

export const sizes = {
  'xs': { button: 'dsr-h-2 dsr-w-2', label: 'dsr-text-xs' },
  'sm': { button: 'dsr-h-3 dsr-w-3', label: 'dsr-text-sm' },
  'md': { button: 'dsr-h-4 dsr-w-4', label: 'dsr-text-md' },
  'lg': { button: 'dsr-h-5 dsr-w-5', label: 'dsr-text-lg' },
  'xl': { button: 'dsr-h-6 dsr-w-6', label: 'dsr-text-xl' },
};

export const colors = {
  'primary': 'dsr-bg-primary',
  'secondary': 'dsr-bg-secondary',
  'success': 'dsr-bg-green-500',
  'danger': 'dsr-bg-red-500',
  'warning': 'dsr-bg-yellow-400',
  'default': 'dsr-bg-gray-500/70',
};

const Checkbox = ({
  value, label, onChange = () => {}, isChecked = false, color = 'primary', size = 'md', isDisabled = false,
  className,
}: CheckboxButtonProps) => {
  return (
    <label
      className={clsx([
        'checkbox-container dsr-inline-flex dsr-items-center dsr-relative',
        className,
        isDisabled ? 'dsr-opacity-70' : 'dsr-cursor-pointer',
      ])}
    >
      <input
        aria-disabled={isDisabled}
        onChange={onChange}
        type="checkbox"
        name={value}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        className={clsx([
          'checkbox dsr-border-0 dsr-border-none dsr-h-px dsr-w-px dsr-p-0 dsr-whitespace-nowrap',
          'dsr-overflow-hidden dsr-absolute -dsr-m-1',
        ])}
        style={{ clip: 'rect(0px, 0px, 0px, 0px)' }}
      />
      <span
        className={clsx([
          'dsr-inline-flex dsr-items-center dsr-justify-center dsr-flex-shrink-0',
          'dsr-border-none dsr-rounded-sm', sizes[size]?.button,
          isChecked ? colors[color] : 'dark:dsr-bg-white/20 dsr-bg-gray-500/20',
        ])}
      >
        <div
          className={clsx([
            'dsr-flex dsr-justify-center dsr-items-center dsr-h-full dsr-w-full dsr-p-0.5',
            'dsr-duration-200 dsr-origin-bottom-left dsr-text-white dsr-ease-in-out dsr-transition-opacity',
            isChecked ? 'dsr-opacity-100 dsr-scale-100' : 'dsr-opacity-0 dsr-scale-75',
          ])}
        >
          <svg
            viewBox="0 0 12 10"
            style={{ fill: 'none', strokeWidth: '2px', stroke: 'currentcolor', strokeDasharray: '16px' }}
            className={clsx([
              isChecked && 'dsr-scale-100',
              'dsr-duration-400 dsr-origin-bottom-left dsr-ease-out dsr-transition dsr-transform',
            ])}
          >
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </div>
      </span>
      <span className={clsx(['dsr-ml-2', sizes[size]?.label])}>{label}</span>
    </label>
  );
};

export default Checkbox;