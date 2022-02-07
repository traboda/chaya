import React from 'react';
import styled from '@emotion/styled';

type OTPInputWrapProps = {
    isInvalid: boolean,
    isDisabled: boolean,
};

const OTPInput = styled.input<OTPInputWrapProps>`
  background: ${({ theme }) => theme.isDarkTheme ? 'rgba(237, 237, 237, 0.1)' : 'rgba(237, 237, 237, 0.75)' };
  border: 0;
  color: ${({ theme }) => theme.color};
  outline: ${({ isInvalid }) => isInvalid ? '2px solid red' : null};

  &:focus {
    outline: ${({ theme, isDisabled }) => !isDisabled ? `2px solid ${theme.secondary}` : 'none'};
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

const PinDigit = ({ type = 'text', value, onKeyDown, placeholder, isInvalid, isDisabled, className }) => (
    <OTPInput
        className={`text-lg p-2 text-center rounded-lg w-full ${className}`}
        type={type}
        value={value}
        onKeyDown={(e) => !isDisabled ? onKeyDown(e) : null}
        placeholder={placeholder}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
    />
);

export default PinDigit;