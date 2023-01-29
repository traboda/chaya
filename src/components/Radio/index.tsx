import React, { useContext } from 'react';
import clsx from 'clsx';

import DSRContext from '../../contexts/DSRContext';

import styled from './radio.module.scss';

export type RadioOptionType = {
  label: string,
  value: string,
  disabled?: boolean,
};

export type RadioColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default';
export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type RadioButtonProps = {
  onChange: (value: string) => void,
  option: RadioOptionType,
  color?: RadioColor,
  size?: RadioSize,
  isDisabled?: boolean,
  selected?: boolean,
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

const Radio = ({ option, selected = false, onChange, color = 'primary', size = 'md', isDisabled }: RadioButtonProps) => {

  const { isDarkTheme } = useContext(DSRContext);

  return (
      <div
          className="dsr-inline-flex dsr-items-center dsr-cursor-pointer dsr-relative"
          onClick={() => onChange(option.value)}
      >
          <input
              type="radio"
              name={option.value}
              value={option.value}
              checked={selected}
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
                'dsr-border-none dsr-rounded-full dsr-text-white',
                sizes[size]?.button,
                selected ? styled.radioButton : '',
                selected ? colors[color] : isDarkTheme ? 'dsr-bg-white/20' : 'dsr-bg-gray-500/20',
              ])}
          />
          <span className={clsx([ 'dsr-ml-2', sizes[size]?.label ])}>{ option.label }</span>
      </div>
  );
};

export default Radio;