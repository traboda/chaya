import React from 'react';
import clsx from 'clsx';

import pinInputStyle from './pinInput.module.scss';

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
  variant?: 'minimal' | 'classic',
};


const PinDigit = ({
  type = 'text', id, ariaLabelledBy, mask = false, value, onChange,
  className, variant,
  onKeyDown = () => {}, placeholder, isInvalid = false, isDisabled = false, isRequired = false,
}: PinDigitProps) => (
  <input
    id={id}
    autoComplete="off"
    aria-labelledby={ariaLabelledBy}
    aria-disabled={isDisabled}
    className={clsx([
      'pin-digit dsr-text-lg dsr-outline-none dsr-text-center dsr-w-full placeholder:dsr-text-slate-400/40 dsr-text-color',
      variant === 'minimal' ? 'dsr-border-b-2 dsr-bg-transparent focus:dsr-border-primary' : 'dsr-py-1.5 dsr-rounded-lg dsr-border focus:dsr-border-primary dsr-bg-background-lighten-1 dsr-shadow-inner',
      className,
      isInvalid ? 'dsr-border-red-500' : 'dark:dsr-border-neutral-500/70 dsr-border-neutral-500/20',
      type === 'number' && pinInputStyle.hideStepper,
    ])}
    type={mask ? 'password' : type}
    value={value}
    onChange={(e) => onChange && onChange(e.currentTarget.value)}
    onKeyDown={(e) => ((!isDisabled ? onKeyDown && onKeyDown(e) : null))}
    placeholder={placeholder}
    required={isRequired}
    disabled={isDisabled}
  />
);

export default PinDigit;
