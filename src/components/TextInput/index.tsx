'use client';
import React, { useEffect, useMemo, useState, KeyboardEvent, ChangeEvent, FocusEvent } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import Spinner from '../Spinner';
import Label from '../Label';
import Icon, { IconInputType } from '../Icon';
import mcs from '../../utils/merge';

import textInputStyle from './textInput.module.scss';

const emptyFunc = () => {};

type TextInputA = Omit<React.HTMLProps<HTMLInputElement | HTMLTextAreaElement>, 'onChange'>;
type TextInputBase = Omit<TextInputA, 'ref'>;

export interface TextInputProps<Type extends string | number> extends TextInputBase {
  label: string
  name: string
  id?: string
  placeholder?: string
  type?: ('email' | 'number' | 'password' | 'text' | 'textarea' | 'url' | 'tel' | 'search')
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
  autoComplete?: 'off' | 'on' | 'email' | 'current-password' | 'username'
  autoCorrect?: 'off' | 'on'
  autoCapitalize?: 'off' | 'on'
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
}

const TextInput = <Type extends string | number>({
  id, label, name, placeholder, value: val, charLimit = null,
  className, style, hideLabel = false, isLoading = false, leftIcon, rightIcon,
  isRequired = false, isDisabled = false, isInvalid = false, autoFocus = false,
  rows = 3, spellCheck, autoComplete, autoCorrect, autoCapitalize, min, max,
  inputStyle, inputClassName, type, errorText, description, postfixRenderer, prefixRenderer,
  onChange = emptyFunc, onFocus = emptyFunc, onBlur = emptyFunc, onKeyDown = emptyFunc,
  prefixClassName, postfixClassName, hideStepper = false, ..._props
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
    ..._props,
  };

  const showLimit = (typeof value !== 'number' && (value as string)?.length > 0) && isTyping && charLimit !== null && charLimit > 0;

  const commonClasses = clsx([
    'text-color text-base',
    'group-focus-within:border-gray-500/60 dark:group-focus-within:border-gray-300/60',
    // @TODO: invalid state for prefix and postfix when input is invalid - group-invalid is not a thing
    isDisabled || isLoading ? '' : 'group-[:not(:focus-within):hover]:border-gray-500/40',
    isInvalid ? 'border-red-500' : 'dark:border-neutral-500/70 border-neutral-500/20',
  ]);

  const inputClassNameCalculated = mcs([
    'px-2.5 py-2 block w-full bg-background-lighten-1 placeholder:text-color focus:outline-none',
    'text-color border-y placeholder:opacity-50 shadow-inner ',
    commonClasses,
    touched ? 'invalid:border-red-500' : '',
    prefixRenderer ? 'invalid:border-l' : 'rounded-l-lg border-l',
    postfixRenderer ? 'invalid:border-r' : 'rounded-r-lg border-r',
    inputClassName,
    leftIcon && 'pl-10',
    (rightIcon && isLoading) ? 'pr-20' : (rightIcon || isLoading ? 'pr-10' : ''),
    hideStepper && textInputStyle.hideStepper,
  ]);

  const iconClassNameCalculated = clsx([
    'border overflow-hidden items-center',
    commonClasses,
  ]);

  const innerIconClassNameCalculated = 'absolute top-1/2 -translate-y-1/2 text-color pointer-events-none';
  const postPrefixClassName = 'dark:bg-background-darken-3 bg-background-lighten-1 shrink-0 flex';

  return (
    <div
      className={mcs([
        'text-input',
        className,
        (isDisabled || isLoading) && 'opacity-70',
      ])}
      style={style}
    >
      {!hideLabel && label && (
        <Label
          htmlFor={inputID}
          isRequired={isRequired}
          children={label}
          sidebar={(showLimit && typeof value !== 'number') && (
          <span className="text-input-char-limit opacity-80 px-1">
            {(value as string)?.length}
            /
            {charLimit}
          </span>
          )}
        />
      )}
      <div className="relative group flex justify-between">
        {prefixRenderer && (
          <div
            className={mcs([
              iconClassNameCalculated,
              prefixClassName,
              postPrefixClassName,
              'left-0 rounded-tl-lg rounded-bl-lg shrink-0',
            ])}
          >
            {prefixRenderer}
          </div>
        )}
        <div className="relative flex flex-grow">
          {leftIcon && (
          <div className={clsx(['left-3', innerIconClassNameCalculated])}>
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
            <div className={clsx(['right-3 flex gap-3 items-center', innerIconClassNameCalculated])}>
              {isLoading && <Spinner size="md" />}
              {rightIcon && <Icon icon={rightIcon} size={18} />}
            </div>
          )}
        </div>
        {postfixRenderer && (
          <div
            className={mcs([
              iconClassNameCalculated,
              postfixClassName,
              postPrefixClassName,
              'right-0 rounded-tr-lg rounded-br-lg',
            ])}
          >
            {postfixRenderer}
          </div>
        )}
      </div>
      {errorText && <div className="text-red-400 mt-1">{errorText}</div>}
      {description && <div className="mt-2 opacity-75 text-sm">{description}</div>}
    </div>
  );

};

export default TextInput;
