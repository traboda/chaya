import React, { ChangeEvent, MouseEvent } from 'react';
import clsx from 'clsx';

import Icon, { IconInputType } from '../Icon';
import Checkbox from '../Checkbox';

import { SimpleSelectValue } from './index';

export type SimpleSelectOptionProps = {

  value: SimpleSelectValue,
  label: string | number,
  icon?: IconInputType,
  iconRenderer?: React.ReactNode,
  onSelect?: (v: SimpleSelectValue) => void,
  isClearable?: boolean,
  className?: string,
  isSelected?: boolean,
  isDisabled?: boolean,
  isMulti?: boolean
  isHighlighted?: boolean,
};

const SimpleSelectOption = ({
  value, label, onSelect = () => {}, isSelected, className = '', icon, iconRenderer,
  isMulti = false, isHighlighted = false, isDisabled = false, isClearable = false,
}: SimpleSelectOptionProps) => {
  const onClick = (event: MouseEvent | ChangeEvent) => {
    if (isMulti) event.stopPropagation();
    onSelect(isSelected && !isMulti ? (isClearable ? null : value) : value);
  };

  return (
    <li role="option">
      <button
        type="button"
        onClick={onClick}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        className={clsx([
          'dsr-flex dsr-w-full dsr-px-3 dsr-py-1.5 dsr-transition hover:dsr-bg-black/10 hover:dark:dsr-bg-white/20',
          'dsr-justify-between dsr-items-center dsr-cursor-pointer dsr-text-left simple-select-option !dsr-outline-0',
          isSelected && !isMulti && 'dsr-bg-black/20 dark:dsr-bg-white/20 dsr-font-semibold',
          isHighlighted && 'dsr-bg-black/10 dark:dsr-bg-white/10',
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
          {icon && (<Icon icon={icon} size={16} />)}
          {iconRenderer && (
            <div className="dsr-flex dsr-items-center dsr-justify-center dsr-h-full">
              <div className="dsr-w-[24px] dsr-h-[24px]">
                {iconRenderer}
              </div>
            </div>
          )}
          <span className="dsr-block">{label}</span>
        </span>
        {isSelected && isClearable && (
          <Icon icon="times" size={16} />
        )}
      </button>
    </li>

  );
};

export default SimpleSelectOption;