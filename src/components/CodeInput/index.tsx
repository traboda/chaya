import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import CodeInputText from './input';

const OTPLabel = styled.label`
  font-size: calc(1rem + 0.15vw);
  opacity: 0.8;
`;

type CodeInputProps = {
    // current value
    value: string,
    // callback function when input is changed
    onChange: (string) => void,
    // number of digits in the code
    digits?: number,
    labels?: {
        // title label for the input box
        title: string
    },
    // placeholder code - make sure it has same length as `digits`
    placeholder?: string,
    hasError?: boolean,
    autoFocus?: boolean
}

const CodeInput = ({
   value = '', onChange = () => {}, digits = 6, labels, placeholder, hasError = false, autoFocus = false,
}: CodeInputProps) => {

    const inputs = useRef(null);
    const [invalidLength, setInvalidLength] = useState(false);

    const onKeyDown = (event, index) => {
        const elems = inputs.current.children;

        if (
            (event.keyCode >= 48 && event.keyCode <= 57) ||
            (event.keyCode >= 65 && event.keyCode <= 90) ||
            event.keyCode === 8
        ) {
            const char = event.keyCode === 8 ? '' : event.key;
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
        {labels?.title && <OTPLabel>{labels.title}</OTPLabel>}
        <div
            ref={inputs}
            className="py-3 grid gap-4"
            style={{ gridTemplateColumns: `repeat(${digits}, 1fr)` }}
            onFocus={() => setInvalidLength(false)}
            onBlur={() => value?.length < digits ? setInvalidLength(true) : setInvalidLength(false)}
        >
            {Array(digits).fill(null).map((_, i) => (
                <CodeInputText
                    key={i}
                    value={value[i] ?? ''}
                    onKeyDown={e => onKeyDown(e, i)}
                    placeholder={placeholder?.[i] ?? ' '}
                    hasError={hasError}
                />
            ))}
        </div>
        {(invalidLength && value?.length < digits) &&
            <div className="text-red-600 mt-2">
                The code should be {digits} digits. Please verify.
            </div>}
    </div>;

};

export default CodeInput;