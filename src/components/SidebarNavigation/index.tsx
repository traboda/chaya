import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { IconInputType } from '../Icon';

import SidebarNavigationItem from './Item';

export type ItemBase = {
  key: string,
  name: string,
  link: string,
  icon: IconInputType,
};

export type SidebarNavigationProps = {
  activeItem?: string,
  className?: string,
  isCollapsed?: boolean,
  items: (ItemBase & {
    items?: ItemBase[]
  })[],
};

const SidebarNavigation = ({
  items, className, isCollapsed, activeItem,
}: SidebarNavigationProps) => {
  const [width, setWidth] = useState<undefined | number>(undefined);
  const wrapperRef = useRef<HTMLUListElement>(null);
  
  useEffect(() => {
    setWidth(wrapperRef.current?.parentElement?.scrollWidth);
  }, [isCollapsed]);

  return (
    <ul
      ref={wrapperRef}
      className={clsx([
        'dsr-flex dsr-flex-col dsr-gap-1 dsr-overflow-hidden dsr-transition-all',
        className,
      ])}
      style={{ width: isCollapsed ? 38 : width }}
    >
      {items.map(item => (
        <SidebarNavigationItem
          key={item.key}
          item={item}
          activeItem={activeItem}
          isCollapsed={isCollapsed}
          defaultExpansion={!!item.items?.find(item => item.key === activeItem)}
        />
      ))}
    </ul>
  );
};

export default SidebarNavigation;