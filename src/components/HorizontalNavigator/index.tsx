import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import HorizontalNavigatorItem, { HorizontalNavigatorItemType } from './item';

export type HorizontalNavigatorProps = {
  items: HorizontalNavigatorItemType[],
  activeItem?: string | null,
  variant?: 'pill' | 'line',
  id?: string,
  className?: string,
  itemClassName?: string,
  onClickItem?: (key: string, item: HorizontalNavigatorItemType) => void,
};

const HorizontalNavigator = ({
  id, items, variant = 'pill', className, itemClassName, activeItem, onClickItem = () => {},
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
  
  const underlineRenderer = (
    <div
      className={clsx([
        'tab-underline dsr-transition-all dsr-ease-in-out dsr-absolute',
        'dsr-border-2 dsr-border-primary dsr-rounded-lg dsr-left-0',
        'dsr-bottom-0 dsr-w-full',
      ])}
      style={{
        transform: `${indicatorStyle?.translateY ? `translateY(${indicatorStyle?.translateY}px)` : ''} ${indicatorStyle?.translateX ? `translateX(${indicatorStyle?.translateX}px)` : ''}`,
        width: indicatorStyle?.width || 0,
        height: indicatorStyle?.height || 0,
      }}
    />
  );

  const highlightRenderer = (
    <div
      className={clsx([
        'tab-highlight dsr-transition-all dsr-ease-in-out dsr-absolute',
        'dsr-rounded-lg dsr-bg-primary dsr-text-primaryTextColor',
        'dsr-top-0 dsr-left-0 dsr-z-[500]',
      ])}
      style={{
        transform: `translateY(${indicatorStyle?.translateY}px) translateX(${indicatorStyle?.translateX}px)`,
        width: indicatorStyle?.width || 0,
        height: indicatorStyle?.height || 0,
      }}
    />
  );

  return (
    <div className="tab-selector-container dsr-relative">
      <ul
        id={navigatorID}
        role="tablist"
        aria-orientation="horizontal"
        ref={tabRef}
        className={clsx([
          'dsr-list-none tab-selector horizontal-tabs dsr-relative dsr-inline-flex',
          'dsr-items-center dsr-rounded-lg',
          variant === 'pill' ? 'dsr-bg-gray-400/20 bg-rounded-lg dsr-p-1.5 dsr-z-[1000]' : '',
          variant === 'line' ? 'dsr-gap-x-4' : '',
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