import React, { useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import DSRContext from '../contexts/DSRContext';
import Color from 'color';

const emptyFunc = () => {};

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
  spellCheck?: boolean,
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
  rows = 3, spellCheck, autoComplete, autoCorrect, autoCapitalize, min, max,
  inputStyle, inputClassName, type, errorText, description, postfixRenderer, prefixRenderer,
  onChange = emptyFunc, onFocus = emptyFunc, onBlur = emptyFunc, onKeyDown = emptyFunc,
}: TextInput) => {

  const { isDarkTheme, theme } = useContext(DSRContext);

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
        if (type === 'number') onChange(parseInt(value));
        else onChange(value);
      setValue(value);
    }
  };

  const handleFocus = () => {
    if (typeof onFocus === 'function') onFocus();
    setTyping(true);
  };

  const handleBlur = () => {
    if (typeof onBlur === 'function') onBlur();
    setTyping(false);
  };

  const props = {
    'aria-label': label,
    'aria-required': required,
    id: inputID,
    name,
    value,
    placeholder: placeholder || label,
    spellCheck,
    autoComplete,
    autoCorrect,
    autoCapitalize,
    min,
    max,
    autoFocus,
    required: required,
    disabled: disabled,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
  };

  const showLimit = ((typeof value !== 'number' && value?.length > 0) && isTyping && charLimit !== null && charLimit > 0);

  const inputClassNameCalculated = clsx([
    'dsr-text-lg dsr-px-2.5 dsr-py-2 dsr-block dsr-w-full dsr-bg-background',
    'dsr-text-color dsr-rounded-lg dsr-border group-hover:dsr-border-gray-400/80',
    'focus:dsr-outline-none focus:dsr-border-secondary dsr-text-base invalid:dsr-border-red-500',
    'placeholder:dsr-text-color placeholder:dsr-opacity-50',
    invalid ? 'dsr-border-red-500' : 'dsr-border-gray-500/70',
    inputClassName,
  ]);

  const iconClassNameCalculated = clsx([
    'dsr-border group-hover:dsr-border-gray-400/80 group-focus:dsr-border-secondary',
    'dsr-px-2.5 dsr-py-2 dsr-absolute dsr-top-0 dsr-right-0 dsr-h-full dsr-text-color',
    'dsr-items-center dsr-border-gray-500/70 dsr-text-base group-focus-within:dsr-border-secondary',
  ]);

  return (
      <div
          className={clsx([
            className,
            'dsr-w-full dsr-h-full dsr-overflow-hidden',
          ])}
          style={style}
      >
          {(!hideLabel) &&
          <div className="dsr-flex dsr-flex-wrap dsr-mb-1 dsr-mx-0">
              <div className={showLimit ? 'dsr-w-2/3 dsr-px-0' : 'dsr-w-full dsr-px-0'}>
                  {label &&
                  <label className="dsr-opacity-80 dsr-tracking-wide dsr-text-sm dsr-font-semibold dsr-opacity-70" htmlFor={inputID} aria-hidden={false}>
                      {label}
                      {required && <span className="dsr-ml-1 dsr-text-red-500 dsr-text-sm">*</span>}
                  </label>}
              </div>
              {(showLimit && typeof value !== 'number') && (
              <div className="dsr-w-1/3 dsr-opacity-80 dsr-px-1 dsr-flex dsr-items-end dsr-justify-end">
                  {value?.length}
                  /
                  {charLimit}
              </div>
              )}
          </div>}
          <div className="dsr-relative dsr-group">
              {prefixRenderer && (
                  <div
                      className={clsx([
                        iconClassNameCalculated,
                        'dsr-left-0 dsr-inline-flex dsr-rounded-tl-lg dsr-rounded-bl-lg dsr-max-w-[5rem]',
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
                      style={{
                        paddingLeft: prefixRenderer ? '5.5rem' : '0.5rem',
                        ...inputStyle,
                      }}
                      onKeyDown={onKeyDown}
                      {...props}
                  ></textarea>
              ) : (
                  <input
                      type={type}
                      className={inputClassNameCalculated}
                      style={{
                        paddingLeft: prefixRenderer ? '5.5rem' : '0.5rem',
                        ...inputStyle,
                      }}
                      onKeyDown={onKeyDown}
                      {...props}
                  />
              )}

              {postfixRenderer && (
                  <div
                      className={clsx([
                        iconClassNameCalculated,
                        'dsr-right-0 dsr-flex dsr-rounded-tr-lg dsr-rounded-br-lg',
                      ])}
                      style={{ background: Color(theme?.background).darken(isDarkTheme ? 0.3 : 0.1).hex() }}
                  >
                      {postfixRenderer}
                  </div>
              )}
          </div>
          {errorText &&
          <div className="text-red-400 mt-1">
              {errorText}
          </div>}
          {description &&
          <div className="mt-2" style={{ opacity: 0.75, fontSize: '10px' }}>
              {description}
          </div>}
      </div>
  );

};

export default TextInput;
