import React from 'react';
import { nanoid } from 'nanoid';
import styled from "@emotion/styled";
import Color from 'color';
import { useTheme } from "@emotion/react";

const StyledSelect = styled.select`
  color: ${({ theme }) => theme.color};
  border: 2px solid hsla(0, 0%, 40%, .7);
  background: ${({ theme }) => theme.background } url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='${({ theme }) => Color(theme.color || theme.isDarkTheme ? '#fff' : '#000').rgb().string()}' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat calc(100% - 0.75rem) center;
  padding: 0.5rem;
  &:hover {
    border-color: hsla(0, 0%, 80%, .8);
  }

  &:focus {
    outline: none !important;
    border: 2px solid ${({ theme }) => theme.secondary}
  }
  
  option {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
  }
`;

type OptionType = {
    value: (string|number),
    label: (string|number)
};

type GroupType = {
    group: string,
    options: OptionType[]
};

export type SimpleSelectOptionType = Array<OptionType | GroupType>;

export type SimpleSelectProps = {
    value: string,
    name: string,
    options: SimpleSelectOptionType,
    onChange?: (v: string) => void,
    required?: boolean,
    labels?: {
        label?: string,
        placeholder?: string
    }
}

const defaultLabels = {
    label: null,
    placeholder: 'Select an Option'
};

const SimpleSelect = ({
  value = null, onChange = () => {},
  required = false, name, options, labels: _labels
}: SimpleSelectProps) => {

    const { color } = useTheme();
    const labels = { ...defaultLabels, ..._labels };
    const inputID = `${name}-input-${nanoid()}`;

    return (
        <div className="w-full">
            {labels?.label?.length > 0 && (
                <label
                    id={`${inputID}-label`}
                    className="block text-lg opacity-80 mb-1"
                    htmlFor={inputID}
                    aria-hidden={false}
                    style={{ color }}
                >
                    {labels?.label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
            )}
            <div className="w-full">
                <StyledSelect
                    className="w-full text-lg rounded-lg appearance-none"
                    name={name}
                    id={inputID}
                    aria-labelledby={`${inputID}-label`}
                    value={value}
                    required={required}
                    onChange={({ target }) => onChange(target.value)}
                >
                    <option
                        selected={value === null}
                        disabled={required}
                        value={null}
                    >
                        {labels?.placeholder}
                    </option>
                    {options?.length > 0 &&
                    options.map((option) =>
                        (option as GroupType)?.group ? (
                            <optgroup label={(option as GroupType).group}>
                                {(option as GroupType).options.map((opt: OptionType) => (
                                    <option
                                        key={opt.value}
                                        value={opt.value}
                                        selected={value === opt.value}
                                    >
                                        {opt.label}
                                    </option>
                                ))}
                            </optgroup>
                        ) : (
                        <option
                            value={(option as OptionType).value}
                            key={(option as OptionType).value}
                            selected={value === (option as OptionType).value}
                        >
                            {(option as OptionType).label}
                        </option>
                    ))}
                </StyledSelect>
            </div>
        </div>
    );
};

export default SimpleSelect;