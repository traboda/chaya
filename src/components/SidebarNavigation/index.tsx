import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import SidebarNavigationItem, { ItemBase } from './Item';

export type SidebarNavigationProps = {
  items: (ItemBase & {
    items?: ItemBase[]
    isHidden?: boolean
  })[],
  variant?: 'pill' | 'line',
  activeItem?: string | null,
  className?: string,
  isCollapsed?: boolean,
  id?: string,
  role?: string,
  itemRole?: string,
};

const SidebarNavigation = ({
  items, className, variant = 'pill', role = 'tablist', itemRole, id, isCollapsed, activeItem,
}: SidebarNavigationProps) => {
  const [width, setWidth] = useState<undefined | number>(undefined);
  const wrapperRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, height: 0, translate: 0 });

  const updateIndicator = () => {
    if (wrapperRef.current) {
      const tab = wrapperRef.current.querySelector('.active');
      console.log(tab);
      if (tab) {
        const { height, top } = tab.getBoundingClientRect();
        const { top: containerTop } = wrapperRef.current.getBoundingClientRect();
        setIndicatorStyle({ height, translate: (top - containerTop), width: 0 });
      }
    }
  };

  useEffect(() => {
    if (activeItem) {
      updateIndicator();
    }
  }, [activeItem]);

  useEffect(() => {
    setWidth(wrapperRef.current?.parentElement?.scrollWidth);
  }, [isCollapsed]);

  const listRenderer = (
    <ul
      id={id}
      ref={wrapperRef}
      role={role}
      aria-orientation="vertical"
      className={clsx([
        'dsr-flex dsr-flex-col dsr-gap-1 dsr-overflow-hidden dsr-transition-all',
        className,
      ])}
      style={{ width: isCollapsed ? 38 : width }}
    >
      {items.filter((item) => !item.isHidden).map(item => (
        <SidebarNavigationItem
          key={item.key}
          item={item}
          variant={variant}
          role={itemRole ?? 'presentation'}
          activeItem={activeItem}
          isCollapsed={isCollapsed}
          defaultExpansion={!!item.items?.find(item => item.key === activeItem)}
        />
      ))}
    </ul>
  );

  return variant === 'pill' ? listRenderer : (
    <div className="dsr-relative">
      {listRenderer}
      <div
        className={clsx([
          'tab-underline dsr-transition-all dsr-ease-in-out dsr-absolute',
          'dsr-border-2 dsr-border-primary dsr-rounded-lg dsr-left-0',
          'dsr-top-0 dsr-left-0 dsr-w-0',
        ])}
        style={{
          transform: `translateY(${indicatorStyle?.translate}px)`,
          width: indicatorStyle?.width,
          height: indicatorStyle?.height,
        }}
      />
    </div>

  );
};

export default SidebarNavigation;