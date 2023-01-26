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
  onChange: (value: string) => void,
  option: RadioOptionType,
  color?: string,
  size?: { button: string, label: string },
  isDisabled?: boolean,
  selected?: boolean,
};

const Radio = ({ option, selected = false, onChange, color, size, isDisabled }: RadioButtonProps) => {

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
                'dsr-border-none dsr-rounded-full dsr-text-white', size?.button, selected && styled.radioButton,
                selected ? color : isDarkTheme ? 'dsr-bg-white/20' : 'dsr-bg-gray-500/20',
              ])}
          />
          <span className={clsx(['dsr-ml-2', size?.label && `dsr-text-${size?.label}`])}>{option.label}</span>
      </div>
  );
};

export default Radio;