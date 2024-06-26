'use client';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { cva } from '../../utils/cva';
import {
  colorVariantMapper, ChayaColorType,
  EMPTY_COLOR_MAP, SOLID_BG_COLOR_MAP, BORDER_COLOR_MAP,
} from '../../utils/classMaps/colors';

import VerticalNavigatorItem, { VerticalNavigatorItemType, VerticalNavigatorVariantType } from './Item';


export type VerticalNavigatorProps = {
  items: VerticalNavigatorItemType[],
  variant?: VerticalNavigatorVariantType,
  color?: ChayaColorType,
  activeItem?: string | null,
  className?: string,
  itemClassName?: string,
  isCollapsed?: boolean,
  id?: string,
  role?: string,
  itemRole?: string,
  onClickItem?: (key: string, item: VerticalNavigatorItemType) => void,
};

const activeMarkerClassNames = cva({
  base: 'vertical-navigator-active-marker transition-all ease-in-out absolute top-0 left-0',
  variants: {
    variant: {
      pill: 'shadow-lg z-[5] rounded-lg',
      boxed: 'shadow-lg z-[5] rounded-lg',
      line: 'border-2 z-[10]',
    },
    color: EMPTY_COLOR_MAP,
  },
  compoundVariants: [
    ...colorVariantMapper<VerticalNavigatorVariantType>([SOLID_BG_COLOR_MAP], 'pill'),
    ...colorVariantMapper<VerticalNavigatorVariantType>([SOLID_BG_COLOR_MAP], 'boxed'),
    ...colorVariantMapper<VerticalNavigatorVariantType>([BORDER_COLOR_MAP], 'line'),
    {
      variant: 'line',
      color: 'white',
      className: 'border-white',
    },
  ],
});

const VerticalNavigator = ({
  items, className, itemClassName, variant = 'pill', color = 'primary', role = 'tablist', itemRole, id, isCollapsed, activeItem, onClickItem = () => {},
}: VerticalNavigatorProps) => {

  const wrapperRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    width: number | null,
    height: number | null,
    translateX: number | null,
    translateY: number | null,
  }>(({ width: null, height: null, translateX: null, translateY: null }));

  const updateIndicator = () => {
    if (wrapperRef.current) {
      const tab = wrapperRef.current.querySelector('.active');
      if (tab) {
        const { height, top, left, width } = tab.getBoundingClientRect();
        const { top: containerTop, left: containerLeft } = wrapperRef.current.getBoundingClientRect();
        setIndicatorStyle({
          height,
          translateY: (top - containerTop),
          translateX: variant == 'line' ? null : (left - containerLeft),
          width: variant == 'line' ? 0 : width,
        });
      } else {
        setIndicatorStyle({
          height: null,
          translateY: null,
          translateX: null,
          width: null,
        });
      }
    }
  };

  useEffect(() => {
    if (activeItem) {
      updateIndicator();
    }
  }, [activeItem]);

  const listRenderer = (
    <ul
      id={id}
      ref={wrapperRef}
      role={role}
      aria-orientation="vertical"
      className={clsx([
        'flex flex-col gap-1 items-center overflow-hidden transition-all w-full',
        className,
      ])}
      style={{ width: isCollapsed ? 50 : undefined }}
    >
      {items.filter((item) => !item.isHidden).map(item => (
        <VerticalNavigatorItem
          key={item.key}
          item={item}
          variant={variant}
          color={color}
          role={itemRole ?? 'presentation'}
          className={itemClassName}
          activeItem={activeItem}
          isCollapsed={isCollapsed}
          defaultExpansion={!!item.items?.find(item => item.key === activeItem)}
          onChangeExpansion={updateIndicator}
          onClickItem={onClickItem}
        />
      ))}
    </ul>
  );

  return (
    <div
      className={clsx([
        variant === 'boxed' && 'bg-neutral-400/20 dark:bg-neutral-600/20 rounded-lg p-1.5',
      ])}
    >
      <div className="relative">
        {listRenderer}
        {(
          (indicatorStyle?.width || indicatorStyle?.height) &&
          (
            ((variant === 'pill' || variant === 'boxed') &&
              items.some((item) =>
                item.key === activeItem || item.items?.some((subItem) => subItem.key === activeItem),
              )
            ) ||
            (variant === 'line' && items.some((item) => item.key === activeItem))
          )
        ) && (
          <div
            className={activeMarkerClassNames({ variant, color: color })}
            style={{
              transform: `${indicatorStyle?.translateY ? `translateY(${indicatorStyle?.translateY}px)` : ''} ${indicatorStyle?.translateX ? `translateX(${indicatorStyle?.translateX}px)` : ''}`,
              width: indicatorStyle?.width || 0,
              height: indicatorStyle?.height || 0,
            }}
          />
        )}
      </div>
    </div>
  );

};

export default VerticalNavigator;