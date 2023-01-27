import React from 'react';
import clsx from 'clsx';

import Checkbox, { CheckboxColor, CheckboxOptionType, CheckboxSize } from './Checkbox';


type CheckboxGroupType = {
  onChange: (values: string[]) => void,
  value: string[],
  options: CheckboxOptionType[],
  color?: CheckboxColor,
  size?: CheckboxSize,
  isDisabled?: boolean,
  alignment?: 'horizontal' | 'vertical',
};

const CheckboxGroup = ({
  onChange, value, options, color = 'primary', size = 'md',
  isDisabled = false, alignment = 'vertical',
}: CheckboxGroupType) => {

  return (
      <div
          className={clsx([
            'dsr-flex', alignment === 'vertical' ? 'dsr-flex-col dsr-gap-y-4' : 'dsr-flex-row dsr-gap-x-8',
          ])}
      >
          {options.map((option, index) => (
              <Checkbox
                  key={index}
                  option={option}
                  checked={value.includes(option.value)}
                  color={color}
                  size={size}
                  onChange={() => {
                    onChange(value.includes(option.value) ?
                      value.filter(value => value !== option.value) :
                      [...value, option.value]);
                  }}
                  isDisabled={isDisabled}
              />
          ))}
      </div>
  );
};

export default CheckboxGroup;