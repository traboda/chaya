import React from 'react';
import { nanoid } from 'nanoid';
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

const StyledSelect = styled.select`
  border: 2px solid hsla(0, 0%, 40%, .7);
  background: ${({ theme }) => theme.background} url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='${({ theme }) => theme.color}' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat calc(100% - 0.75rem) center;

  &:hover {
    border-color: hsla(0, 0%, 80%, .8);
  }

  &:focus {
    outline: none !important;
    border: 2px solid ${({ theme }) => theme.secondary}
  }
`;

type SimpleSelectProps = {
    value: string,
    name: string,
    onChange?: (v: string) => void,
    label?: string,
    required?: boolean,
    placeholder?: string,
    options: {
        value: any,
        label: any
    }[]
}

const SimpleSelect = ({
  label = null, value, onChange = () => {},
  required = false, name, options, placeholder = 'Select an option'
}: SimpleSelectProps) => {

    const { background, color } = useTheme();

    const inputID = `${name}-input-${nanoid()}`;

    return (
        <div className="w-full" style={{ color }}>
            {(label || required) && (
                <label className="block text-lg opacity-80 mb-2" htmlFor={inputID} aria-hidden={false}>
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}

            <div className="w-full">
                <StyledSelect
                    className="w-full p-3 rounded-lg appearance-none"
                    name={name}
                    id={inputID}
                    value={value}
                    onChange={({ target }) => onChange(target.value)}
                >
                    <option className="py-2" value={null} style={{ background, color }}>{placeholder}</option>
                    {options.map(option => (
                        <option
                            className="py-2"
                            value={option.value}
                            key={option.value}
                            selected={value === option.value}
                            style={{ background, color }}
                        >
                            {option.label}
                        </option>
                    ))}
                </StyledSelect>
            </div>
        </div>
    );
};

export default SimpleSelect;