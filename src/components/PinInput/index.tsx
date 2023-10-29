import React, { useEffect, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import Label from '../Label';

import PinDigit from './digit';

export type PinInputProps = {
  value: string,
  onChange?: (value: string) => void,
  digits?: number,
  label?: string,
  type?: ('text' | 'number'),
  mask?: boolean,
  id?: string,
  className?: string,
  digitClassName?: string,
  isInvalid?: boolean,
  isDisabled?: boolean,
  isRequired?: boolean,
  autoFocus?: boolean,
  labels?: {
    label?: string,
    placeholder?: string,
    invalidLength?: string,
  },
  variant?: 'minimal' | 'classic',
};


const PinInput = ({
  value = '', onChange: onChangeProp = () => {}, digits = 6, type = 'text', mask = false, labels,
  isInvalid: _isInvalid = false, isDisabled = false, isRequired = false, autoFocus = false, id,
  className = '', digitClassName = '', variant = 'minimal',
}: PinInputProps) => {

  const inputs = useRef<HTMLInputElement>(null);
  const [invalidLength, setInvalidLength] = useState(false);
  const [isInvalid, setInvalid] = useState(_isInvalid);
  const inputID = useMemo(() => id ?? `pin-input-${nanoid()}`, [id]);
  const abortController = useRef<AbortController>();

  const onChange = (val: string) => {
    onChangeProp(val.trim().slice(0, digits));
    setInvalid(false);
  };

  const selectDigit = (index: number) => {
    const elems = inputs.current?.children as HTMLCollectionOf<HTMLInputElement>;
    elems[index].focus();
    elems[index].select();
  };

  const onChangeVal = ({ val, index }: { val: string, index: number }) => {
    if (val) {
      const newVal = value.split('');
      newVal[index] = (index === digits - 1) ? val[val.length - 1] : val[0];
      onChange(newVal.join(''));
      if (val && index !== digits - 1)
        selectDigit(index + 1);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Backspace') {
      // remove current digit
      const newValue = value.slice(0, index) + value.slice(index + 1);
      onChange(newValue);
      // focus back to previous digit
      if (index === 0) selectDigit(index);
      else selectDigit(index - 1);
    } else if (event.key === 'Delete') {
      // current next digit, no change in focus
      const newValue = value.slice(0, index + 1) + value.slice(index + 2);
      onChange(newValue);
    } else if (event.key === 'ArrowLeft') {
      if (index - 1 < value.length) {
        if (index === 0 && value.length === digits) selectDigit(digits - 1);
        else selectDigit(index - 1);
      }
    } else if (event.key === 'ArrowRight') {
      if (value?.length > index) {
        if (index === digits - 1) selectDigit(0);
        else selectDigit(index + 1);
      }
    }
  };

  const onPaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const text = event.clipboardData?.getData('text/plain');
    if (text) onChange(text);
  };

  useEffect(() => {
    if (autoFocus) (inputs.current?.children[0] as HTMLElement).focus();
  }, [autoFocus]);

  useEffect(() => {
    document.addEventListener('paste', onPaste);

    if ('OTPCredential' in window) {
      abortController.current = new AbortController();

      navigator.credentials.get({
        otp: { transport: ['sms'] },
        signal: abortController.current?.signal,
      }).then(otp => {
        if (otp) onChange(otp.code);
      });
    }

    return () => {
      document.removeEventListener('paste', onPaste);
      abortController.current?.abort();
    };
  }, []);

  return (
    <div className={isDisabled ? 'dsr-opacity-70' : ''}>
      {labels?.label && <Label htmlFor={`${inputID}-label`} children={labels?.label} isRequired={isRequired} />}
      <div
        ref={inputs}
        className={clsx([
          'pin-input dsr-grid dsr-pin-input dsr-gap-2 dsr-border-gray-500/80',
          variant === 'minimal' ? 'dsr-rounded-lg dsr-border dsr-px-2 dsr-py-1.5 focus-within:dsr-border-primary' : 'dsr-gap-2',
          className,
        ])}
        style={{ gridTemplateColumns: `repeat(${digits}, 1fr)` }}
        onFocus={() => setInvalidLength(false)}
        onBlur={() => setInvalidLength(value?.length < digits)}
      >
        {Array(digits).fill(null).map((_, i) => (
          <PinDigit
            id={`${inputID}-${i}`}
            key={i}
            type={type}
            mask={mask}
            ariaLabelledBy={`${inputID}-label`}
            value={value[i] ?? ''}
            onChange={(value) => onChangeVal({ val: value, index: i })}
            onKeyDown={(e) => onKeyDown(e, i)}
            placeholder={labels?.placeholder?.[i] ?? ''}
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isRequired={isRequired}
            className={digitClassName}
            variant={variant}
          />
        ))}
      </div>
      {(invalidLength && value?.length < digits && !isDisabled) &&
      <div className="dsr-text-red-600 dsr-text-base">
        {labels?.invalidLength ?? `The code should be ${digits} digits.`}
      </div>}
    </div>
  );
};

export default PinInput;