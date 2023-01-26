import React from 'react';
import clsx from 'clsx';

import Radio, { RadioOptionType } from './Radio';

type RadioColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type RadioGroupType = {
  onChange: (value: string) => void,
  value: RadioOptionType | string,
  options: RadioOptionType[],
  color?: RadioColor, 
  size?: RadioSize, 
  isDisabled?: boolean,
  alignment?: 'horizontal' | 'vertical',
};

const colors = {
  'primary': 'dsr-bg-primary',
  'secondary': 'dsr-bg-secondary',
  'success': 'dsr-bg-green-500',
  'danger': 'dsr-bg-red-500',
  'warning': 'dsr-bg-yellow-400',
  'default': 'dsr-bg-gray-500/70',
};

const sizes = {
  'xs': { button: 'dsr-h-2 dsr-w-2', label: 'dsr-text-xs' },
  'sm': { button: 'dsr-h-3 dsr-w-3', label: 'dsr-text-sm' },
  'md': { button: 'dsr-h-4 dsr-w-4', label: 'dsr-text-md' },
  'lg': { button: 'dsr-h-5 dsr-w-5', label: 'dsr-text-lg' },
  'xl': { button: 'dsr-h-6 dsr-w-6', label: 'dsr-text-xl' },
};

const RadioGroup = ({ onChange, value, options, color = 'primary', size = 'md', isDisabled = false, alignment = 'vertical' }: RadioGroupType) => {

  return (
      <div
          className={clsx([
            'dsr-flex', alignment === 'vertical' ? 'dsr-flex-col dsr-gap-y-4' : 'dsr-flex-row dsr-gap-x-8',
          ])}
      >
          {options.map((option, index) => (
              <Radio
                  key={index}
                  option={option}
                  selected={value === option.value}
                  color={colors[color]}
                  size={sizes[size]}
                  onChange={() => onChange(option.value)}
                  isDisabled={isDisabled}
              />
          ))}
      </div>
  );
};

export default RadioGroup;