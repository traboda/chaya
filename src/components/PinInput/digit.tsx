import React from 'react';
import styled from '@emotion/styled';

type OTPInputWrapProps = {
    isInvalid: boolean,
    isDisabled: boolean,
};

const OTPInput = styled.input<OTPInputWrapProps>`
  background: ${({ theme }) => theme.isDarkTheme ? 'hsla(0, 0%, 90%, 0.15)' : 'hsla(0, 0%, -20%, 0.05)' };
  border: 0;
  color: ${({ theme }) => theme.color};
  outline: 2px solid ${({ isInvalid }) => isInvalid ? 'red' : 'hsla(0, 0%, 40%, .7)'};

  &:focus {
    outline-color: ${({ theme, isDisabled }) => !isDisabled ? `${theme.secondary}` : 'hsla(0, 0%, 40%, .7)'};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

const PinDigit = ({
  type = 'text', id, ariaLabelledBy, mask, value, onChange,
  onKeyDown, placeholder, invalid, disabled, required, className
}) => (
    <OTPInput
        id={id}
        autoComplete="off"
        aria-labelledby={ariaLabelledBy}
        className={`text-lg p-2 text-center rounded-lg w-full ${className}`}
        type={mask ? "password" : type}
        inputMode={type === 'number' ? 'numeric' : 'text'}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        onKeyDown={(e) => !disabled ? onKeyDown(e) : null}
        placeholder={placeholder}
        isInvalid={invalid}
        isDisabled={disabled}
        required={required}
    />
);

export default PinDigit;
