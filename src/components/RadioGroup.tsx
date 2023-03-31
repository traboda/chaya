import React from 'react';
import clsx from 'clsx';

import Radio, { RadioColor, RadioSize } from './Radio';
import Label from './Label';

export type RadioGroupType = {
  onChange: (value: string) => void,
  value: string,
  options: {
    value: string,
    label: string
  }[],
  color?: RadioColor, 
  size?: RadioSize, 
  isDisabled?: boolean,
  alignment?: 'horizontal' | 'vertical',
  isRequired?: boolean,
  label?: string,
  optionClassName?: string
};

const RadioGroup = ({
  onChange, value, options, color = 'primary', size = 'md', isDisabled = false, alignment = 'vertical',
  isRequired = false, label, optionClassName,
}: RadioGroupType) => {

  return (
      <div>
          {label && (
              <Label
                  htmlFor=""
                  className={isDisabled ? 'dsr-opacity-70' : ''}
                  children={label}
                  isRequired={isRequired}
              />
          )}
          <div
              className={clsx([
                'radio-group dsr-flex',
                alignment === 'vertical' ? 'dsr-flex-col dsr-gap-2' : 'dsr-flex-row dsr-gap-4',
              ])}
          >
              {options.map((option, index) => (
                  <Radio
                      className={optionClassName}
                      key={index}
                      value={option.value}
                      label={option.label}
                      color={color}
                      size={size}
                      onChange={() => onChange(option.value)}
                      isSelected={value === option.value}
                      isDisabled={isDisabled}
                  />
              ))}
          </div>
      </div>
  );
};

export default RadioGroup;