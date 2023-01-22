import React, { useContext, useRef } from 'react';
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

const variants = {
  'primary': 'bg-primary',
  'secondary': 'bg-secondary',
  'success': 'bg-green-500',
  'danger': 'bg-red-500',
  'warning': 'bg-yellow-400',
  'transparent': 'bg-inherit',
};

const Switch = ({ value, onChange = () => {}, size = 24, label, required = false, variant = 'success', id, className = '', disabled = false }: SwitchProps) => {

  const isDarkTheme = useContext(DSRContext);
  const checkbox = useRef(null);
  const inputID = id ? id : `switch-input-${generateId()}`;

  return (
      <div className="dsr-w-full dsr-flex dsr-flex-col">
          {label && (
          <label
              className="dsr-block dsr-text-lg dsr-opacity-80 dsr-mb-1 dsr-text-color"
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
                value && `dsr-${variants[variant]}`,
                className,
                disabled && 'dsr-cursor-not-allowed',
              ])}
              style={{ height: size, width: size * 2, background: value ? '' : isDarkTheme ? 'rgba(237, 237, 237, 0.35)' : 'rgba(200, 200, 200, 0.5)' }}
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
                    value && `dsr-border-${variants[variant]}`,
                    value && 'dsr-translate-x-full',
                  ])}
                  style={{ height: size, width: size }}
              />
          </label>
      </div>
  );
};

export default Switch;