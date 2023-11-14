import React, { ChangeEvent, MouseEvent } from 'react';

import { IconInputType } from '../Icon';
import ListViewItem from '../ListView/item';

import { SimpleSelectValue } from './index';

export type SimpleSelectOptionProps = {

  value: SimpleSelectValue,
  label: string,
  icon?: IconInputType,
  iconRenderer?: React.ReactNode,
  onSelect?: (v: SimpleSelectValue) => void,
  className?: string,
  isSelected?: boolean,
  isDisabled?: boolean,
  isMulti?: boolean
  isHighlighted?: boolean,
};

const SimpleSelectOption = ({
  value, label, onSelect = () => {}, isSelected, className = '', icon, iconRenderer,
  isMulti = false, isHighlighted = false, isDisabled = false,
}: SimpleSelectOptionProps) => {
  const onClick = (event: MouseEvent | ChangeEvent) => {
    if (isMulti) event.stopPropagation();
    onSelect(value);
  };

  return (
    <ListViewItem
      role="option"
      item={{
        icon,
        iconRenderer,
        id: (value ?? '').toString(),
        title: label,
        isDisabled,
        onClick,
      }}
      isHighlighted={isHighlighted}
      className={className}
      isSelectable={isMulti}
      isSelected={isSelected}
      onSelect={onClick}
    />
  );

};

export default SimpleSelectOption;