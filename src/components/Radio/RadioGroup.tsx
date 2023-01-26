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
  'xs': 'dsr-h-2 dsr-w-2',
  'sm': 'dsr-h-3 dsr-w-3',
  'md': 'dsr-h-4 dsr-w-4',
  'lg': 'dsr-h-5 dsr-w-5',
  'xl': 'dsr-h-6 dsr-w-6',
};

const RadioGroup = ({ onChange, value, options, color = 'primary', size = 'md', isDisabled = false, alignment = 'vertical' }: RadioGroupType) => {

  return (
      <div className={clsx([ 'dsr-flex', alignment === 'vertical' ? 'dsr-flex-col' : 'dsr-flex-row'])}>
          {options.map((option, index) => (
              <Radio
                  key={index}
                  option={option}
                  value={value}
                  color={colors[color]}
                  size={{
                    button: sizes[size],
                    label: size,
                  }}
                  spacing={alignment === 'vertical' ? 'dsr-my-2' : 'dsr-mx-4'}
                  onChange={onChange}
                  isDisabled={isDisabled}
              />
          ))}
      </div>
  );
};

export default RadioGroup;