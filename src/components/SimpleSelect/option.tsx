import React from 'react';
import clsx from 'clsx';

import Icon from '../Icon';

import { SimpleSelectValue } from './index';

export type SimpleSelectOptionProps<Type> = {
  isSelected: boolean,
  isDisabled?: boolean,
  value: Type,
  label: string | number,
  onSelect: (v: Type) => void,
  isClearable: boolean,
  className?: string,
};

const SimpleSelectOption = <Type extends SimpleSelectValue>({
  isSelected, isDisabled = false, value, label, onSelect, isClearable, className = '',
}: SimpleSelectOptionProps<Type>) => {
  return (
    <button
      onClick={() => onSelect((isSelected ? (isClearable ? null : value) : value) as Type)}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={clsx([
        'dsr-flex dsr-w-full dsr-px-3 dsr-py-1.5 dsr-transition hover:dsr-bg-black/10 hover:dark:dsr-bg-black/20 dsr-cursor-pointer',
        'dsr-justify-between dsr-items-center',
        isSelected && 'dsr-bg-black/20 dark:dsr-bg-black/30 dsr-font-semibold',
        className,
      ])}
    >
      <span>{label}</span>
      {isSelected && isClearable && (
        <Icon icon="times" size={16} />
      )}
    </button>
  );
};

export default SimpleSelectOption;