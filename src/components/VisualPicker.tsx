'use client';
import React, { useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import useColors, { ChayaColorType } from '../hooks/useColors';

import Label from './Label';
import Icon, { IconInputType } from './Icon';

export type VisualPickerValueType = string | number;

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
      {label && <Label isRequired={isRequired}>{label}</Label>}
      <div
        className={clsx([
          'dsr-grid dsr-w-full dsr-gap-2',
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
              'dsr-w-full dsr-rounded-lg dsr-border',
              'dsr-transition dsr-flex',
              !isSelected(item.value) && !(isDisabled || item.isDisabled) && 'hover:dsr-border-gray-400/80',
              isDisabled || item.isDisabled ? 'dsr-opacity-90 dark:dsr-border-neutral-500/50 dsr-border-neutral-500/10' : 'dsr-bg-background-lighten-1 dark:dsr-bg-background-lighten-2 dark:dsr-border-neutral-500/70 dsr-border-neutral-500/20',
              isVertical ? 'dsr-items-center dsr-justify-start dsr-p-3 dsr-text-left dsr-gap-3' : 'dsr-flex-col dsr-gap-1 dsr-items-center dsr-justify-center dsr-px-3 dsr-py-4 dsr-min-h-[220px] dsr-text-center',
              itemClassName,
            ])}
            style={isSelected(item.value) ? {
              backgroundColor,
              color: textColor,
              borderColor: backgroundColor,
            } : undefined}
            onClick={() => onSelect(item.value)}
          >
            {(item.icon) && (
              <div className={item.title || item.description ? 'dsr-mb-1 dsr-text-4xl' : 'dsr-text-4xl'}>
                <Icon icon={item.icon} size={44} />
              </div>
            )}
            <div
              className={clsx([
                'dsr-flex-col dsr-gap-1',
                isVertical ? 'dsr-items-start dsr-justify-start' : 'dsr-items-center dsr-justify-center',
              ])}
            >
              {item.title && <div className="dsr-text-lg md:dsr-text-xl dsr-font-semibold dsr-leading-6">{item.title}</div>}
              {item.description && (
              <div className={clsx(['dsr-text-sm', !isVertical && 'dsr-w-[80%] dsr-mx-auto'])}>
                {item.description}
              </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VisualPicker;