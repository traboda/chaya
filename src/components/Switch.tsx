'use client';
import React, { useMemo, useRef } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import mcs from '../utils/merge';

import Label from './Label';

export interface SwitchProps {
  value: boolean,
  onChange?: (v: boolean) => void,
  size?: number,
  label?: string,
  id?: string,
  className?: string,
  isRequired?: boolean,
  isDisabled?: boolean,
  variant?: ('success' | 'primary' | 'secondary' | 'danger' | 'warning' | 'transparent'),
}

const borders = {
  'primary': 'border-primary',
  'secondary': 'border-secondary',
  'success': 'border-green-500',
  'danger': 'border-red-500',
  'warning': 'border-yellow-400',
  'transparent': 'border-inherit',
};

const variants = {
  'primary': 'bg-primary',
  'secondary': 'bg-secondary',
  'success': 'bg-green-500',
  'danger': 'bg-red-500',
  'warning': 'bg-yellow-400',
  'transparent': 'bg-inherit',
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
        'switch-container w-full flex flex-col',
        isDisabled && 'opacity-70',
      ])}
    >
      {label && <Label htmlFor={inputID} id={`${inputID}-label`} children={label} isRequired={isRequired} />}
      <label
        className={mcs([
          'inline-block rounded-full shadow-inner border dark:border-gray-500/70 border-gray-500/10',
          value && variants[variant],
          className,
          isDisabled && 'cursor-not-allowed',
          !value && 'dark:bg-gray-500/20 bg-gray-500/10',
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
          className="switch absolute opacity-0"
          required={isRequired}
          checked={value}
          onChange={({ target }) => onChange(target.checked)}
        />
        <div
          className={clsx([
            'rounded-full bg-white transition shadow-md border',
            value && borders[variant],
            value && 'translate-x-full',
          ])}
          style={{ height: size - 2, width: size - 1 }}
        />
      </label>
    </div>
  );
};

export default Switch;
