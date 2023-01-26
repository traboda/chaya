import React from 'react';
import clsx from 'clsx';

import Checkbox, { CheckboxOptionType } from './Checkbox';

type CheckboxColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type CheckboxGroupType = {
  onChange: (values: string[]) => void,
  value: string[],
  options: CheckboxOptionType[],
  color?: CheckboxColor,
  size?: CheckboxSize,
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

const CheckboxGroup = ({ onChange, value, options, color = 'primary', size = 'md', isDisabled = false, alignment = 'vertical' }: CheckboxGroupType) => {

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
                  color={colors[color]}
                  size={{
                    button: sizes[size],
                    label: size,
                  }}
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