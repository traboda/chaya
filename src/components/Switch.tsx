import React, { useMemo, useRef } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

type SwitchProps = {
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
      <div className="switch-container dsr-w-full dsr-flex dsr-flex-col">
          {label && (
              <label
                  className="dsr-opacity-80 dsr-tracking-wide dsr-text-sm dsr-font-semibold dsr-opacity-70 dsr-mb-1"
                  htmlFor={inputID}
                  id={`${inputID}-label`}
                  aria-hidden={false}
              >
                  {label}
                  {isRequired && <span className="dsr-text-red-500 dsr-ml-1">*</span>}
              </label>
          )}
          <label
              className={clsx([
                'dsr-inline-block dsr-rounded-full dsr-shadow-inner dsr-border dsr-border-gray-500/70',
                value && variants[variant],
                className,
                isDisabled && 'dsr-cursor-not-allowed',
                !value && 'dsr-bg-background',
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
                  style={{ height: size - 2, width: size - 2 }}
              />
          </label>
      </div>
  );
};

export default Switch;
