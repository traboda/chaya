import React from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { cva, cx } from '../../utils/cva';
import { LinkWrapper } from '../../utils/misc';
import Icon from '../Icon';
import Badge from '../Badge';
import {
  colorVariantMapper,
  MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP, EMPTY_COLOR_MAP,
} from '../../utils/classMaps/colors';

import {
  HorizontalNavigatorItemProps,
  HorizontalNavigatorItemType,
  HorizontalNavigatorVariantType,
} from './HorizontalNavigatorItem.types';



const HorizontalNavigatorItem = ({
  item, activeItem, badgeProps, variant = 'pill', className, navigatorID, onClickItem = () => {}, color = 'primary',
}: HorizontalNavigatorItemProps) => {


  const liClassNames = cva({
    base: [
      'outline-1 focus-visible:outline duration-200 transition text-color',
      'rounded-lg transition-background outline-2 no-underline',
      item?.isDisabled && 'opacity-60 cursor-not-allowed',
      activeItem === item.key && 'active font-semibold',
    ],
    variants: {
      color: EMPTY_COLOR_MAP,
      variant: {
        boxed: [],
        minimal: [
          'transition-all rounded-lg gap-2 border-0 py-1 px-3',
          activeItem !== item.key && !item?.isDisabled && 'hover:bg-neutral-400/20 dark:hover:bg-neutral-500/20',
          activeItem === item.key && 'bg-neutral-300/20 dark:bg-neutral-500/20 mx-1',
        ],
        pill: [
          'px-5 py-2',
          activeItem === item.key && 'text-primaryTextColor z-[1000]',
          activeItem !== item.key && !item?.isDisabled && 'hover:bg-neutral-400/20 dark:hover:bg-neutral-500/3',
        ],
        line: [
          'transition-all rounded-lg gap-2 border-0 py-1 px-3',
          activeItem !== item.key && !item?.isDisabled && 'hover:bg-neutral-400/20 dark:hover:bg-neutral-500/20',
          activeItem && 'mb-2',
        ],
      },
    },
    compoundVariants: [
      ...(activeItem === item.key ? colorVariantMapper<HorizontalNavigatorVariantType>([MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP], 'line') : []),
      {
        variant: 'pill', color: 'white',
        className: [
          'dark:text-neutral-100',
          activeItem === item.key && 'text-neutral-900 bg-neutral-50/80 dark:bg-neutral-100/80 dark:text-neutral-900',
        ],
      },
      {
        variant: 'pill', color: 'contrast',
        className: [
          activeItem === item.key && 'text-neutral-100 dark:text-neutral-900',
        ],
      },
    ],
  });

  const renderOption = (item: HorizontalNavigatorItemType) => (
    <div
      className={clsx([
        'flex w-full justify-between items-center gap-2',
      ])}
    >
      <div className="flex items-center gap-2 text-left">
        {item.icon && <span className="w-[16px]"><Icon icon={item.icon} size={16} /></span>}
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
      role="tab"
      type="button"
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
      className={cx([
        liClassNames({ color, variant }),
        className, item.className,
      ])}
    >
      {item.link ? LinkWrapper(!item.isDisabled ? item.link : '', renderOption(item), {
        id: `${navigatorID}-${item.key}-tab`,
      }) : renderButton(item)}
    </li>
  );

};

export default HorizontalNavigatorItem;