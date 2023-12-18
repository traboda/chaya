'use client';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { LinkWrapper } from '../../utils/misc';
import Icon, { IconInputType } from '../Icon';
import Badge, { BaseBadgeProps } from '../Badge';
import ChevronUp from '../../utils/icons/chevron-up';

export type SidebarNavigationItemBaseType = {
  key: string,
  label: string,
  link?: string,
  onClick?: () => void,
  icon?: IconInputType,
  labelClassName?: string,
  role?: string,
  isDisabled?: boolean,
  isHidden?: boolean,
  badge?: React.ReactNode,
  badgeProps?: BaseBadgeProps,
};

export type SidebarNavigatorItemType = SidebarNavigationItemBaseType & {
  items?: SidebarNavigationItemBaseType[]
};

export type SidebarNavigationProps = {
  item: SidebarNavigatorItemType,
  className?: string,
  variant?: 'pill' | 'line',
  activeItem?: string | null,
  role?: string,
  isExpanded?: boolean,
  defaultExpansion?: boolean
  onChangeExpansion?: () => void,
  onClickItem?: (key: string, item: SidebarNavigatorItemType) => void,
};

const SidebarNavigationItem = ({
  item, className, role, variant = 'pill', isExpanded, defaultExpansion, activeItem, onChangeExpansion = () => {}, onClickItem = () => {},
}: SidebarNavigationProps) => {

  const [height, setHeight] = useState<undefined | number>(undefined);
  const dropdownContentRef = useRef<HTMLLIElement>(null);

  const [dropdownVisibility, setDropdownVisibility] = useState(defaultExpansion);

  useEffect(() => setDropdownVisibility(isExpanded), [isExpanded]);

  useEffect(() => {
    if (isExpanded) setDropdownVisibility(defaultExpansion);
  }, [activeItem]);

  useEffect(() => {
    setHeight(dropdownContentRef.current?.scrollHeight);
    onChangeExpansion();
  }, [dropdownVisibility]);

  const liClass = clsx([
    'dsr-flex dsr-justify-between dsr-items-center dsr-transition dsr-w-full', className,
  ]);

  const innerContent = (item: SidebarNavigationItemBaseType, hasChildren: boolean = false) => (
    <div
      className={clsx([
        'dsr-flex dsr-w-full dsr-items-center dsr-gap-2 dsr-py-1.5 dsr-px-1',
        variant === 'line' && 'dsr-transition-all dsr-rounded-r-lg dsr-gap-2',
        variant === 'line' && activeItem === item.key && `${!hasChildren ? 'dsr-bg-primary/10' : ''} dsr-text-primary`,
        activeItem === item.key && 'active dsr-font-semibold',
        isExpanded ? 'dsr-justify-between' : 'dsr-justify-center',
      ])}
    >
      <div className="dsr-flex dsr-items-center dsr-gap-2 dsr-px-1 dst-text-lg dsr-text-left">
        {item.icon && (
        <span>
          <Icon icon={item.icon} size={24} />
        </span>
        )}
        <span className={clsx([isExpanded ? 'dsr-pl-1.5' : 'dsr-hidden', item.labelClassName])}>{item.label}</span>
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
    'dsr-flex dsr-items-center dsr-transition dsr-w-full dsr-gap-2.5 focus-visible:dsr-outline -dsr-outline-offset-1 dsr-outline-primary hover:dsr-bg-neutral-300/20',
    variant === 'line' ? 'dsr-rounded-l-0 dsr-rounded-r-lg' : 'dsr-rounded-lg',
  ]);

  const contentRenderer = (item: SidebarNavigationItemBaseType, isChild: boolean = false) => item?.link ?
    LinkWrapper(item.link, innerContent(item), {
      role: item.role ?? 'tab',
      className: clsx([
        commonClasses,
        (isChild && variant === 'line') && 'dsr-my-0.5',
      ]),
      isDisabled: item.isDisabled,
      onClick: typeof item?.onClick === 'function' ? item.onClick : () => onClickItem(item.key, item),
    }) : (
      <button
        type="button"
        role={item.role ?? 'tab'}
        onClick={typeof item?.onClick === 'function' ? item.onClick : () => onClickItem(item.key, item)}
        disabled={item.isDisabled}
        aria-selected={activeItem === item.key}
        aria-disabled={item.isDisabled}
        className={clsx([
          commonClasses,
          (isChild && variant === 'line') && 'dsr-my-0.5',
        ])}
      >
        {innerContent(item)}
      </button>
    );

  return item.items?.length ? (
    <li role={role} className={clsx([liClass, 'dsr-z-[1000]'])}>
      <ul className="dsr-flex dsr-flex-col dsr-w-full dsr-gap-1">
        <li
          className={clsx([
            'hover:dsr-bg-neutral-400/20',
            commonClasses,
            liClass,
            variant === 'line' && activeItem === item.key && 'dsr-bg-primary/10 dsr-text-primary',
            activeItem === item.key && 'active dsr-text-primaryTextColor dsr-w-full',
          ])}
        >
          <button
            className={clsx([
              'dsr-w-full dsr-items-center dsr-cursor-pointer dsr-flex dsr-rounded',
              isExpanded ? 'dsr-justify-between' : 'dsr-justify-center',
            ])}
            onClick={() => setDropdownVisibility(!dropdownVisibility)}
          >
            <span className="dsr-flex dsr-items-center dsr-gap-2.5">{innerContent(item, true)}</span>
            {isExpanded && (
              <span
                className={clsx([
                  'dsr-transform dsr-transition-transform dsr-mr-2 dsr-opacity-80',
                  !dropdownVisibility ? 'dsr-rotate-180' : '',
                ])}
              >
                <ChevronUp size={18} />
              </span>
            )}
          </button>
        </li>
        <li
          ref={dropdownContentRef}
          className={clsx([
            'dsr-transition-all dsr-overflow-hidden dsr-relative',
            dropdownVisibility ? 'dsr-opacity-100' : 'dsr-opacity-50',
            isExpanded ? 'dsr-pl-5' : 'dsr-pl-1',
          ])}
          style={{ height: dropdownVisibility ? height : 0 }}
        >
          {(variant == 'pill') && (
            <div
              className={clsx([
                'dsr-absolute dsr-top-0 dsr-left-0 dsr-h-full',
                isExpanded ? 'dsr-block dsr-pl-3' : 'dsr-hidden',
              ])}
            >
              <div className="dsr-bg-gray-500/20 dsr-rounded-full dsr-w-1 dsr-h-full" />
            </div>
          )}
          <ul className={clsx(['dsr-flex dsr-flex-col dsr-pb-1 dsr-pr-1', variant == 'line' ? 'dsr-gap-0' : 'dsr-gap-1'])}>
            {item.items.map(subItem => (
              <li
                className={clsx([
                  liClass, 'dsr-rounded-l-none dsr-rounded-r-lg',
                  variant === 'line' ?
                    activeItem === subItem.key ? 'dsr-border-l-4 dsr-border-primary' : 'dsr-border-l-4 dsr-border-gray-500/20'
                    : activeItem === subItem.key ? 'dsr-text-primaryTextColor hover:dsr-bg-neutral-900/30' : 'hover:dsr-bg-neutral-300/20',
                ])}
                key={item.key + subItem.key}
              >
                {contentRenderer(subItem, true)}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </li>
  ) : (
    <li
      role={role}
      className={clsx([
        liClass,
        'dsr-z-[1000] dsr-rounded-lg',
        activeItem === item.key ? clsx([
          'active dsr-text-primaryTextColor',
          variant === 'pill' && 'hover:dsr-bg-neutral-900/30',
        ]) : 'hover:dsr-bg-neutral-300/20',
      ])}
      key={item.key}
    >
      {contentRenderer(item)}
    </li>
  );
};

export default SidebarNavigationItem;