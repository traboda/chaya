import React from 'react';
import clsx from 'clsx';

import Checkbox, { CheckboxColor, CheckboxSize } from './Checkbox';

type CheckboxGroupType = {
  value: string[],
  options: {
    value: string,
    label: string
  }[],
  onChange?: (values: string[]) => void,
  color?: CheckboxColor,
  size?: CheckboxSize,
  isDisabled?: boolean,
  alignment?: 'horizontal' | 'vertical',
};

const CheckboxGroup = ({
  value, options, onChange = () => {}, color = 'primary', size = 'md', isDisabled = false, alignment = 'vertical',
}: CheckboxGroupType) => (
    <div
        className={clsx([
          'checkbox-group dsr-flex',
          alignment === 'vertical' ? 'dsr-flex-col dsr-gap-2' : 'dsr-flex-row dsr-flex-wrap dsr-gap-2',
        ])}
    >
        {options.map((option, index) => (
            <Checkbox
                key={index}
                value={option.value}
                label={option.label}
                isChecked={value.includes(option.value)}
                isDisabled={isDisabled}
                color={color}
                size={size}
                onChange={() => {
                  onChange(value.includes(option.value) ?
                    value.filter(value => value !== option.value) :
                    [...value, option.value]);
                }}
            />
        ))}
    </div>
);


export default CheckboxGroup;