import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { LinkWrapper } from '../../utils/misc';
import Icon from '../Icon';

import { ItemBase } from './index';

export type SidebarNavigationProps = {
  activeItem?: string,
  item: ItemBase & {
    items?: ItemBase[]
  },
  isCollapsed?: boolean,
  defaultExpansion?: boolean
};

const SidebarNavigationItem = ({ item, isCollapsed, defaultExpansion, activeItem }: SidebarNavigationProps) => {
  const [height, setHeight] = useState<undefined | number>(undefined);
  const dropdownContentRef = useRef<HTMLLIElement>(null);
  const [dropdownVisibility, setDropdownVisibility] = useState(defaultExpansion || false);

  useEffect(() => {
    if (isCollapsed) setDropdownVisibility(false);
  }, [isCollapsed]);

  useEffect(() => {
    setHeight(dropdownContentRef.current?.scrollHeight);
  }, [dropdownVisibility]);

  const liClass = 'dsr-flex dsr-justify-between dsr-items-center dsr-transition dsr-rounded-lg';

  const innerContent = (item: ItemBase) => (
    <>
      <span className="dsr-w-[18px]"><Icon icon={item.icon} size={18} /></span>
      {item.name}
    </>
  );

  const commonClasses = 'dsr-px-2.5 focus-visible:dsr-outline dsr-py-1.5 dsr-rounded-lg -dsr-outline-offset-1 dsr-outline-primary';

  const contentRenderer = (item: ItemBase) => LinkWrapper(item.link, innerContent(item), {
    className: clsx([
      'dsr-flex dsr-items-center dsr-transition dsr-w-full dsr-gap-2.5',
      commonClasses,
      activeItem === item.key ? 'dsr-bg-gray-500/30' : 'hover:dsr-bg-gray-500/20',
    ]),
  });

  return item.items?.length ? (
    <li>
      <ul className="dsr-flex dsr-flex-col dsr-gap-1">
        <li className={liClass}>
          <button
            className={clsx([
              'dsr-w-full dsr-items-center dsr-justify-between dsr-cursor-pointer dsr-flex dsr-rounded-lg hover:dsr-bg-gray-500/20',
              commonClasses,
            ])}
            onClick={() => setDropdownVisibility(!dropdownVisibility)}
          >
            <span className="dsr-flex dsr-items-center dsr-gap-2.5">{innerContent(item)}</span>

            <span
              className={clsx([
                'dsr-w-[18px] dsr-transform dsr-transition-transform',
                dropdownVisibility ? 'dsr-rotate-180' : '',
              ])}
            >
              <Icon icon="chevron-down" size={18} />
            </span>
          </button>
        </li>

        <li
          ref={dropdownContentRef}
          className={clsx([
            'dsr-pl-4 dsr-transition-all dsr-overflow-hidden dsr-relative',
            dropdownVisibility ? 'dsr-opacity-100' : 'dsr-opacity-50',
          ])}
          style={{ height: dropdownVisibility ? height : 0 }}
        >
          <div className="dsr-absolute dsr-top-0 dsr-left-0 dsr-pl-2 dsr-h-full">
            <div className="dsr-bg-gray-500/20 dsr-rounded-full dsr-w-1 dsr-h-full" />
          </div>

          <ul className="dsr-flex dsr-flex-col dsr-gap-1">
            {item.items.map(subItem => (
              <li className={liClass} key={item.key + subItem.key}>
                {contentRenderer(subItem)}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </li>
  ) : (
    <li className={liClass} key={item.key}>{contentRenderer(item)}</li>
  );
};

export default SidebarNavigationItem;