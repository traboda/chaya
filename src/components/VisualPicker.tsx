import React, { useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import useColors, { ChayaColorType } from '../hooks/useColors';

import Label from './Label';
import Icon, { IconInputType } from './Icon';

type VisualPickerValueType = string | number;

export type VisualPickerProps<Type> = {
  items: {
    icon?: IconInputType,
    title?: string,
    description?: string,
    value: VisualPickerValueType,
    isDisabled?: boolean
  }[],
  isVertical?: boolean,
  isMulti?: boolean,
  label?: string,
  className?: string,
  value: Type,
  onChange: (value: Type) => void,
  id?: string,
  itemClassName?: string,
  isRequired?: boolean,
  isDisabled?: boolean,
  fitHorizontal?: boolean,
  color?: ChayaColorType,
  colMinWidth?: number
};

const VisualPicker = <Type extends VisualPickerValueType | VisualPickerValueType[]>({
  items, isVertical, className, value, label, onChange, id, itemClassName, isRequired = false,
  isDisabled = false, fitHorizontal = true, color = 'primary', isMulti = false, colMinWidth = 200,
}: VisualPickerProps<Type>) => {
  const generatedID = useMemo(() => id ?? `vp-${nanoid()}`, [id]);

  const { backgroundColor, textColor } = useColors('solid', color);

  const onSelect = (item: VisualPickerValueType) => {
    if (isMulti && Array.isArray(value)) {
      if (value.includes(item)) onChange(value.filter(v => v !== item) as Type);
      else onChange([...value, item] as Type);
    } else onChange(item as Type);
  };

  const isSelected = (val: VisualPickerValueType) =>
    isMulti && Array.isArray(value) ? value.includes(val) : value === val;

  useEffect(() => {
    if (isMulti && !Array.isArray(value)) throw new Error('VisualPicker: value must be an array when isMulti is true');
  }, []);

  return (
    <div className="dsr-w-full" id={generatedID}>
      {label && <Label htmlFor="" isRequired={isRequired}>{label}</Label>}

      <div
        className={clsx([
          'dsr-grid dsr-w-full dsr-gap-4',
          className,
          isVertical ? 'dsr-grid-cols-1' : fitHorizontal ? 'dsr-grid-cols-flexible-fit' : 'dsr-grid-cols-flexible-fill',
        ])}
        style={{
          ['--dsr-flexible-cols-min-width' as string]: `${colMinWidth}px`,
        }}
      >
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            aria-disabled={isDisabled || item.isDisabled}
            disabled={isDisabled || item.isDisabled}
            className={clsx([
              'dsr-w-full dsr-bg-background dsr-border dsr-border-gray-500/70 dsr-rounded-lg dsr-p-4',
              'dsr-transition dsr-flex dsr-flex-col dsr-gap-2 dsr-items-center dsr-justify-center',
              !isSelected(item.value) && !(isDisabled || item.isDisabled) && 'hover:dsr-border-gray-400/80',
              isDisabled || item.isDisabled ? 'dsr-opacity-50' : '',
              itemClassName,
            ])}
            style={isSelected(item.value) ? {
              backgroundColor,
              color: textColor,
              borderColor: backgroundColor,
            } : undefined}
            onClick={() => onSelect(item.value)}
          >
            {item.icon && <Icon icon={item.icon} size={44} className={item.title || item.description ? 'dsr-mb-2' : ''} />}
            {item.title && <span className="dsr-text-2xl dsr-leading-8 dsr-font-semibold">{item.title}</span>}
            {item.description && <span className="dsr-text-base dsr-leading-5">{item.description}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VisualPicker;