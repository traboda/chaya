import React, { useEffect, useRef, useState } from 'react';

import PinDigit from './digit';
import { useTheme } from "@emotion/react";
import {nanoid} from "nanoid";

type PinInputProps = {
    // current value
    value: string,
    // callback function when input is changed
    onChange: (string) => void,
    // number of digits in the code
    digits?: number,
    label?: string,
    type?: ('text' | 'number'),
    mask?: boolean,
    invalid?: boolean,
    disabled?: boolean,
    required?: boolean,
    autoFocus?: boolean,
    className?: string,
    digitClassName?: string,
    labels?: {
        label?: string,
        placeholder?: string,
        invalidLength?: string,
    }
};


const PinInput = ({
   value = '', onChange: _onChange = () => {}, digits = 6, type = 'text', mask = false, labels,
   invalid = false, disabled = false, required = false, autoFocus = false,
   className = '', digitClassName = '',
}: PinInputProps) => {

    const { color } = useTheme();
    const inputs = useRef(null);
    const [invalidLength, setInvalidLength] = useState(false);
    const [_isInvalid, setInvalid] = useState(invalid);
    const inputID = `pin-input-${nanoid()}`;

    const onChange = (val) => {
        _onChange(val);
        setInvalid(false);
    };

    const selectDigit = (index) => {
        const elems = inputs.current.children;
        elems[index].focus();
        elems[index].select()
    }

    const onChangeVal = (_val = '', index) => {
        if(_val && typeof value === 'string') {
            const newVal = value.split('');
            newVal[index] = (index === digits-1) ? _val[_val.length-1] : _val[0];
            onChange(newVal.join('').trim().slice(0, digits));
            if (_val && index !== digits-1)
                selectDigit(index + 1);
        }
    };

    const onKeyDown = (event, index) => {
        if (event.key === 'Backspace') {
            // remove current digit
            const newValue = value.substr(0, index) + value.substr(index + 1);
            onChange(newValue.trim().slice(0, digits));
            // focus back to previous digit
            if (index === 0) selectDigit(index);
            else selectDigit(index - 1);
        } else if (event.key === 'Delete') {
            // current next digit, no change in focus
            const newValue = value.substr(0, index+1) + value.substr(index + 2);
            onChange(newValue.trim().slice(0, digits));
        } else if (event.key === 'ArrowLeft') {
            if(typeof value === 'string' && index - 1 < value.length) {
                if (index === 0 && value.length === digits) {
                    selectDigit(digits-1);
                } else {
                    selectDigit(index-1);
                }
            }
        } else if (event.key === 'ArrowRight') {
            if(typeof value === 'string' && value?.length > index) {
                if (index === digits-1) selectDigit(0);
                else selectDigit(index + 1);
            }
        }
    };

    const onPaste = (event) => {
        const text = (event.originalEvent || event).clipboardData.getData('text/plain');
        onChange(text.trim().slice(0, digits));
    };

    useEffect(() => {
        if (autoFocus) inputs.current.children[0].focus();
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
                    className="block text-lg opacity-80 mb-1"
                    aria-hidden={false}
                    style={{ color }}
                >
                    {labels?.label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}
            <div
                ref={inputs}
                className={`py-2 grid gap-2 ${className}`}
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
                        onChange={(value) => onChangeVal(value,i)}
                        onKeyDown={e => onKeyDown(e, i)}
                        placeholder={labels?.placeholder?.[i] ?? ''}
                        invalid={_isInvalid}
                        disabled={disabled}
                        required={required}
                        className={digitClassName}
                    />
                ))}
            </div>
            {(invalidLength && value?.length < digits && !disabled) &&
            <div className="text-red-600 text-base">
                {labels?.invalidLength ?? `The code should be ${digits} digits.`}
            </div>}
        </div>
    );

};

export default PinInput;