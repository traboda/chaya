import React, { useEffect, useRef } from 'react';
import styled from "@emotion/styled";
import { nanoid } from "nanoid";
import { useTheme } from "@emotion/react";

const StyledLabel = styled.label`
  display: inline-block;
  font-size: 20px;
  background: #BDB9A6;
  border-radius: 360px;
  
  input {
    position: absolute;
    opacity: 0;
  }

  div {
    border-radius: 360px;
    background: #FFF;
    box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
    transition: all 300ms;
  }

  input:checked + div {
    transform: translate3d(100%, 0, 0);
  }
`

type SwitchProps = {
    value: boolean,
    onChange: (v: boolean) => void,
    size?: number,
    label?: string,
    required?: boolean
}

const Switch = ({ value, onChange, size = 24, label, required }: SwitchProps) => {

    const { color } = useTheme();
    const checkbox = useRef(null);
    const inputID = `switch-input-${nanoid()}`;

    useEffect(() => {
        checkbox.current.checked = value;
    }, [value]);

    return (
        <div className="w-full flex flex-col">
            {label && (
                <label className="block text-lg opacity-80 mb-1" htmlFor={inputID} aria-hidden={false} style={{ color }}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <StyledLabel
                className={value && 'bg-green-500'}
                htmlFor={inputID}
                style={{ height: size, width: size * 2 }}
            >
                <input
                    id={inputID}
                    ref={checkbox}
                    type="checkbox"
                    onChange={({ target }) => onChange(target.checked)}
                />
                <div style={{ height: size, width: size }} />
            </StyledLabel>
        </div>
    );
};

export default Switch;