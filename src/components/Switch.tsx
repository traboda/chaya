import React, { useRef } from 'react';
import styled from "@emotion/styled";
import { nanoid } from "nanoid";
import { useTheme } from "@emotion/react";

const SwitchContainer = styled.label`
  background: ${({ theme }) => theme.isDarkTheme ? 'rgba(237, 237, 237, 0.35)' : 'rgba(200, 200, 200, 0.5)' };
  input:checked + div {
    transform: translate3d(100%, 0, 0);
  }
`

type SwitchProps = {
    value: boolean,
    onChange?: (v: boolean) => void,
    size?: number,
    label?: string,
    required?: boolean,
    variant?: ('success' | 'primary' | 'secondary' | 'danger' | 'warning' | 'transparent'),
    disabled?: boolean
}

const variants = {
    "primary": 'bg-primary',
    "secondary": 'bg-secondary',
    "success": 'bg-green-500',
    "danger": 'bg-red-500',
    "warning": 'bg-yellow-400',
    "transparent": 'bg-inherit'
};

const Switch = ({ value, onChange = () => {}, size = 24, label, required = false, variant = 'success', disabled = false }: SwitchProps) => {

    const { color } = useTheme();
    const checkbox = useRef(null);
    const inputID = `switch-input-${nanoid()}`;

    return (
        <div className="w-full flex flex-col">
            {label && (
                <label
                    className="block text-lg opacity-80 mb-1"
                    htmlFor={inputID}
                    id={`${inputID}-label`}
                    aria-hidden={false}
                    style={{ color }}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <SwitchContainer
                className={`inline-block rounded-full shadow-inner ${value && variants[variant]} ${disabled && 'cursor-not-allowed'}`}
                style={{ height: size, width: size * 2 }}
            >
                <input
                    id={inputID}
                    ref={checkbox}
                    type="checkbox"
                    aria-labelledby={`${inputID}-label`}
                    aria-required={required}
                    aria-readonly={disabled}
                    aria-checked={value}
                    disabled={disabled}
                    className="absolute opacity-0"
                    required={required}
                    checked={value}
                    onChange={({ target }) => onChange(target.checked)}
                />
                <div
                    className={`rounded-full bg-white transition shadow-md border ${value && `border-${variants[variant]}`}`}
                    style={{ height: size, width: size }}
                />
            </SwitchContainer>
        </div>
    );
};

export default Switch;