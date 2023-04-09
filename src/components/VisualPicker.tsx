import React, { ReactNode, useMemo } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import useColors, { DSRColorType } from '../hooks/useColors';

import Label from './Label';

export type VisualPickerProps<Type> = {
  items: {
    label: ReactNode,
    value: Type,
    isDisabled?: boolean
  }[],
  isVertical?: boolean,
  label?: string,
  className?: string,
  value?: Type,
  onChange?: (value: Type) => void,
  id?: string,
  itemClassName?: string,
  isRequired?: boolean,
  isDisabled?: boolean,
  fitHorizontal?: boolean,
  color?: DSRColorType
};

const VisualPicker = <Type extends string | number>({
  items, isVertical, className, value, label, onChange, id, itemClassName, isRequired = false,
  isDisabled = false, fitHorizontal = true, color = 'primary',
}: VisualPickerProps<Type>) => {
  const generatedID = useMemo(() => id ?? `vp-${nanoid()}`, [id]);

  const { backgroundColor, textColor } = useColors('solid', color);

  return (
    <div className={clsx(['dsr-w-full', className])} id={generatedID}>
      {label && <Label htmlFor="" isRequired={isRequired}>{label}</Label>}

      <div
        className={clsx([
          'dsr-grid dsr-w-full dsr-gap-4',
          isVertical ? 'dsr-grid-cols-1' : fitHorizontal ? 'dsr-grid-cols-flexible-fit' : 'dsr-grid-cols-flexible-fill',
        ])}
      >
        {items.map((item, i) => (
          <button
            key={i}
            aria-disabled={isDisabled || item.isDisabled}
            disabled={isDisabled || item.isDisabled}
            className={clsx([
              'dsr-w-full dsr-bg-background dsr-border dsr-border-gray-500/70 dsr-rounded-lg dsr-p-4',
              'dsr-transition',
              value !== item.value && !(isDisabled || item.isDisabled) && 'hover:dsr-border-gray-400/80',
              isDisabled || item.isDisabled ? 'dsr-opacity-50' : '',
              itemClassName,
            ])}
            style={value === item.value ? {
              backgroundColor,
              color: textColor,
              borderColor: backgroundColor,
            } : undefined}
            onClick={() => onChange?.(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VisualPicker;