import React from 'react';

import mcs from '../../utils/merge';

import styles from './PinDigit.module.scss';

export type PinDigitProps = {
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
    className={mcs([
      'pin-digit text-lg outline-none text-center w-full placeholder:text-slate-400/40 text-color',
      variant === 'minimal' ? 'border-b-2 bg-transparent focus:border-primary' : 'py-1.5 rounded-lg border focus:border-primary bg-background-lighten-1 shadow-inner',
      className,
      isInvalid ? 'border-red-500' : 'dark:border-neutral-500/70 border-neutral-500/20',
      type === 'number' && styles.hideStepper,
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
