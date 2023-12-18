import React from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import Icon, { IconInputType } from '../Icon';
import Badge, { BaseBadgeProps } from '../Badge';
import { LinkWrapper } from '../../utils/misc';

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
  activeItem?: string | null,
  badgeProps?: BaseBadgeProps,
  className?: string,
  onClickItem?: (key: string, item: HorizontalNavigatorItemType) => void,
};

const HorizontalNavigatorItem = ({
  item, activeItem, badgeProps, variant = 'pill', className, navigatorID, onClickItem = () => {},
}: HorizontalNavigatorItemProps) => {

  const menuButtonClassName = clsx([className, item.className]);

  const pillVariantClassName = (key: string) => clsx([
    'border border-neutral-300/20 dsr-px-5 dsr-py-2',
    activeItem === key && 'active dsr-font-semibold dsr-text-primaryTextColor',
  ]);

  const lineVariantClassName = (key: string) => clsx([
    'dsr-border-0 dsr-py-1 dsr-mb-2',
    activeItem === key && 'active dsr-font-semibold dsr-bg-primary/10',
    'dsr-transition-all dsr-rounded-lg hover:dsr-bg-gray-400/20 dsr-gap-2 dsr-py-0.5 dsr-px-3 hover:dsr-backdrop-blur',
  ]);

  const menuButtonClassNameGenerator = (key: string) => clsx([
    'dsr-outline-1 focus-visible:dsr-outline dsr-duration-200 dsr-transition',
    'dsr-rounded-lg dsr-transition-background dsr-outline-2 dsr-text-color dsr-no-underline',
    menuButtonClassName,
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
      }) : renderButton(item)}
    </li>
  );

};

export default HorizontalNavigatorItem;