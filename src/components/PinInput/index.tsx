import React, { useEffect, useRef, useState } from 'react';
import hyperid from 'hyperid';
const generate = hyperid();

import PinDigit from './digit';

type PinInputProps = {
  // current value
  value: string,
  // callback function when input is changed
  onChange: (val: string) => void,
  // number of digits in the code
  digits?: number,
  label?: string,
  type?: ('text' | 'number'),
  mask?: boolean,
  invalid?: boolean,
  disabled?: boolean,
  required?: boolean,
  autoFocus?: boolean,
  id?: string,
  className?: string,
  digitClassName?: string,
  labels?: {
    label?: string,
    placeholder?: string,
    invalidLength?: string,
  }
};


const PinInput = ({
  value = '', onChange: onChangeProp = () => {}, digits = 6, type = 'text', mask = false, labels,
  invalid = false, disabled = false, required = false, autoFocus = false, id,
  className = '', digitClassName = '',
}: PinInputProps) => {

  const inputs = useRef<HTMLInputElement>(null);
  const [invalidLength, setInvalidLength] = useState(false);
  const [isInvalid, setInvalid] = useState(invalid);
  const inputID = id ? id : `pin-input-${generate()}`;

  const onChange = (val: string) => {
    onChangeProp(val);
    setInvalid(false);
  };

  const selectDigit = ({ index }: { index: any }) => {
    const elems = inputs.current?.children as HTMLCollectionOf<HTMLInputElement>;
    elems[index].focus();
    elems[index].select();
  };

  const onChangeVal = ({ val, index }: { val: string, index: number }) => {
    if (val) {
      const newVal = value.split('');
      newVal[index] = (index === digits - 1) ? val[val.length - 1] : val[0];
      onChange(newVal.join('').trim().slice(0, digits));
      if (val && index !== digits - 1)
        selectDigit({ index: index + 1 });
    }
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Backspace') {
      // remove current digit
      const newValue = value.slice(0, index) + value.slice(index + 1);
      onChange(newValue.trim().slice(0, digits));
      // focus back to previous digit
      if (index === 0) selectDigit({ index: index });
      else selectDigit({ index: index - 1 });
    } else if (event.key === 'Delete') {
      // current next digit, no change in focus
      const newValue = value.slice(0, index + 1) + value.slice(index + 2);
      onChange(newValue.trim().slice(0, digits));
    } else if (event.key === 'ArrowLeft') {
      if (index - 1 < value.length) {
        if (index === 0 && value.length === digits) {
          selectDigit({ index: digits - 1 });
        } else {
          selectDigit({ index: index - 1 });
        }
      }
    } else if (event.key === 'ArrowRight') {
      if (value?.length > index) {
        if (index === digits - 1) selectDigit({ index: 0 });
        else selectDigit({ index: index + 1 });
      }
    }
  };

  const onPaste = (event: any) => {
    event.preventDefault();
    const text = (event.originalEvent || event).clipboardData.getData('text/plain');
    onChange(text.trim().slice(0, digits));
  };

  useEffect(() => {
    if (autoFocus) (inputs.current?.children[0] as HTMLElement).focus();
  }, [autoFocus]);

  useEffect(() => {
    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  }, []);

  return (
      <div>
          {labels?.label && (
          <label
              id={`${inputID}-label`}
              className="dsr-block dsr-text-lg dsr-opacity-80 dsr-mb-1"
              aria-hidden={false}
          >
              {labels?.label}
              {required && <span className="dsr-ml-1 dsr-text-red-500">*</span>}
          </label>
          )}
          <div
              ref={inputs}
              className={`dsr-py-2 dsr-grid dsr-gap-2 dsr-pin-input ${className}`}
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
                      invalid={isInvalid}
                      disabled={disabled}
                      required={required}
                      className={digitClassName}
                  />
              ))}
          </div>
          {(invalidLength && value?.length < digits && !disabled) &&
          <div className="dsr-text-red-600 dsr-text-base">
              {labels?.invalidLength ?? `The code should be ${digits} digits.`}
          </div>}
      </div>
  );
};

export default PinInput;