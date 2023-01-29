import React from 'react';
import clsx from 'clsx';

import Radio, { RadioColor, RadioOptionType, RadioSize } from './Radio';

export type RadioGroupType = {
  onChange: (value: string) => void,
  value: RadioOptionType | string,
  options: RadioOptionType[],
  color?: RadioColor, 
  size?: RadioSize, 
  isDisabled?: boolean,
  alignment?: 'horizontal' | 'vertical',
};

const RadioGroup = ({ onChange, value, options, color = 'primary', size = 'md', isDisabled = false, alignment = 'vertical' }: RadioGroupType) => {

  return (
      <div
          className={clsx([
            'radio-group dsr-flex',
            alignment === 'vertical' ? 'dsr-flex-col dsr-gap-y-4' : 'dsr-flex-row dsr-gap-x-8',
          ])}
      >
          {options.map((option, index) => (
              <Radio
                  key={index}
                  option={option}
                  selected={value === option.value}
                  color={color}
                  size={size}
                  onChange={() => onChange(option.value)}
                  isDisabled={isDisabled}
              />
          ))}
      </div>
  );
};

export default RadioGroup;