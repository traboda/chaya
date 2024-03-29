'use client';
import React, { useEffect, useMemo, useState, KeyboardEvent, ChangeEvent, FocusEvent } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import Spinner from '../Spinner';
import Label from '../Label';
import Icon, { IconInputType } from '../Icon';

import textInputStyle from './textInput.module.scss';

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
  isLoading?: boolean
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
  onFocus?: (event: FocusEvent) => void
  onBlur?: (event: FocusEvent) => void
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  onChange?: (value: Type, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  className?: string
  style?: React.CSSProperties
  autoFocus?: boolean,
  postfixRenderer?: React.ReactNode,
  prefixRenderer?: React.ReactNode,
  leftIcon?: IconInputType,
  rightIcon?: IconInputType,
  prefixClassName?: string,
  postfixClassName?: string,
  hideStepper?: boolean
};

const TextInput = <Type extends string | number>({
  id, label, name, placeholder, value: val, charLimit = null,
  className, style, hideLabel = false, isLoading = false, leftIcon, rightIcon,
  isRequired = false, isDisabled = false, isInvalid = false, autoFocus = false,
  rows = 3, spellCheck, autoComplete, autoCorrect, autoCapitalize, min, max,
  inputStyle, inputClassName, type, errorText, description, postfixRenderer, prefixRenderer,
  onChange = emptyFunc, onFocus = emptyFunc, onBlur = emptyFunc, onKeyDown = emptyFunc,
  prefixClassName, postfixClassName, hideStepper = false,
}: TextInputProps<Type>) => {

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

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (charLimit == null || (value.length <= charLimit)) {
      if (typeof onChange === 'function')
        if (type === 'number') onChange(parseInt(value) as Type, event);
        else onChange(value as Type, event);
      setValue(value as Type);
    }
  };

  const handleFocus = (event: FocusEvent) => {
    setTouched(true);
    if (typeof onFocus === 'function') onFocus(event);
    setTyping(true);
  };

  const handleBlur = (event: FocusEvent) => {
    if (typeof onBlur === 'function') onBlur(event);
    setTyping(false);
  };

  const props = {
    'aria-label': label,
    'aria-required': isRequired,
    'aria-disabled': isDisabled || isLoading,
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
    disabled: isDisabled || isLoading,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    onKeyDown,
    style: inputStyle,
  };

  const showLimit = (typeof value !== 'number' && (value as string)?.length > 0) && isTyping && charLimit !== null && charLimit > 0;

  const commonClasses = clsx([
    'dsr-text-color dsr-text-base',
    'group-focus-within:dsr-border-gray-500/50',
    // @TODO: invalid state for prefix and postfix when input is invalid - group-invalid is not a thing
    isDisabled || isLoading ? '' : 'group-[:not(:focus-within):hover]:dsr-border-gray-500/40',
    isInvalid ? 'dsr-border-red-500' : 'dark:dsr-border-neutral-500/70 dsr-border-neutral-500/20',
  ]);

  const inputClassNameCalculated = clsx([
    'dsr-px-2.5 dsr-py-2 dsr-block dsr-w-full dsr-bg-background-lighten-1 placeholder:dsr-text-color focus:dsr-outline-none',
    'dsr-text-color dsr-border-y placeholder:dsr-opacity-50 dsr-shadow-inner ',
    commonClasses,
    touched ? 'invalid:dsr-border-red-500' : '',
    prefixRenderer ? 'invalid:dsr-border-l' : 'dsr-rounded-l-lg dsr-border-l',
    postfixRenderer ? 'invalid:dsr-border-r' : 'dsr-rounded-r-lg dsr-border-r',
    inputClassName,
    leftIcon && 'dsr-pl-10',
    (rightIcon && isLoading) ? 'dsr-pr-20' : (rightIcon || isLoading ? 'dsr-pr-10' : ''),
    hideStepper && textInputStyle.hideStepper,
  ]);

  const iconClassNameCalculated = clsx([
    'dsr-border dsr-overflow-hidden dsr-items-center',
    commonClasses,
  ]);

  const innerIconClassNameCalculated = 'dsr-absolute dsr-top-1/2 -dsr-translate-y-1/2 dsr-text-color dsr-pointer-events-none';
  const postPrefixClassName = 'dark:dsr-bg-background-darken-3 dsr-bg-background-lighten-1 dsr-shrink-0 dsr-flex';

  return (
    <div
      className={clsx([
        className,
        'text-input dsr-w-full dsr-h-full dsr-overflow-hidden',
        (isDisabled || isLoading) && 'dsr-opacity-70',
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
      <div className="dsr-relative dsr-group dsr-flex dsr-justify-between">
        {prefixRenderer && (
          <div
            className={clsx([
              iconClassNameCalculated,
              prefixClassName,
              postPrefixClassName,
              'dsr-left-0 dsr-rounded-tl-lg dsr-rounded-bl-lg dsr-shrink-0',
            ])}
          >
            {prefixRenderer}
          </div>
        )}
        <div className="dsr-relative dsr-flex dsr-flex-grow">
          {leftIcon && (
          <div className={clsx(['dsr-left-3', innerIconClassNameCalculated])}>
            <Icon
              icon={leftIcon}
              size={18}
            />
          </div>
          )}
          {type === 'textarea' ? (
            <textarea rows={rows} className={inputClassNameCalculated} {...props} />
          ) : <input type={type} className={inputClassNameCalculated} {...props} />}
          {(rightIcon || isLoading) && (
            <div className={clsx(['dsr-right-3 dsr-flex dsr-gap-3 dsr-items-center', innerIconClassNameCalculated])}>
              {isLoading && <Spinner size="md" />}
              {rightIcon && <Icon icon={rightIcon} size={18} />}
            </div>
          )}
        </div>
        {postfixRenderer && (
          <div
            className={clsx([
              iconClassNameCalculated,
              postfixClassName,
              postPrefixClassName,
              'dsr-right-0 dsr-rounded-tr-lg dsr-rounded-br-lg',
            ])}
          >
            {postfixRenderer}
          </div>
        )}
      </div>
      {errorText && <div className="dsr-text-red-400 dsr-mt-1">{errorText}</div>}
      {description && <div className="dsr-mt-2 dsr-opacity-75 dsr-text-sm">{description}</div>}
    </div>
  );

};

export default TextInput;
