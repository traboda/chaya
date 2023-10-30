import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { LinkWrapper } from '../../utils/misc';
import Icon, { IconInputType } from '../Icon';
import Badge, { BaseBadgeProps } from '../Badge';

export type SidebarNavigationItemBaseType = {
  key: string,
  label: string,
  link?: string,
  onClick?: () => void,
  icon?: IconInputType,
  labelClassName?: string,
  role?: string,
  isDisabled?: boolean,
  badge?: React.ReactNode,
  badgeProps?: BaseBadgeProps,
};

export type SidebarNavigationProps = {
  item: SidebarNavigationItemBaseType & {
    items?: SidebarNavigationItemBaseType[]
  },
  variant?: 'pill' | 'line',
  activeItem?: string | null,
  role?: string,
  isCollapsed?: boolean,
  defaultExpansion?: boolean
};

const SidebarNavigationItem = ({
  item, role, variant = 'pill', isCollapsed, defaultExpansion, activeItem,
}: SidebarNavigationProps) => {

  const [height, setHeight] = useState<undefined | number>(undefined);
  const dropdownContentRef = useRef<HTMLLIElement>(null);
  const [dropdownVisibility, setDropdownVisibility] = useState(defaultExpansion || false);

  useEffect(() => {
    if (isCollapsed) setDropdownVisibility(false);
  }, [isCollapsed]);

  useEffect(() => setHeight(dropdownContentRef.current?.scrollHeight), [dropdownVisibility]);

  const liClass = clsx([
    'hover:dsr-bg-neutral-300/20 hover:dsr-backdrop-blur',
    'dsr-flex dsr-justify-between dsr-items-center dsr-transition dsr-rounded',
    'dsr-w-full',
  ]);

  const innerContent = (item: SidebarNavigationItemBaseType) => (
    <div
      className={clsx([
        'dsr-flex dsr-w-full dsr-items-center dsr-gap-2 dsr-py-1.5 dsr-px-1',
        variant === 'line' && 'dsr-transition-all dsr-rounded dsr-gap-2',
        isCollapsed ? 'dsr-justify-center' : 'dsr-justify-between',
      ])}
    >
      <div className="dsr-flex dsr-items-center dsr-gap-2 dsr-px-1 dst-text-lg dsr-text-left">
        {item.icon && (
        <span>
          <Icon icon={item.icon} size={24} />
        </span>
        )}
        <span className={clsx([isCollapsed ? 'dsr-hidden' : 'dsr-pl-1.5', item.labelClassName])}>{item.label}</span>
      </div>
      {(item?.badge !== undefined || item?.badgeProps) && (
        <Badge
          {...{
            color: 'white',
            variant: 'solid',
            ...item?.badgeProps,
          }}
          className="dsr-mr-1 dsr-font-semibold"
        >
          {item?.badge}
        </Badge>
      )}
    </div>
  );

  const commonClasses = clsx([
    'dsr-flex dsr-items-center dsr-transition dsr-w-full dsr-gap-2.5 focus-visible:dsr-outline dsr-rounded-lg -dsr-outline-offset-1 dsr-outline-primary',
    activeItem === item.key && 'active',
  ]);


  const contentRenderer = (item: SidebarNavigationItemBaseType) => item?.link ?
    LinkWrapper(item.link, innerContent(item), {
      role: item.role ?? 'tab',
      className: clsx([
        commonClasses,
        variant == 'pill' && (
          activeItem === item.key ? 'dsr-bg-neutral-300/30 active' : 'hover:dsr-bg-neutral-300/20'
        ),
      ]),
      isDisabled: item.isDisabled,
      onClick: typeof item?.onClick === 'function' ? item.onClick : () => {},
    }) : (
      <button
        type="button"
        role={item.role ?? 'tab'}
        onClick={typeof item?.onClick === 'function' ? item.onClick : () => {}}
        disabled={item.isDisabled}
        aria-selected={activeItem === item.key}
        aria-disabled={item.isDisabled}
        className={clsx([
          commonClasses,
          variant == 'pill' && (
            activeItem === item.key ? 'dsr-bg-primary dsr-text-primaryTextColor active' : 'hover:dsr-bg-gray-500/20'
          ),
        ])}
      >
        {innerContent(item)}
      </button>
    );

  return item.items?.length ? (
    <li role={role} className={liClass}>
      <ul className="dsr-flex dsr-flex-col dsr-w-full dsr-gap-1">
        <li
          className={clsx([
            'hover:dsr-bg-gray-400/20',
            commonClasses,
            liClass,
            variant == 'pill' && (
              activeItem === item.key ? 'dsr-bg-primary dsr-text-primaryTextColor active' : ''
            ),
          ])}
        >
          <button
            className={clsx([
              'dsr-w-full dsr-items-center dsr-cursor-pointer dsr-flex dsr-rounded',
              isCollapsed ? 'dsr-justify-center' : 'dsr-justify-between',
            ])}
            onClick={() => setDropdownVisibility(!dropdownVisibility)}
          >
            <span className="dsr-flex dsr-items-center dsr-gap-2.5">{innerContent(item)}</span>
            {!isCollapsed && (
              <span
                className={clsx([
                  'dsr-w-[18px] dsr-transform dsr-transition-transform',
                  dropdownVisibility ? 'dsr-rotate-180' : '',
                ])}
              >
                <Icon icon="chevron-down" size={18} />
              </span>
            )}
          </button>
        </li>

        <li
          ref={dropdownContentRef}
          className={clsx([
            'dsr-transition-all dsr-overflow-hidden dsr-relative',
            dropdownVisibility ? 'dsr-opacity-100' : 'dsr-opacity-50',
            isCollapsed ? 'dsr-pl-1' : 'dsr-pl-5',
          ])}
          style={{ height: dropdownVisibility ? height : 0 }}
        >
          <div
            className={clsx([
              'dsr-absolute dsr-top-0 dsr-left-0 dsr-h-full',
              isCollapsed ? 'dsr-hidden' : 'dsr-block dsr-pl-3',
            ])}
          >
            <div className="dsr-bg-gray-500/20 dsr-rounded-full dsr-w-1 dsr-h-full" />
          </div>
          <ul className="dsr-flex dsr-flex-col dsr-gap-1 dsr-pb-1 dsr-pr-1">
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
    <li
      role={role}
      className={liClass}
      key={item.key}
    >
      {contentRenderer(item)}
    </li>
  );
};

export default SidebarNavigationItem;