'use client';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { LinkWrapper } from '../../utils/misc';
import Icon, { IconInputType } from '../Icon';
import Badge, { BaseBadgeProps } from '../Badge';
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

  const setVisibility = (isVisible: boolean) => {
    setDropdownVisibility(isVisible);
    setHeight(dropdownContentRef.current?.scrollHeight);
    onChangeExpansion();
  };

  useEffect(() => {
    setVisibility(!isCollapsed ? defaultExpansion ?? false : false);
  }, [isCollapsed]);

  useEffect(() => {
    if (!isCollapsed) {
      setVisibility(defaultExpansion ?? false);
    }
  }, [activeItem]);



  const liClass = clsx([
    'flex justify-between items-center transition w-full', className,
  ]);

  const innerContentClassName = cva({
    base: [
      'flex w-full items-center gap-2 text-color py-1.5 px-1',
      isCollapsed ? 'justify-center' : 'justify-between',
    ],
    variants: {
      variant: {
        line: 'transition-all rounded-r-lg gap-2',
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
        className: activeItem === item.key ? 'bg-neutral-50 dark:bg-neutral-100/80' : '',
      },
    ],
  });

  const innerContent = (item: VerticalNavigatorItemBaseType, isChild: boolean = false) => (
    <div
      className={clsx([
        innerContentClassName({ variant, color, state: activeItem === item.key ? 'active' : 'inactive' }),
        activeItem === item.key && (!isChild || dropdownVisibility) && 'active font-semibold',
      ])}
    >
      <div className="flex items-center gap-2 px-1 dst-text-lg text-left">
        {item.icon && (
        <span>
          <Icon icon={item.icon} size={24} />
        </span>
        )}
        <span className={clsx([isCollapsed ? 'hidden' : 'pl-1.5', item.labelClassName])}>{item.label}</span>
      </div>
      {(item?.badge !== undefined || item?.badgeProps) && (
        <Badge
          {...{
            color: 'white',
            variant: 'solid',
            ...item?.badgeProps,
          }}
          className="mr-1 font-semibold"
        >
          {item?.badge}
        </Badge>
      )}
    </div>
  );

  const commonClasses = clsx([
    'flex items-center transition w-full gap-2.5 focus-visible:outline -outline-offset-1 outline-primary ',
    variant === 'line' ? 'rounded-l-0 rounded-r-lg hover:bg-neutral-300/10' : 'rounded-lg hover:bg-neutral-300/30',
  ]);

  const contentRendererClassName = (item: VerticalNavigatorItemBaseType, isChild: boolean = false) => clsx([
    commonClasses,
    (isChild && variant === 'line') && 'border-l-4',
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
        (dropdownVisibility && (variant === 'pill' || variant === 'boxed'))
        && 'bg-neutral-300/20 dark:bg-neutral-400/20 rounded-lg pb-2',
      ])}
    >
      <ul className="flex flex-col w-full gap-1 z-[10]">
        <li
          className={clsx([
            commonClasses,
            liClass,
            variant === 'line' && 'pl-[4px] hover:pl-0 hover:!border-l-4',
            (activeItem === item.key && dropdownVisibility) && 'active w-full',
          ])}
        >
          <button
            className={clsx([
              'w-full items-center cursor-pointer flex rounded',
              isCollapsed ? 'justify-center' : 'justify-between',
            ])}
            onClick={() => setVisibility(!dropdownVisibility)}
          >
            <span className="flex items-center gap-2.5">{innerContent(item)}</span>
            {!isCollapsed && (
              <span
                className={clsx([
                  'transform transition-transform mr-2 opacity-80 text-color',
                  !dropdownVisibility ? 'rotate-180' : '',
                ])}
              >
                <i className="ri-arrow-up-s-line" />
              </span>
            )}
          </button>
        </li>
        <li
          ref={dropdownContentRef}
          className={clsx([
            'transition-all overflow-hidden relative mr-1',
            dropdownVisibility ? 'opacity-100' : 'opacity-50',
            isCollapsed ? 'ml-1' : 'ml-4',
          ])}
          style={{ height: dropdownVisibility ? height : 0 }}
        >
          <ul className={clsx(['flex flex-col pb-1 pr-1', variant == 'line' ? 'gap-0' : 'gap-1'])}>
            {item.items.map(subItem => (
              <li
                className={clsx([
                  liClass,
                  variant === 'line' ? 'rounded-l-none rounded-r-lg' : 'rounded-lg',
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
        variant === 'line' && 'pl-[4px] hover:pl-0 hover:!border-l-4',
        variant === 'line' ? 'rounded-l-0 rounded-r-lg' : 'rounded-lg',
        'z-[1000]',
        activeItem === item.key ? clsx([
          'active',
          (variant === 'pill' || variant === 'boxed') && 'hover:bg-neutral-900/30',
        ]) : 'hover:bg-neutral-300/10',
      ])}
      key={item.key}
    >
      {contentRenderer(item)}
    </li>
  );

};

export default VerticalNavigatorItem;