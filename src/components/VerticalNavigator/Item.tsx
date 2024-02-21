'use client';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { LinkWrapper } from '../../utils/misc';
import Icon, { IconInputType } from '../Icon';
import Badge, { BaseBadgeProps } from '../Badge';
import ChevronUp from '../../utils/icons/chevron-up';
import { cva } from '../../utils/cva';
import {
  BORDER_COLOR_MAP,
  ChayaColorType, colorMapper,
  EMPTY_COLOR_MAP, MINIMAL_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP, TEXT_COLOR_MAP,
} from '../../utils/classMaps/colors';

export type VerticalNavigatorItemBaseType = {
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

export type VerticalNavigatorItemType = VerticalNavigatorItemBaseType & {
  items?: VerticalNavigatorItemBaseType[]
};

export type VerticalNavigatorVariantType = 'pill' | 'boxed' | 'line';

export type VerticalNavigatorItemProps = {
  item: VerticalNavigatorItemType,
  className?: string,
  variant?: VerticalNavigatorVariantType,
  color?: ChayaColorType,
  activeItem?: string | null,
  role?: string,
  isCollapsed?: boolean,
  defaultExpansion?: boolean
  onChangeExpansion?: () => void,
  onClickItem?: (key: string, item: VerticalNavigatorItemType) => void,
};

const VerticalNavigatorItem = ({
  item, className, role, variant = 'pill', color = 'primary', isCollapsed, defaultExpansion, activeItem, onChangeExpansion = () => {}, onClickItem = () => {},
}: VerticalNavigatorItemProps) => {

  const [height, setHeight] = useState<undefined | number>(undefined);
  const dropdownContentRef = useRef<HTMLLIElement>(null);

  const [dropdownVisibility, setDropdownVisibility] = useState(defaultExpansion);

  useEffect(() => {
    setDropdownVisibility(!isCollapsed ? defaultExpansion : false);
  }, [isCollapsed]);

  useEffect(() => {
    if (!isCollapsed) setDropdownVisibility(defaultExpansion);
  }, [activeItem]);

  useEffect(() => {
    setHeight(dropdownContentRef.current?.scrollHeight);
    onChangeExpansion();
  }, [dropdownVisibility]);

  const liClass = clsx([
    'dsr-flex dsr-justify-between dsr-items-center dsr-transition dsr-w-full', className,
  ]);

  const innerContentClassName = cva({
    base: [
      'dsr-flex dsr-w-full dsr-items-center dsr-gap-2 dsr-text-color dsr-py-1.5 dsr-px-1',
      isCollapsed ? 'dsr-justify-center' : 'dsr-justify-between',
    ],
    variants: {
      variant: {
        line: 'dsr-transition-all dsr-rounded-r-lg dsr-gap-2',
        pill: '',
        boxed: '',
      },
      color: EMPTY_COLOR_MAP,
      state: {
        active: '',
        inactive: '',
      },
    },
    compoundVariants: [
      ...colorMapper<{ variant: VerticalNavigatorVariantType, state: 'active' | 'inactive' }>([SOLID_TEXT_COLOR_MAP], { variant: 'pill', state: 'active' }),
      ...colorMapper<{ variant: VerticalNavigatorVariantType, state: 'active' | 'inactive' }>([SOLID_TEXT_COLOR_MAP], { variant: 'boxed', state: 'active' }),
      ...colorMapper<{ variant: VerticalNavigatorVariantType, state: 'active' | 'inactive' }>([MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP], { variant: 'line', state: 'active' }),
      {
        variant: 'line',
        color: 'white',
        className: activeItem === item.key ? 'dsr-bg-neutral-50 dark:dsr-bg-neutral-100/80' : '',
      },
    ],
  });

  const innerContent = (item: VerticalNavigatorItemBaseType, isChild: boolean = false) => (
    <div
      className={clsx([
        innerContentClassName({ variant, color, state: activeItem === item.key ? 'active' : 'inactive' }),
        activeItem === item.key && (!isChild || dropdownVisibility) && 'active dsr-font-semibold',
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
    'dsr-flex dsr-items-center dsr-transition dsr-w-full dsr-gap-2.5 focus-visible:dsr-outline -dsr-outline-offset-1 dsr-outline-primary ',
    variant === 'line' ? 'dsr-rounded-l-0 dsr-rounded-r-lg hover:dsr-bg-neutral-300/10' : 'dsr-rounded-lg hover:dsr-bg-neutral-300/30',
  ]);

  const contentRendererClassName = (item: VerticalNavigatorItemBaseType, isChild: boolean = false) => clsx([
    commonClasses,
    (isChild && variant === 'line') && 'dsr-border-l-4',
    item.key === activeItem && BORDER_COLOR_MAP[color],
  ]);

  const contentRenderer = (item: VerticalNavigatorItemBaseType, isChild: boolean = false) => item?.link ?
    LinkWrapper(item.link, innerContent(item, isChild), {
      role: item.role ?? 'tab',
      className: contentRendererClassName(item, isChild),
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
        className={contentRendererClassName(item, isChild)}
      >
        {innerContent(item, isChild)}
      </button>
    );

  return item.items?.length ? (
    <li
      role={role}
      className={clsx([
        liClass,
        (dropdownVisibility && (variant === 'pill' || variant === 'boxed')) && 'dsr-bg-neutral-300/20 dark:dsr-bg-neutral-400/20 dsr-rounded-lg dsr-pb-2',
      ])}
    >
      <ul className="dsr-flex dsr-flex-col dsr-w-full dsr-gap-1 dsr-z-[1000]">
        <li
          className={clsx([
            commonClasses,
            liClass,
            variant === 'line' && 'dsr-pl-[4px] hover:dsr-pl-0 hover:!dsr-border-l-4',
            activeItem === item.key && 'active dsr-w-full',
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
                  'dsr-transform dsr-transition-transform dsr-mr-2 dsr-opacity-80 dsr-text-color',
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
            'dsr-transition-all dsr-overflow-hidden dsr-relative dsr-mr-1',
            dropdownVisibility ? 'dsr-opacity-100' : 'dsr-opacity-50',
            isCollapsed ? 'dsr-ml-1' : 'dsr-ml-4',
          ])}
          style={{ height: dropdownVisibility ? height : 0 }}
        >
          <ul className={clsx(['dsr-flex dsr-flex-col dsr-pb-1 dsr-pr-1', variant == 'line' ? 'dsr-gap-0' : 'dsr-gap-1'])}>
            {item.items.map(subItem => (
              <li
                className={clsx([
                  liClass,
                  variant === 'line' ? 'dsr-rounded-l-none dsr-rounded-r-lg' : 'dsr-rounded-lg',
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
        variant === 'line' && 'dsr-pl-[4px] hover:dsr-pl-0 hover:!dsr-border-l-4',
        variant === 'line' ? 'dsr-rounded-l-0 dsr-rounded-r-lg' : 'dsr-rounded-lg',
        'dsr-z-[1000]',
        activeItem === item.key ? clsx([
          'active',
          (variant === 'pill' || variant === 'boxed') && 'hover:dsr-bg-neutral-900/30',
        ]) : 'hover:dsr-bg-neutral-300/10',
      ])}
      key={item.key}
    >
      {contentRenderer(item)}
    </li>
  );

};

export default VerticalNavigatorItem;