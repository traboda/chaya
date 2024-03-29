'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import { cva } from '../../utils/cva';
import {
  colorVariantMapper, ChayaColorType, EMPTY_COLOR_MAP, BORDER_COLOR_MAP, SOLID_BG_COLOR_MAP,
} from '../../utils/classMaps/colors';

import HorizontalNavigatorItem, { HorizontalNavigatorItemType, HorizontalNavigatorVariantType } from './item';

export type HorizontalNavigatorProps = {
  // id of the navigator
  id?: string,
  // className for the navigator
  className?: string,
  // className for each item
  itemClassName?: string,
  // items to be rendered in the navigator
  items: HorizontalNavigatorItemType[],
  // key of the active item. If null, no item will be active.
  activeItem?: string | null,
  // variant of the navigator. Can be 'pill', 'boxed' or 'line', defaults to 'pill'
  variant?: HorizontalNavigatorVariantType,
  // color of the navigator.
  color?: ChayaColorType,
  // callback when an item is clicked. Passes the key and the item as arguments.
  onClickItem?: (key: string, item: HorizontalNavigatorItemType) => void,
};

const activeMarkerClassName = cva({
  base: [
    'dsr-absolute dsr-left-0 dsr-rounded-lg',
    'dsr-transition-all dsr-ease-in-out',
  ],
  variants: {
    variant: {
      line: 'horizontal-navigator-underline dsr-border-2 dsr-w-full dsr-bottom-0',
      pill: 'horizontal-navigator-pill dsr-shadow-lg dsr-z-[500] dsr-top-0',
      boxed: 'horizontal-navigator-boxed dsr-shadow-lg dsr-z-[500] dsr-top-0',
    },
    color: EMPTY_COLOR_MAP,
  },
  compoundVariants: [
    ...colorVariantMapper<HorizontalNavigatorVariantType>([BORDER_COLOR_MAP], 'line'),
    ...colorVariantMapper<HorizontalNavigatorVariantType>([SOLID_BG_COLOR_MAP], 'pill'),
  ],
});

const HorizontalNavigator = ({
  id, items, variant = 'pill', color = 'primary',
  className, itemClassName, activeItem, onClickItem = () => {},
}: HorizontalNavigatorProps) => {

  const navigatorID = useMemo(() => id || `horizontal-navigator-${nanoid()}`, [id]);
  const tabRef = useRef<HTMLUListElement>(null);

  const [indicatorStyle, setIndicatorStyle] = useState<{
    width: number | null,
    height: number | null,
    translateX: number | null,
    translateY: number | null,
  }>(({ width: null, height: null, translateX: null, translateY: null }));

  const updateIndicator = () => {
    if (tabRef.current) {
      const tab = tabRef.current.querySelector('.active');
      if (tab) {
        const { left, width, height, top } = tab.getBoundingClientRect();
        const { left: containerLeft, top: containerTop } = tabRef.current.getBoundingClientRect();
        setIndicatorStyle({
          height: variant == 'line' ? 0 : height,
          translateX: (left - containerLeft),
          translateY: variant == 'line' ? null : (top - containerTop),
          width,
        });
      }
    }
  };

  useEffect(() => {
    if (activeItem) {
      updateIndicator();
    }
  }, [activeItem]);

  return (
    <ul
      id={navigatorID}
      role="tablist"
      aria-orientation="horizontal"
      ref={tabRef}
      className={clsx([
        'dsr-list-none tab-selector horizontal-tabs dsr-relative dsr-inline-flex',
        'dsr-items-center dsr-rounded-lg',
        (variant === 'pill' || variant === 'boxed') && 'dsr-z-[1000] dsr-gap-x-1',
        variant === 'boxed' && 'dsr-bg-neutral-400/20 dark:dsr-bg-neutral-600/20 dsr-p-1.5',
        variant === 'line' && 'dsr-gap-2',
        className,
      ])}
    >
      {items.filter((item) => !item.isHidden).map(item => (
        <HorizontalNavigatorItem
          key={item.key}
          item={item}
          activeItem={activeItem}
          navigatorID={navigatorID}
          variant={variant == 'boxed' ? 'pill' : variant}
          color={color}
          className={itemClassName}
          onClickItem={onClickItem}
        />
      ))}
      {activeItem ? (
        <div
          className={activeMarkerClassName({ variant: variant === 'boxed' ? 'pill' : variant, color: color })}
          style={{
            transform: `${indicatorStyle?.translateY ? `translateY(${indicatorStyle?.translateY}px)` : ''} ${indicatorStyle?.translateX ? `translateX(${indicatorStyle?.translateX}px)` : ''}`,
            width: indicatorStyle?.width || 0,
            height: indicatorStyle?.height || 0,
          }}
        />
      ) : null}
    </ul>
  );

};

export default HorizontalNavigator;