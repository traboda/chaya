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
  variant?: 'minimal' | 'classic',
};


const PinDigit = ({
  type = 'text', id, ariaLabelledBy, mask, value, onChange,
  onKeyDown, placeholder, invalid, disabled, required, className, variant,
}: PinDigitProps) => {
  return (
      <input
          id={id}
          autoComplete="off"
          aria-labelledby={ariaLabelledBy}
          className={clsx([
            'dsr-text-lg dsr-outline-none dsr-text-center dsr-w-full placeholder:dsr-italic placeholder:dsr-text-slate-400/40',
            'dark:dsr-text-white dsr-text-black dsr-bg-gray-400/20',
            variant === 'minimal' ? 'dsr-border-b-2 focus:dsr-border-primary' : 'dsr-rounded-lg focus:dsr-border-2',
            className,
            invalid ? 'dsr-border-red-500' : 'dsr-border-gray-400/40',
          ])}
          type={mask ? 'password' : type}
          inputMode={type === 'number' ? 'numeric' : 'text'}
          value={value}
          onChange={(e) => onChange && onChange(e.currentTarget.value)}
          onKeyDown={(e) => ((!disabled ? onKeyDown && onKeyDown(e) : null))}
          placeholder={placeholder}
          required={required}
          style={{ background: variant === 'minimal' ? 'transparent' : '' }}
      />
  );
};

export default PinDigit;
