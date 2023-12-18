'use client';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import useColors, { ChayaColorType } from '../../hooks/useColors';

import VerticalNavigatorItem, { VerticalNavigatorItemType } from './Item';

export type VerticalNavigatorProps = {
  items: VerticalNavigatorItemType[],
  variant?: 'pill' | 'line',
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

  const { backgroundColor } = useColors('solid', color);

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
  });

  const listRenderer = (
    <ul
      id={id}
      ref={wrapperRef}
      role={role}
      aria-orientation="vertical"
      className={clsx([
        'dsr-flex dsr-flex-col dsr-gap-1 dsr-items-center dsr-overflow-hidden dsr-transition-all dsr-w-full',
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
    <div className="dsr-relative">
      {listRenderer}
      {(
        (indicatorStyle?.width || indicatorStyle?.height)
        && (variant === 'pill' || items.some((item) => item.key === activeItem))
      ) && (
        <div
          className={clsx([
            'tab-underline dsr-transition-all dsr-ease-in-out dsr-absolute',
            'dsr-top-0 dsr-left-0',
            variant === 'pill' && clsx([
              items.some((item) => item.key === activeItem) ? 'dsr-rounded-lg' : 'dsr-rounded-l-0 dsr-rounded-r-lg',
              'dsr-shadow-lg dsr-z-[500]',
            ]),
            variant == 'line' && 'dsr-border-2 dsr-z-[1000]',
          ])}
          style={{
            transform: `${indicatorStyle?.translateY ? `translateY(${indicatorStyle?.translateY}px)` : ''} ${indicatorStyle?.translateX ? `translateX(${indicatorStyle?.translateX}px)` : ''}`,
            width: indicatorStyle?.width || 0,
            height: indicatorStyle?.height || 0,
            borderColor: variant === 'line' ? backgroundColor : undefined,
            backgroundColor: variant === 'pill' ? backgroundColor : undefined,
          }}
        />
      )}
    </div>
  );

};

export default VerticalNavigator;