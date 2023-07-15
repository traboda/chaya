import React, { useMemo, useRef } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import Label from './Label';

export type SwitchProps = {
  value: boolean,
  onChange?: (v: boolean) => void,
  size?: number,
  label?: string,
  id?: string,
  className?: string,
  isRequired?: boolean,
  isDisabled?: boolean,
  variant?: ('success' | 'primary' | 'secondary' | 'danger' | 'warning' | 'transparent'),
};

const borders = {
  'primary': 'dsr-border-primary',
  'secondary': 'dsr-border-secondary',
  'success': 'dsr-border-green-500',
  'danger': 'dsr-border-red-500',
  'warning': 'dsr-border-yellow-400',
  'transparent': 'dsr-border-inherit',
};

const variants = {
  'primary': 'dsr-bg-primary',
  'secondary': 'dsr-bg-secondary',
  'success': 'dsr-bg-green-500',
  'danger': 'dsr-bg-red-500',
  'warning': 'dsr-bg-yellow-400',
  'transparent': 'dsr-bg-inherit',
};

const Switch = ({
  value, onChange = () => {},
  id, className = '', size = 24, label, variant = 'success',
  isRequired = false, isDisabled = false,
}: SwitchProps) => {

  const checkbox = useRef(null);
  const inputID = useMemo(() => id ?? `switch-input-${nanoid()}`, [id]);

  return (
    <div
      className={clsx([
        'switch-container dsr-w-full dsr-flex dsr-flex-col',
        isDisabled && 'dsr-opacity-70',
      ])}
    >
      {label && <Label htmlFor={inputID} id={`${inputID}-label`} children={label} isRequired={isRequired} />}
      <label
        className={clsx([
          'dsr-inline-block dsr-rounded-full dsr-shadow-inner dsr-border dark:dsr-border-gray-500/70 dsr-border-gray-500/10',
          value && variants[variant],
          className,
          isDisabled && 'dsr-cursor-not-allowed',
          !value && 'dark:dsr-bg-gray-500/20 dsr-bg-gray-500/10',
        ])}
        style={{
          height: size,
          width: size * 2,
        }}
      >
        <input
          id={inputID}
          ref={checkbox}
          type="checkbox"
          aria-labelledby={`${inputID}-label`}
          aria-required={isRequired}
          aria-readonly={isDisabled}
          aria-checked={value}
          aria-disabled={isDisabled}
          disabled={isDisabled}
          className="switch dsr-absolute dsr-opacity-0"
          required={isRequired}
          checked={value}
          onChange={({ target }) => onChange(target.checked)}
        />
        <div
          className={clsx([
            'dsr-rounded-full dsr-bg-white dsr-transition dsr-shadow-md dsr-border',
            value && borders[variant],
            value && 'dsr-translate-x-full',
          ])}
          style={{ height: size - 2, width: size - 1 }}
        />
      </label>
    </div>
  );
};

export default Switch;
