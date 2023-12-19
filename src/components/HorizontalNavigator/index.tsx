'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import useColors, { ChayaColorType } from '../../hooks/useColors';

import HorizontalNavigatorItem, { HorizontalNavigatorItemType } from './item';

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
  // variant of the navigator. Can be 'pill' or 'line', defaults to 'pill'
  variant?: 'pill' | 'line',
  // color of the navigator.
  color?: ChayaColorType,
  // callback when an item is clicked. Passes the key and the item as arguments.
  onClickItem?: (key: string, item: HorizontalNavigatorItemType) => void,
};

const HorizontalNavigator = ({
  id, items, variant = 'pill', color = 'primary',
  className, itemClassName, activeItem, onClickItem = () => {},
}: HorizontalNavigatorProps) => {

  const navigatorID = useMemo(() => id || `horizontal-navigator-${nanoid()}`, [id]);
  const tabRef = useRef<HTMLUListElement>(null);

  const { backgroundColor } = useColors('solid', color);

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
  
  const underlineRenderer = (
    <div
      className={clsx([
        'tab-underline dsr-transition-all dsr-ease-in-out dsr-absolute',
        'dsr-border-2 dsr-rounded-lg dsr-left-0',
        'dsr-bottom-0 dsr-w-full',
      ])}
      style={{
        transform: `${indicatorStyle?.translateY ? `translateY(${indicatorStyle?.translateY}px)` : ''} ${indicatorStyle?.translateX ? `translateX(${indicatorStyle?.translateX}px)` : ''}`,
        width: indicatorStyle?.width || 0,
        height: indicatorStyle?.height || 0,
        borderColor: backgroundColor,
      }}
    />
  );

  const highlightRenderer = (
    <div
      className={clsx([
        'tab-highlight dsr-transition-all dsr-ease-in-out dsr-shadow-lg dsr-rounded-lg',
        'dsr-absolute dsr-top-0 dsr-left-0 dsr-z-[500]',
      ])}
      style={{
        transform: `translateY(${indicatorStyle?.translateY}px) translateX(${indicatorStyle?.translateX}px)`,
        width: indicatorStyle?.width || 0,
        height: indicatorStyle?.height || 0,
        backgroundColor,
      }}
    />
  );

  return (
    <div
      className={clsx([
        'tab-selector-container dsr-relative dsr-rounded-lg dsr-inline-flex',
        variant === 'pill' && 'dsr-bg-gray-400/20 ',
      ])}
    >
      <ul
        id={navigatorID}
        role="tablist"
        aria-orientation="horizontal"
        ref={tabRef}
        className={clsx([
          'dsr-list-none tab-selector horizontal-tabs dsr-relative dsr-inline-flex',
          'dsr-items-center dsr-rounded-lg',
          variant === 'pill' && 'dsr-z-[1000] dsr-p-1.5 dsr-gap-x-1',
          variant === 'line' && 'dsr-gap-x-4',
          className,
        ])}
      >
        {items.filter((item) => !item.isHidden).map(item => (
          <HorizontalNavigatorItem
            key={item.key}
            item={item}
            activeItem={activeItem}
            navigatorID={navigatorID}
            variant={variant}
            color={color}
            className={itemClassName}
            onClickItem={onClickItem}
          />
        ))}
      </ul>
      {variant === 'line' ? underlineRenderer : highlightRenderer}
    </div>
  );

};

export default HorizontalNavigator;