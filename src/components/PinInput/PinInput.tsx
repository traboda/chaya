'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

import Label from '../Label';
import mcs from '../../utils/merge';

import PinDigit from './PinDigit';
import { PinInputProps } from './PinInput.types';


const PinInput = ({
  value = '', onChange: onChangeProp = () => {}, digits = 6, type = 'text', mask = false, labels,
  isInvalid: _isInvalid = false, isDisabled = false, isRequired = false, autoFocus = false, id,
  className = '', digitClassName = '', variant = 'minimal',
}: PinInputProps) => {

  const inputs = useRef<HTMLInputElement>(null);
  const [isInvalid, setInvalid] = useState(_isInvalid);
  const inputID = useMemo(() => id ?? `pin-input-${nanoid()}`, [id]);
  const abortController = useRef<AbortController>();

  const onChange = (val: string) => {
    onChangeProp(val.trim().slice(0, digits));
    const hasValidLength = val.length === digits;
    setInvalid(!hasValidLength);
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
      }).catch(() => {});
    }

    return () => {
      document.removeEventListener('paste', onPaste);
      abortController.current?.abort();
    };
  }, []);

  return (
    <div className={isDisabled ? 'opacity-70' : ''}>
      {labels?.label && <Label htmlFor={`${inputID}-label`} children={labels?.label} isRequired={isRequired} />}
      <div
        ref={inputs}
        className={mcs([
          'pin-input grid pin-input gap-2 dark:border-neutral-500/70 border-neutral-500/20',
          variant === 'minimal' ? 'bg-background-lighten-1 shadow-inner rounded-lg border px-2 py-1.5 focus-within:border-primary' : 'gap-2',
          className,
        ])}
        style={{ gridTemplateColumns: `repeat(${digits}, 1fr)` }}
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
    </div>
  );
};

export default PinInput;