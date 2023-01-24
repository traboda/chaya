import React, { useContext, useMemo, useRef } from 'react';
import hyperid from 'hyperid';
import DSRContext from '../contexts/DSRContext';
import clsx from 'clsx';

const generateId = hyperid();

type SwitchProps = {
  value: boolean,
  onChange?: (v: boolean) => void,
  size?: number,
  label?: string,
  id?: string,
  className?: string,
  required?: boolean,
  variant?: ('success' | 'primary' | 'secondary' | 'danger' | 'warning' | 'transparent'),
  disabled?: boolean
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

const Switch = ({ value, onChange = () => {}, size = 24, label, required = false, variant = 'success', id, className = '', disabled = false }: SwitchProps) => {

  const isDarkTheme = useContext(DSRContext);
  const checkbox = useRef(null);
  const inputID = useMemo(() => id ?? `switch-input-${generateId()}`, [id]);

  return (
      <div className="dsr-w-full dsr-flex dsr-flex-col">
          {label && (
              <label
                  className="dsr-opacity-80 dsr-tracking-wide dsr-text-sm dsr-font-semibold dsr-opacity-70 dsr-mb-1"
                  htmlFor={inputID}
                  id={`${inputID}-label`}
                  aria-hidden={false}
              >
                  {label}
                  {required && <span className="dsr-text-red-500 dsr-ml-1">*</span>}
              </label>
          )}
          <label
              className={clsx([
                'dsr-inline-block dsr-rounded-full dsr-shadow-inner',
                value && variants[variant],
                className,
                disabled && 'dsr-cursor-not-allowed',
              ])}
              style={{
                height: size,
                width: size * 2,
                background: value ? '' : isDarkTheme ? 'rgba(237, 237, 237, 0.35)' : 'rgba(200, 200, 200, 0.5)',
              }}
          >
              <input
                  id={inputID}
                  ref={checkbox}
                  type="checkbox"
                  aria-labelledby={`${inputID}-label`}
                  aria-required={required}
                  aria-readonly={disabled}
                  aria-checked={value}
                  disabled={disabled}
                  className="dsr-absolute dsr-opacity-0"
                  required={required}
                  checked={value}
                  onChange={({ target }) => onChange(target.checked)}
              />
              <div
                  className={clsx([
                    'dsr-rounded-full dsr-bg-white dsr-transition dsr-shadow-md dsr-border',
                    value && borders[variant],
                    value && 'dsr-translate-x-full',
                  ])}
                  style={{ height: size, width: size }}
              />
          </label>
      </div>
  );
};

export default Switch;
