import React, { useContext } from 'react';
import clsx from 'clsx';

import DSRContext from '../../contexts/DSRContext';

import styled from './radio.module.scss';

export type RadioOptionType = {
  label: string,
  value: string,
  disabled?: boolean,
};

type RadioButtonProps = {
  onChange: (value: any) => void,
  option: RadioOptionType,
  value: RadioOptionType | string,
  color?: string,
  size?: { button: string, label: string },
  isDisabled?: boolean,
  spacing?: string,
};

const Radio = ({ option, value, onChange, color, size, isDisabled, spacing }: RadioButtonProps) => {

  const { isDarkTheme } = useContext(DSRContext);
  const isChecked = typeof value === 'string' ? value === option.value : value.value === option.value;

  return (
      <div
          className={clsx([ 'dsr-inline-flex dsr-items-center dsr-cursor-pointer dsr-relative', spacing ])}
          onClick={() => onChange(option.value)}
      >
          <input
              type="radio"
              name={option.value}
              value={option.value}
              checked={isChecked}
              disabled={isDisabled || option.disabled}
              className={clsx([
                'dsr-border-0 dsr-border-none dsr-h-px dsr-w-px dsr-p-0 dsr-whitespace-nowrap',
                'dsr-overflow-hidden dsr-absolute -dsr-m-1',
              ])}
              style={{ clip: 'rect(0px, 0px, 0px, 0px)' }}
          />
          <span
              className={clsx([
                'dsr-inline-flex dsr-items-center dsr-justify-center dsr-flex-shrink-0',
                'dsr-transition-shadow dsr-duration-normal dsr-border dsr-border-2 dsr-border-none dsr-rounded-full',
                'dsr-border-inherit dsr-text-white', size?.button, isChecked && styled.radioButton,
                isChecked ? color : isDarkTheme ? 'dsr-bg-white/20' : 'dsr-bg-gray-500/20',
              ])}
          />
          <span className={clsx(['dsr-ml-2', size?.label && `dsr-text-${size?.label}`])}>{option.label}</span>
      </div>
  );
};

export default Radio;