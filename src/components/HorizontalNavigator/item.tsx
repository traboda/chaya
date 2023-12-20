import React from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { cva } from '../../utils/cva';
import { LinkWrapper } from '../../utils/misc';
import Icon, { IconInputType } from '../Icon';
import Badge, { BaseBadgeProps } from '../Badge';
import { colorVariantMapper, ChayaColorType, MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP } from '../../utils/classMaps/colors';

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

export type HorizontalNavigatorVariantType = 'pill' | 'line';

export type HorizontalNavigatorItemProps = {
  item: HorizontalNavigatorItemType,
  navigatorID: string,
  variant?: HorizontalNavigatorVariantType,
  color?: ChayaColorType,
  activeItem?: string | null,
  badgeProps?: BaseBadgeProps,
  className?: string,
  onClickItem?: (key: string, item: HorizontalNavigatorItemType) => void,
};

const HorizontalNavigatorItem = ({
  item, activeItem, badgeProps, variant = 'pill', className, navigatorID, onClickItem = () => {}, color = 'primary',
}: HorizontalNavigatorItemProps) => {


  const liClassNames = cva({
    base: [
      'dsr-outline-1 focus-visible:dsr-outline dsr-duration-200 dsr-transition',
      'dsr-rounded-lg dsr-transition-background dsr-outline-2 dsr-no-underline',
      item?.isDisabled && 'dsr-opacity-60 dsr-cursor-not-allowed',
      activeItem === item.key && 'active dsr-font-semibold',
    ],
    variants: {
      color: {
        primary: '',
        secondary: '',
        success: '',
        warning: '',
        danger: '',
        shade: '',
        contrast: '',
        white: '',
        black: '',
      },
      variant: {
        pill: [
          'border border-neutral-300/20 ',
          activeItem === item.key && 'dsr-text-primaryTextColor',
          activeItem !== item.key && !item?.isDisabled && 'hover:dsr-bg-neutral-50/80 dark:hover:dsr-bg-neutral-800/80',
        ],
        line: [
          'dsr-transition-all dsr-rounded-lg dsr-gap-2 dsr-border-0 dsr-mb-2',
          activeItem !== item.key && !item?.isDisabled && 'hover:dsr-bg-neutral-400/20',
        ],
      },
    },
    compoundVariants: [
      ...(activeItem === item.key ? colorVariantMapper<HorizontalNavigatorVariantType>([MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP], 'line') : []),
      {
        variant: 'pill',
        color: 'white',
        class: activeItem === item.key ? 'dsr-text-neutral-900 dsr-bg-neutral-50/80 dark:dsr-bg-neutral-800/80' : '',
      },
    ],
  });

  const buttonClassNames = cva({
    variants: {
      variant: {
        pill: 'dsr-px-5 dsr-py-2',
        line: 'dsr-py-1 dsr-px-3',
      },
    },
  });

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
      className={buttonClassNames({ variant })}
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
      className={clsx([
        color === 'white' && variant === 'pill' ? 'dsr-text-neutral-900' : 'dsr-text-color',
        liClassNames({ color, variant }),
        className, item.className,
      ])}
    >
      {item.link ? LinkWrapper(!item.isDisabled ? item.link : '', renderOption(item), {
        id: `${navigatorID}-${item.key}-tab`,
        className: buttonClassNames({ variant }),
      }) : renderButton(item)}
    </li>
  );

};

export default HorizontalNavigatorItem;