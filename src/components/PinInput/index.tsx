import React, { useEffect, useRef, useState } from 'react';

import PinDigit from './digit';
import { useTheme } from "@emotion/react";

type PinInputProps = {
    // current value
    value: string,
    // callback function when input is changed
    onChange: (string) => void,
    // number of digits in the code
    digits?: number,
    label?: string,
    type?: ('password' | 'text' | 'number'),
    // placeholder code - make sure it has same length as `digits`
    placeholder?: string,
    isInvalid?: boolean,
    isDisabled?: boolean,
    isRequired?: boolean,
    autoFocus?: boolean,
    className?: string,
    digitClassName?: string,
}

const PinInput = ({
   value = '', onChange = () => {}, digits = 6, type = 'text', label, placeholder,
   isInvalid = false, isDisabled = false, isRequired = false, autoFocus = false,
   className, digitClassName,
}: PinInputProps) => {

    const { color } = useTheme();
    const inputs = useRef(null);
    const [invalidLength, setInvalidLength] = useState(false);

    const onKeyDown = (event, index) => {
        const elems = inputs.current.children;

        if (
            (type === 'number' ? false : (event.keyCode >= 65 && event.keyCode <= 90)) || // type letters
            (event.keyCode >= 48 && event.keyCode <= 57) ||
            (event.keyCode >= 96 && event.keyCode <= 105) ||
            event.keyCode === 8
        ) {
            const char = event.keyCode === 8 ? '' : `${event.key}`;
            const newValue = value.substr(0, index) + (char[char.length - 1] ?? '') + value.substr(index + 1);
            onChange(newValue.trim().slice(0, digits));

            if (char[char.length - 1] && index !== elems.length - 1)
                elems[index + 1].focus();
        }

        if (event.key === 'Backspace') {
            if (index === 0) elems[index].focus();
            else elems[index - 1].focus();
        } else if (event.key === 'ArrowLeft') {
            if (index === 0) elems[elems.length - 1].focus();
            else elems[index - 1].focus();
        } else if (event.key === 'ArrowRight') {
            if (index === elems.length - 1) elems[0].focus();
            else elems[index + 1].focus();
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

    return <div>
        {label && (
            <label className="block text-lg opacity-80 mb-1" aria-hidden={false} style={{ color }}>
                {label}
                {isRequired && <span className="ml-1 text-red-500">*</span>}
            </label>
        )}
        <div
            ref={inputs}
            className={`py-2 grid gap-2 ${className}`}
            style={{ gridTemplateColumns: `repeat(${digits}, 1fr)` }}
            onFocus={() => setInvalidLength(false)}
            onBlur={() => value?.length < digits ? setInvalidLength(true) : setInvalidLength(false)}
        >
            {Array(digits).fill(null).map((_, i) => (
                <PinDigit
                    key={i}
                    type={type}
                    value={value[i] ?? ''}
                    onKeyDown={e => onKeyDown(e, i)}
                    placeholder={placeholder?.[i] ?? ' '}
                    isInvalid={isInvalid}
                    isDisabled={isDisabled}
                    className={digitClassName}
                />
            ))}
        </div>
        {(invalidLength && value?.length < digits && !isDisabled) &&
            <div className="text-red-600 text-base">
                The code should be {digits} digits.
            </div>}
    </div>;

};

export default PinInput;