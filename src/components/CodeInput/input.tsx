import React from 'react';
import styled from '@emotion/styled';

type OTPInputWrapProps = {
    hasError: boolean
};

const OTPInput = styled.input<OTPInputWrapProps>`
  background: rgba(0, 0, 0, .1);
  text-align: center;
  border: 0;
  border-radius: 7px;
  color: ${({ theme }) => theme.color};
  font-size: calc(1.5rem + 0.75vw);
  width: 100% !important;
  padding: 0.5rem;
  outline: ${({ hasError }) => hasError ? '2px solid red' : null};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.secondary};
  }
`;

const CodeInputText = ({ value, onKeyDown, placeholder, hasError }) => {
    return (
        <OTPInput
            type="text"
            value={value}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            hasError={hasError}
        />
    );
};

export default CodeInputText;