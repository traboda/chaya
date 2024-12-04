'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

import { cva } from '../../utils/cva';
import {
  colorVariantMapper, EMPTY_COLOR_MAP, BORDER_COLOR_MAP, SOLID_BG_COLOR_MAP,
} from '../../utils/classMaps/colors';
import mcs from '../../utils/merge';

import HorizontalNavigatorItem from './HorizontalNavigatorItem';
import { HorizontalNavigatorProps } from './HorizontalNavigator.types';
import { HorizontalNavigatorVariantType } from './HorizontalNavigatorItem.types';

const activeMarkerClassName = cva({
  base: [
    'absolute left-0 rounded-lg',
    'transition-all ease-in-out',
  ],
  variants: {
    variant: {
      line: 'horizontal-navigator-underline border-2 w-full bottom-0',
      pill: 'horizontal-navigator-pill shadow-lg z-[500] top-0',
      boxed: 'horizontal-navigator-boxed shadow-lg z-[500] top-0',
      minimal: 'horizontal-navigator-minimal w-full bottom-0',
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
      className={mcs([
        'list-none tab-selector horizontal-tabs relative inline-flex',
        'items-center rounded-lg',
        (variant === 'pill' || variant === 'boxed') && 'z-[1000] gap-x-0.5',
        variant === 'boxed' && 'bg-neutral-400/20 dark:bg-neutral-600/20 p-1.5',
        variant === 'line' && 'gap-1',
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