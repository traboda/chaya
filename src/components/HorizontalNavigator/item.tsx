import React from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import useColors, { ChayaColorType } from '../../hooks/useColors';
import { LinkWrapper } from '../../utils/misc';
import Icon, { IconInputType } from '../Icon';
import Badge, { BaseBadgeProps } from '../Badge';

export type HorizontalNavigatorItemType = {
  key: string,
  label: string,
  link?: string,
  onClick?: () => void,
  icon?: IconInputType,
  labelClassName?: string,
  className?: string,
  isDisabled?: boolean,
  isHidden?: boolean,
  badge?: React.ReactNode,
  badgeProps?: BaseBadgeProps,
};

export type HorizontalNavigatorItemProps = {
  item: HorizontalNavigatorItemType,
  navigatorID: string,
  variant?: 'pill' | 'line',
  color?: ChayaColorType,
  activeItem?: string | null,
  badgeProps?: BaseBadgeProps,
  className?: string,
  onClickItem?: (key: string, item: HorizontalNavigatorItemType) => void,
};

const HorizontalNavigatorItem = ({
  item, activeItem, badgeProps, variant = 'pill', className, navigatorID, onClickItem = () => {}, color = 'primary',
}: HorizontalNavigatorItemProps) => {

  const menuButtonClassName = clsx([className, item.className]);

  const { backgroundColor } = useColors('minimal', color);

  const pillVariantClassName = (key: string) => clsx([
    'border border-neutral-300/20 dsr-px-5 dsr-py-2',
    item?.isDisabled && 'dsr-opacity-60 dsr-cursor-not-allowed',
    activeItem === key ? 'active dsr-font-semibold dsr-text-primaryTextColor' : !item?.isDisabled ? 'hover:dsr-bg-neutral-50/80 dark:hover:dsr-bg-neutral-800/80' : null,
  ]);

  const lineVariantClassName = (key: string) => clsx([
    'dsr-border-0 dsr-py-1 dsr-mb-2',
    item?.isDisabled && 'dsr-opacity-60 dsr-cursor-not-allowed',
    activeItem === key ? 'active dsr-font-semibold' : !item?.isDisabled ? 'hover:dsr-bg-neutral-400/20' : null,
    'dsr-transition-all dsr-rounded-lg dsr-gap-2 dsr-py-0.5 dsr-px-3',
  ]);

  const menuButtonClassNameGenerator = (key: string) => clsx([
    'dsr-outline-1 focus-visible:dsr-outline dsr-duration-200 dsr-transition',
    'dsr-rounded-lg dsr-transition-background dsr-outline-2 dsr-no-underline',
    menuButtonClassName,
    color === 'white' && variant === 'pill' ? 'dsr-text-neutral-900' : 'dsr-text-color',
    variant === 'pill' ? pillVariantClassName(key) : lineVariantClassName(key),
  ]);


  const renderOption = (item: HorizontalNavigatorItemType) => (
    <div
      className={clsx([
        'dsr-flex dsr-w-full dsr-justify-between dsr-items-center dsr-gap-2',
      ])}
    >
      <div className="dsr-flex dsr-items-center dsr-gap-2 dsr-text-left">
        {item.icon && <span className="dsr-w-[16px]"><Icon icon={item.icon} size={16} /></span>}
        <span className={item.labelClassName}>{item.label}</span>
      </div>
      {(item?.badge !== undefined || badgeProps || item.badgeProps) && (
        <Badge
          size="sm"
          {...{
            color: 'shade',
            variant: 'minimal',
            ...(badgeProps ?? {}), ...item?.badgeProps,
          }}
        >
          {item?.badge}
        </Badge>
      )}
    </div>
  );

  const renderButton = (item: HorizontalNavigatorItemType) => (
    <button
      onClick={() =>
        item?.onClick && typeof item.onClick === 'function' ? item.onClick() : onClickItem(item.key, item)
      }
      style={{
        background: (variant === 'line' && item.key === activeItem) ? backgroundColor : undefined,
      }}
      className={menuButtonClassNameGenerator(item.key)}
      role="tab"
      id={`${navigatorID}-${item.key}-tab`}
      data-toggle="tab"
      aria-selected={activeItem === item.key}
      aria-controls={`${navigatorID}-${item.key}-panel`}
      disabled={item.isDisabled}
      aria-disabled={item.isDisabled}
    >
      {renderOption(item)}
    </button>
  );

  return (
    <li
      key={item?.key ? `tab_selector_${item?.key}` : nanoid()}
      role="presentation"
    >
      {item.link ? LinkWrapper(!item.isDisabled ? item.link : '', renderOption(item), {
        className: menuButtonClassNameGenerator(item.key),
        id: `${navigatorID}-${item.key}-tab`,
        style: {
          background: variant === 'line' && item.key === activeItem ? backgroundColor : undefined,
        },
      }) : renderButton(item)}
    </li>
  );

};

export default HorizontalNavigatorItem;