import React from 'react';
import clsx from 'clsx';

import Icon from '../Icon';
import Checkbox from '../Checkbox';

import { SimpleSelectValue } from './index';

export type SimpleSelectOptionProps = {
  isSelected: boolean,
  isDisabled?: boolean,
  value: SimpleSelectValue,
  label: string | number,
  onSelect: (v: SimpleSelectValue) => void,
  isClearable: boolean,
  className?: string,
  isMulti: boolean
};

const SimpleSelectOption = ({
  isSelected, isDisabled = false, value, label, onSelect, isClearable, className = '', isMulti,
}: SimpleSelectOptionProps) => {
  return (
    <button
      onClick={() => onSelect((isSelected && !isMulti ? (isClearable ? null : value) : value))}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={clsx([
        'dsr-flex dsr-w-full dsr-px-3 dsr-py-1.5 dsr-transition hover:dsr-bg-black/10 hover:dark:dsr-bg-black/20 dsr-cursor-pointer',
        'dsr-justify-between dsr-items-center',
        isSelected && !isMulti && 'dsr-bg-black/20 dark:dsr-bg-black/30 dsr-font-semibold',
        className,
      ])}
    >
      <span className="flex items-center gap-2">
        {isMulti && (
          <Checkbox value={(value ?? '').toString()} label="" isChecked={isSelected} />
        )}
        <span>{label}</span>
      </span>
      {isSelected && isClearable && (
        <Icon icon="times" size={16} />
      )}
    </button>
  );
};

export default SimpleSelectOption;