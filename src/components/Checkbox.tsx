import React, { useContext } from 'react';
import clsx from 'clsx';

import DSRContext from '../contexts/DSRContext';

export type CheckboxOptionType = {
  label: string,
  value: string,
  disabled?: boolean,
};

type CheckboxButtonProps = {
  onChange: (value: any) => void,
  option: CheckboxOptionType,
  checked?: boolean,
  color?: string,
  size?: { button: string, label: string },
  isDisabled?: boolean,
  spacing?: string,
};

const Checkbox = ({ option, checked = false, onChange, color, size, isDisabled }: CheckboxButtonProps) => {

  const { isDarkTheme } = useContext(DSRContext);

  return (
      <div
          className="dsr-inline-flex dsr-items-center dsr-cursor-pointer dsr-relative"
          onClick={onChange}
      >
          <input
              type="checkbox"
              name={option.value}
              value={option.value}
              checked={checked}
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
                'dsr-border-none dsr-rounded-sm', size?.button,
                checked ? color
                  : isDarkTheme ?
                    'dsr-bg-white/20' :
                    'dsr-bg-gray-500/20',
              ])}
          >
              <div
                  className={clsx([
                    'dsr-flex dsr-justify-center dsr-items-center dsr-h-full dsr-w-full dsr-p-0.5',
                    'dsr-duration-200 dsr-origin-bottom-left dsr-text-white dsr-ease-in-out dsr-transition-opacity',
                    checked ? 'dsr-opacity-100 dsr-scale-100' : 'dsr-opacity-0 dsr-scale-75',
                  ])}
              >
                  <svg
                      viewBox="0 0 12 10"
                      style={{ fill: 'none', strokeWidth: '2px', stroke: 'currentcolor', strokeDasharray: '16px' }}
                      className={clsx([
                        checked && 'dsr-scale-100',
                        'dsr-duration-400 dsr-origin-bottom-left dsr-ease-out dsr-transition dsr-transform',
                      ])}
                  >
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg>
              </div>
          </span>
          <span className={clsx([ 'dsr-ml-2', size?.label ])}>{ option.label }</span>
      </div>
  );
};

export default Checkbox;