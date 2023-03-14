import React, { useContext, useEffect, useMemo, useState, KeyboardEvent, ChangeEvent } from 'react';
import clsx from 'clsx';
import Color from 'color';
import { nanoid } from 'nanoid';

import DSRContext from '../contexts/DSRContext';

import Label from './Label';

const emptyFunc = () => {};

export type TextInputProps<Type> = {
  label: string
  name: string
  id?: string
  placeholder?: string
  type?: ('email' | 'number' | 'password' | 'text' | 'textarea' | 'url')
  value: Type
  isRequired?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  inputClassName?: string
  inputStyle?: React.CSSProperties
  rows?: number
  charLimit?: number | null
  errorText?: string
  description?: string
  hideLabel?: boolean
  min?: number
  max?: number
  spellCheck?: boolean,
  autoComplete?: ('off' | 'on' | 'email' | 'current-password' | 'username')
  autoCorrect?: ('off' | 'on')
  autoCapitalize?: ('off' | 'on')
  onFocus?: () => void
  onBlur?: () => void
  onKeyDown?: (e: KeyboardEvent) => void,
  onChange?: (value: Type) => void
  className?: string
  style?: React.CSSProperties
  autoFocus?: boolean,
  postfixRenderer?: React.ReactElement
  prefixRenderer?: React.ReactElement
};

const TextInput = <Type extends string | number>({
  id, label, name, placeholder, value: val, charLimit = null,
  className, style, hideLabel = false,
  isRequired = false, isDisabled = false, isInvalid = false, autoFocus = false,
  rows = 3, spellCheck, autoComplete, autoCorrect, autoCapitalize, min, max,
  inputStyle, inputClassName, type, errorText, description, postfixRenderer, prefixRenderer,
  onChange = emptyFunc, onFocus = emptyFunc, onBlur = emptyFunc, onKeyDown = emptyFunc,
}: TextInputProps<Type>) => {

  const { isDarkTheme, theme } = useContext(DSRContext);

  const inputID = useMemo(() => id && id.length > 1 ? id : `${name}-input-${nanoid()}`, [id, name]);

  const [isTyping, setTyping] = useState(false);
  const [touched, setTouched] = useState(false);

  const [value, setValue] = useState<Type>(val !== null ? val : '' as Type);
  useEffect(() => {
    setValue(val);
  }, [val]);

  useEffect(() => {
    if (value) setTouched(true);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (charLimit == null || (value.length <= charLimit)) {
      if (typeof onChange === 'function')
        if (type === 'number') onChange(parseInt(value) as Type);
        else onChange(value as Type);
      setValue(value as Type);
    }
  };

  const handleFocus = () => {
    setTouched(true);
    if (typeof onFocus === 'function') onFocus();
    setTyping(true);
  };

  const handleBlur = () => {
    if (typeof onBlur === 'function') onBlur();
    setTyping(false);
  };

  const props = {
    'aria-label': label,
    'aria-required': isRequired,
    id: inputID,
    name,
    value: value as (string | number),
    placeholder: placeholder || label,
    spellCheck,
    autoComplete,
    autoCorrect,
    autoCapitalize,
    min,
    max,
    autoFocus,
    required: isRequired,
    disabled: isDisabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
  };

  const showLimit = (typeof value !== 'number' && (value as string)?.length > 0) && isTyping && charLimit !== null && charLimit > 0;

  const inputClassNameCalculated = clsx([
    'dsr-px-2.5 dsr-py-2 dsr-block dsr-w-full dsr-bg-background placeholder:dsr-text-color',
    'dsr-text-color dsr-border-y group-[:not(:focus-within):hover]:dsr-border-gray-400/80 placeholder:dsr-opacity-50',
    'focus:dsr-outline-none group-focus-within:dsr-border-primary dsr-text-base',
    isInvalid ? 'dsr-border-red-500' : 'dsr-border-gray-500/70',
    touched ? 'invalid:dsr-border-red-500' : '',
    prefixRenderer ? '' : 'dsr-rounded-l-lg dsr-border-l',
    postfixRenderer ? '' : 'dsr-rounded-r-lg dsr-border-r',
    inputClassName,
  ]);

  const iconClassNameCalculated = clsx([
    'dsr-border group-[:not(:focus-within):hover]:dsr-border-gray-400/80 group-focus-within:dsr-border-primary',
    'dsr-text-color group-focus-within:dsr-border-primary dsr-overflow-hidden',
    'dsr-items-center dsr-border-gray-500/70 dsr-text-base',
  ]);

  return (
      <div
          className={clsx([
            className,
            'text-input dsr-w-full dsr-h-full dsr-overflow-hidden',
          ])}
          style={style}
      >
          {!hideLabel && label && (
              <Label
                  htmlFor={inputID}
                  isRequired={isRequired}
                  children={label}
                  sidebar={(showLimit && typeof value !== 'number') && (
                      <span className="text-input-char-limit dsr-opacity-80 dsr-px-1">
                          {(value as string)?.length}
                          /
                          {charLimit}
                      </span>
                  )}
              />
          )}
          <div className="dsr-relative dsr-group dsr-flex">
              {prefixRenderer && (
                  <div
                      className={clsx([
                        iconClassNameCalculated,
                        'dsr-left-0 dsr-inline-flex dsr-rounded-tl-lg dsr-rounded-bl-lg dsr-max-w-[5rem] dsr-shrink-0',
                      ])}
                      style={{ background: Color(theme?.background).darken(isDarkTheme ? 0.3 : 0.1).hex() }}
                  >
                      {prefixRenderer}
                  </div>
              )}
              {type === 'textarea' ? (
                  <textarea
                      rows={rows}
                      className={inputClassNameCalculated}
                      style={inputStyle}
                      onKeyDown={onKeyDown}
                      {...props}
                  />
              ) : (
                  <input
                      type={type}
                      className={inputClassNameCalculated}
                      style={inputStyle}
                      onKeyDown={onKeyDown}
                      {...props}
                  />
              )}
              {postfixRenderer && (
                  <div
                      className={clsx([
                        iconClassNameCalculated,
                        'dsr-right-0 dsr-flex dsr-rounded-tr-lg dsr-rounded-br-lg dsr-shrink-0',
                      ])}
                      style={{ background: Color(theme?.background).darken(isDarkTheme ? 0.3 : 0.1).hex() }}
                  >
                      {postfixRenderer}
                  </div>
              )}
          </div>
          {errorText && (
              <div className="dsr-text-red-400 dsr-mt-1">
                  {errorText}
              </div>
          )}
          {description && (
              <div className="dsr-mt-2 dsr-opacity-75 dsr-text-sm">
                  {description}
              </div>
          )}
      </div>
  );

};

export default TextInput;
