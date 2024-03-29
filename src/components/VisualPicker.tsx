'use client';
import React, { useEffect, useMemo } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { cva } from '../utils/cva';
import {
  colorMapper, ChayaColorType,
  EMPTY_COLOR_MAP, SOLID_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP, BORDER_COLOR_MAP,
} from '../utils/classMaps/colors';
import mcs from '../utils/merge';

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

const buttonClassNames = cva({
  base: [
    'w-full rounded-lg border',
    'transition flex',
  ],
  variants: {
    direction: {
      vertical: 'items-center justify-start p-3 text-left gap-3',
      horizontal: 'flex-col gap-1 items-center justify-center px-3 py-4 min-h-[220px] text-center',
    },
    color: EMPTY_COLOR_MAP,
    variant: {
      solid: '',
    },
    state: {
      active: '',
      inactive: '',
    },
  },
  compoundVariants: [
    ...colorMapper<{ state: 'active' | 'inactive', variant: 'solid' }>([
      SOLID_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP, BORDER_COLOR_MAP,
    ], {
      state: 'active',
      variant: 'solid',
    }),
  ],
});

const VisualPicker = <Type extends VisualPickerValueType | VisualPickerValueType[]>({
  items, isVertical, className, value, label, onChange, id, itemClassName, isRequired = false,
  isDisabled = false, fitHorizontal = true, color = 'primary', isMulti = false, colMinWidth = 200,
}: VisualPickerProps<Type>) => {
  const generatedID = useMemo(() => id ?? `vp-${nanoid()}`, [id]);

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
    <div className="w-full" id={generatedID}>
      {label && <Label isRequired={isRequired}>{label}</Label>}
      <div
        className={mcs([
          'grid w-full gap-2',
          isVertical ? 'grid-cols-1' : fitHorizontal ? 'grid-cols-flexible-fit' : 'grid-cols-flexible-fill',
          className,
        ])}
        style={{
          ['--flexible-cols-min-width' as string]: `${colMinWidth}px`,
        }}
      >
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            aria-disabled={isDisabled || item.isDisabled}
            disabled={isDisabled || item.isDisabled}
            className={mcs([
              buttonClassNames({
                direction: isVertical ? 'vertical' : 'horizontal',
                color,
                variant: 'solid',
                state: isSelected(item.value) ? 'active' : 'inactive',
              }),
              !isSelected(item.value) && !(isDisabled || item.isDisabled) && 'hover:border-gray-400/80',
              isDisabled || item.isDisabled ? 'opacity-90 dark:border-neutral-500/50 border-neutral-500/10' : 'bg-background-lighten-1 dark:bg-background-lighten-2 dark:border-neutral-500/70 border-neutral-500/20',
              itemClassName,
            ])}
            onClick={() => onSelect(item.value)}
          >
            {(item.icon) && (
              <div className={item.title || item.description ? 'mb-1 text-4xl' : 'text-4xl'}>
                <Icon icon={item.icon} size={44} />
              </div>
            )}
            <div
              className={clsx([
                'flex-col gap-1',
                isVertical ? 'items-start justify-start' : 'items-center justify-center',
              ])}
            >
              {item.title && <div className="text-lg md:text-xl font-semibold leading-6">{item.title}</div>}
              {item.description && (
              <div className={clsx(['text-sm', !isVertical && 'w-[80%] mx-auto'])}>
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