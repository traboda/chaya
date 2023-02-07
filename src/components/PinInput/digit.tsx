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
  isInvalid?: boolean,
  isDisabled?: boolean,
  isRequired?: boolean,
  className?: string,
  isDarkTheme?: boolean,
  variant?: 'minimal' | 'classic',
};


const PinDigit = ({
  type = 'text', id, ariaLabelledBy, mask = false, value, onChange,
  className, isDarkTheme, variant,
  onKeyDown = () => {}, placeholder, isInvalid = false, isDisabled = false, isRequired = false,
}: PinDigitProps) => (
    <input
        id={id}
        autoComplete="off"
        aria-labelledby={ariaLabelledBy}
        className={clsx([
          'pin-digit dsr-text-lg dsr-outline-none dsr-text-center dsr-w-full placeholder:dsr-text-slate-400/40',
          isDarkTheme ? 'dsr-text-white' : 'dsr-text-black',
          variant === 'minimal' ? 'dsr-border-b-2 focus:dsr-border-primary' : 'dsr-py-1.5 dsr-rounded-lg dsr-border focus:dsr-border-primary dsr-border-gray-500/50',
          className,
          isInvalid ? 'dsr-border-red-500' : 'dsr-border-gray-400/40',
          variant === 'minimal' ? 'dsr-bg-transparent' : 'dsr-bg-background',
        ])}
        type={mask ? 'password' : type}
        inputMode={type === 'number' ? 'numeric' : 'text'}
        value={value}
        onChange={(e) => onChange && onChange(e.currentTarget.value)}
        onKeyDown={(e) => ((!isDisabled ? onKeyDown && onKeyDown(e) : null))}
        placeholder={placeholder}
        required={isRequired}
    />
);

export default PinDigit;
