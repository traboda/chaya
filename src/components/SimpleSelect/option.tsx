import React, { ChangeEvent, MouseEvent } from 'react';
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
  const onClick = (event: MouseEvent | ChangeEvent) => {
    if (isMulti) event.stopPropagation();
    onSelect(isSelected && !isMulti ? (isClearable ? null : value) : value);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={clsx([
        'dsr-flex dsr-w-full dsr-px-3 dsr-py-1.5 dsr-transition hover:dsr-bg-black/10 hover:dark:dsr-bg-white/10',
        'dsr-justify-between dsr-items-center dsr-cursor-pointer dsr-text-left simple-select-option',
        isSelected && !isMulti && 'dsr-bg-black/20 dark:dsr-bg-white/20 dsr-font-semibold',
        className,
      ])}
    >
      <span className="dsr-flex dsr-items-center dsr-gap-2">
        {isMulti && (
          <Checkbox
            onClick={event => event.stopPropagation()}
            value={(value ?? '').toString()}
            label=""
            isChecked={isSelected}
            onChange={onClick}
          />
        )}
        <span className="dsr-block">{label}</span>
      </span>
      {isSelected && isClearable && (
        <Icon icon="times" size={16} />
      )}
    </button>
  );
};

export default SimpleSelectOption;