import React from 'react';
import clsx from 'clsx';

import Checkbox, { CheckboxColor, CheckboxSize } from './Checkbox';
import Label from './Label';

export type CheckboxGroupType<Type> = {
  value: Type[],
  options: {
    value: Type,
    label: string
  }[],
  onChange?: (values: Type[]) => void,
  color?: CheckboxColor,
  size?: CheckboxSize,
  isDisabled?: boolean,
  id?: string,
  alignment?: 'horizontal' | 'vertical',
  isRequired?: boolean,
  label?: string,
  optionClassName?: string
};

const CheckboxGroup = <Type extends string | number>({
  value, options, onChange = () => {}, color = 'primary', size = 'md', isDisabled = false, alignment = 'vertical',
  isRequired = false, label, optionClassName, id,
}: CheckboxGroupType<Type>) => (
  <React.Fragment>
    {label && (
    <Label
      htmlFor={id}
      className={isDisabled ? 'dsr-opacity-70' : ''}
      children={label}
      isRequired={isRequired}
    />
    )}
    <div
      id={id}
      className={clsx([
        'checkbox-group dsr-flex',
        alignment === 'vertical' ? 'dsr-flex-col dsr-gap-2' : 'dsr-flex-row dsr-flex-wrap dsr-gap-4',
      ])}
    >
      {options?.length > 0 && options.map((option, index) => (
        <Checkbox
          className={optionClassName}
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
  </React.Fragment>
  );

export default CheckboxGroup;