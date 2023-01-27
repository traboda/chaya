import React from 'react';
import clsx from 'clsx';

type PinDigitProps = {
  id?: string,
  mask?: boolean,
  type?: string,
  value?: string,
  onChange?: (val: string) => void,
  ariaLabelledBy?: string,
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  placeholder?: string,
  invalid?: boolean,
  disabled?: boolean,
  required?: boolean,
  className?: string,
};


const PinDigit = ({
  type = 'text', id, ariaLabelledBy, mask, value, onChange,
  onKeyDown, placeholder, invalid, disabled, required, className,
} : PinDigitProps) => (
    <input
        id={id}
        autoComplete="off"
        aria-labelledby={ariaLabelledBy}
        className={clsx([
          'dsr-text-lg dsr-outline-1 dsr-p-2 dsr-text-center dsr-rounded-lg dsr-w-full',
          className,
          invalid ? 'dsr-outline-red-500' : 'dsr-outline-gray-400',
        ])}
        type={mask ? 'password' : type}
        inputMode={type === 'number' ? 'numeric' : 'text'}
        value={value}
        onChange={(e) => onChange && onChange(e.currentTarget.value)}
        onKeyDown={(e) => ((!disabled ? onKeyDown && onKeyDown(e) : null))}
        placeholder={placeholder}
        required={required}
    />
);

export default PinDigit;
