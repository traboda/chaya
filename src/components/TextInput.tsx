import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import styled from '@emotion/styled';
import Color from 'color';

const emptyFunc = () => {};

const TextContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;

  label {
    .required-marker {
      margin-left: 0.25rem;
      color: #F99;
      font-size: 15px;
    }
  }

  input, textarea {
    color: ${({ theme }) => theme.color};

    &::placeholder {
      color: ${({ theme }) => theme.color};
      opacity: 0.5;
    }
  }
  
  .text-input-box {
    &:hover {
      .text-input-postfix, .text-input-prefix {
        border-color: hsla(0, 0%, 80%, .8);
      }
    }
    &:focus-within {
      .text-input-postfix, .text-input-prefix {
        border: 1px solid ${({ theme }) => theme.secondary}!important;
      }
    }
  }
`;

type StyledTextInput = {
    invalid?: boolean
}

const StyledTextInput = styled('input')<StyledTextInput>`
  display: block;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border-radius: 8px;
  border: 1px solid ${({ invalid }) => invalid ? 'crimson' : 'hsla(0, 0%, 40%, .7)'};

  &:not(:focus):is([type="number"]):not(:placeholder-shown):invalid, 
  &:not(:focus):not([type="number"]):not([value=""]):not(:placeholder-shown):invalid{
    border: 1px solid crimson!important;
  }

  &:hover {
    border-color: hsla(0, 0%, 80%, .8);
  }
  

  &:focus {
    outline: none!important;
    border: 1px solid ${({ theme }) => theme.secondary}!important;
  }
`;


const TextFix = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => Color(theme.background).darken(theme?.isDarkTheme ? 0.3 : 0.15).hex()};
  align-items: center;
  border: 1px solid hsla(0, 0%, 40%, .7);
`;


const PostFixIcon = styled(TextFix)`
  right: 0;
  display: flex;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const PreFixIcon = styled(TextFix)`
  left: 0;
  display: inline-flex;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  max-width: 5rem;
`;

type TextInput = {
    label: string
    name: string
    id?: string
    placeholder?: string
    type?: ('email' | 'number' | 'password' | 'text' | 'textarea' | 'url')
    value: (string | number)
    required?: boolean
    disabled?: boolean
    invalid?: boolean
    inputClassName?: string
    inputStyle?: React.CSSProperties
    rows?: number
    charLimit?: number | null
    errorText?: string
    description?: string
    hideLabel?: boolean
    min?: number
    max?: number
    spellCheck?: ('off' | 'on')
    autoComplete?: ('off' | 'on' | 'email' | 'current-password' | 'username')
    autoCorrect?: ('off' | 'on')
    autoCapitalize?: ('off' | 'on')
    onFocus?: () => void
    onBlur?: () => void
    onKeyDown?: (e: any) => void,
    onChange?: (value: any) => void
    className?: string
    style?: React.CSSProperties
    autoFocus?: boolean,
    postfixRenderer?: React.ReactElement
    prefixRenderer?: React.ReactElement
};


const TextInput = ({
   id, label, name, placeholder, value: val, charLimit = null,
   className, style, hideLabel = false,
   required = false, disabled = false, invalid = false, autoFocus = false,
   rows = 3, spellCheck, autoComplete, autoCorrect, autoCapitalize, min = null, max = null,
   inputStyle, inputClassName, type, errorText, description, postfixRenderer, prefixRenderer,
   onChange = emptyFunc, onFocus = emptyFunc, onBlur = emptyFunc, onKeyDown = emptyFunc,
}: TextInput) => {

    const inputID = id && id.length > 1 ? id : `${name}-input-${nanoid()}`;

    const [isTyping, setTyping] = useState(false);

    const [value, setValue] = useState(val !== null ? val : '');
    useEffect(() => {
        setValue(val);
    }, [val]);

    const handleChange = (e: any) => {
        const value = e.currentTarget.value;
        if (charLimit == null || (value.length <= charLimit)) {
            if (typeof onChange === 'function')
                if (type === 'number')
                    onChange(parseInt(value));
                else
                    onChange(value);
            setValue(value);
        }
    };

    const handleFocus = () => {
        if (typeof onFocus === 'function')
            onFocus();
        setTyping(true);
    };

    const handleBlur = () => {
        if (typeof onBlur === 'function')
            onBlur();
        setTyping(false);
    };

    const props = {
        'aria-label': label,
        'aria-required': required,
        id: inputID,
        value,
        placeholder: placeholder || label,
        spellCheck,
        autoComplete,
        autoCorrect,
        autoCapitalize,
        minLength: min,
        maxLength: max,
        autoFocus: autoFocus ? 'true' : null,
        required: required,
        disabled: disabled,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onChange: handleChange,
        type,
        style: inputStyle,
    };

    const showLimit = ((typeof value !== 'number' && value?.length > 0) && isTyping && charLimit !== null && charLimit > 0);

    return (
        <TextContainer className={className} style={style}>
            {(!hideLabel) &&
            <div className="flex flex-wrap mb-1 px-1 mx-0">
                <div className={showLimit ? 'w-2/3 px-0' : 'w-full px-0'}>
                    {label &&
                    <label className="text-base opacity-80" htmlFor={inputID} aria-hidden={false}>
                        {label}
                        {required && <span className="required-marker">*</span>}
                    </label>}
                </div>
                {(showLimit && typeof value !== 'number') && (
                    <div className="w-1/3 opacity-80 px-1 flex items-end justify-end">
                        {value?.length}/{charLimit}
                    </div>
                )}
            </div>}
            <div className="relative text-input-box">
                {prefixRenderer && <PreFixIcon className="text-input-prefix px-2 py-1.5">{prefixRenderer}</PreFixIcon>}
                <StyledTextInput
                    as={type === 'textarea' ? 'textarea' : 'input'}
                    // @ts-ignore
                    rows={type === 'textarea' ? rows : null}
                    {...props}
                    invalid={invalid || !!errorText}
                    className={`text-lg px-2 py-1.5 ${inputClassName}`}
                    style={{
                        paddingLeft: prefixRenderer ? '5.5rem' : '0.5rem',
                    }}
                    onKeyDown={onKeyDown}
                />
                {postfixRenderer && <PostFixIcon className="text-input-postfix px-2 py-1.5">{postfixRenderer}</PostFixIcon>}
            </div>
            {errorText &&
            <div className="text-red-400 mt-1">
                {errorText}
            </div>}
            {description &&
            <div className="mt-2" style={{ opacity: 0.75, fontSize: '10px' }}>
                {description}
            </div>}
        </TextContainer>
    );

};

export default TextInput;
