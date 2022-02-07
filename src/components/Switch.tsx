import React, { useEffect, useRef } from 'react';
import styled from "@emotion/styled";
import { nanoid } from "nanoid";
import { useTheme } from "@emotion/react";

const StyledLabel = styled.label`
  font-size: 20px;
  background: #BDB9A6;

  &.bg-primary { background: ${({ theme }) => theme.primary}; }
  &.bg-secondary { background: ${({ theme }) => theme.secondary}; }

  .border-primary { border-color: ${({ theme }) => theme.primary}; }
  .border-secondary { border-color: ${({ theme }) => theme.secondary}; }

  input:checked + div {
    transform: translate3d(100%, 0, 0);
  }
`

type SwitchProps = {
    value: boolean,
    onChange: (v: boolean) => void,
    size?: number,
    label?: string,
    required?: boolean,
    variant?: 'success' | 'primary' | 'secondary' | 'danger' | 'warning',
    disabled?: boolean
}

const Switch = ({ value, onChange, size = 24, label, required, variant = 'success', disabled = false }: SwitchProps) => {

    const { color } = useTheme();
    const checkbox = useRef(null);
    const inputID = `switch-input-${nanoid()}`;

    useEffect(() => {
        checkbox.current.checked = value;
    }, [value]);

    const getSelectionColor = () => {
        switch (variant) {
            case "primary": return 'primary';
            case "secondary": return 'secondary';
            case "success": return 'green-500';
            case "warning": return 'yellow-400';
            case "danger": return 'red-500';
        }
    }

    return (
        <div className="w-full flex flex-col">
            {label && (
                <label className="block text-lg opacity-80 mb-1" htmlFor={inputID} aria-hidden={false} style={{ color }}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <StyledLabel
                className={`inline-block rounded-full shadow-inner bg-${value && getSelectionColor()} ${disabled && 'cursor-not-allowed'}`}
                htmlFor={inputID}
                style={{ height: size, width: size * 2 }}
            >
                <input
                    id={inputID}
                    ref={checkbox}
                    type="checkbox"
                    disabled={disabled}
                    className="absolute opacity-0"
                    onChange={({ target }) => onChange(target.checked)}
                />
                <div
                    className={`rounded-full bg-white transition shadow-md border border-${value && getSelectionColor()}`}
                    style={{ height: size, width: size }}
                />
            </StyledLabel>
        </div>
    );
};

export default Switch;