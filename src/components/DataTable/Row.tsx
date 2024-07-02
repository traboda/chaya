import React, { ReactNode, useContext } from 'react';
import clsx from 'clsx';

import { LinkWrapper } from '../../utils/misc';
import { IconInputType } from '../Icon';
import SkeletonItem from '../SkeletonItem';
import Checkbox from '../Checkbox';
import mcs from '../../utils/merge';

import SelectionContext from './SelectionContext';

export type ItemListerProperty<Type> = {
  id: string,
  icon?: IconInputType,
  label: ReactNode,
  labelClassName?: string,
  value: (self: Type, index?: number) => ReactNode,
  width?: number,
  link?: (self: Type) => string,
  onClick?: (self: Type) => void,
  className?: string,
  textAlign?: 'center' | 'left' | 'right',
  fontSize?: string
  allowSort?: boolean,
  isHidden?: boolean,
  stickRight?: boolean,
};

type ItemListerItemProps<Type> = {
  properties: ItemListerProperty<Type>[],
  item?: Type,
  itemIndex?: number,
  isLoading?: boolean,
  isPinned?: boolean,
  supportAccordion?: boolean,
  isAccordionOpen?: boolean,
  onClick?: () => void,
  variant?: DataTableVariant,
};

export type DataTableVariant = 'default' | 'grid' | 'striped-column' | 'striped-row';

const grid = 'border dark:border-neutral-500/70 border-neutral-500/20';
const stripedColumn = 'dark:odd:bg-neutral-900/50 dark:even:bg-neutral-800 odd:bg-white even:bg-[#f1f3f3]' ;
const stripedRow = 'dark:odd:bg-neutral-900/50 odd:bg-white dark:even:bg-neutral-900 even:bg-[#f1f3f3]';


const ItemListerItem = <Type extends { id: string }>({
  properties, item, itemIndex, supportAccordion = false, isAccordionOpen = false,
  onClick = () => {}, isLoading = false, isPinned = false, variant = 'default',
}: ItemListerItemProps<Type>) => {

  const { isEnabled, selectedIDs, selectItem, isSelected, deselectItem } = useContext(SelectionContext);

  const tdClasses = clsx([
    'h-full text-color',
    variant === 'grid' ? grid : 'border-b dark:border-neutral-500/70 border-neutral-500/20',
    isSelected?.(item?.id ?? '') ? 'bg-blue-200/20' : isPinned ? 'bg-background' : '',
    isPinned ? 'group-hover:bg-background' : 'dark:group-hover:bg-neutral-700/30 group-hover:bg-gray-300/30',
  ]);

  return (
    <tr className={clsx(['group', variant === 'striped-row' ? stripedRow : ''])}>
      {supportAccordion && (
        <td
          className={clsx([
            'p-2 text-center',
            tdClasses,
            variant === 'striped-column' ? stripedColumn : '',
          ])}
        >
          <button
            aria-label={isAccordionOpen ? 'Collapse' : 'Expand'}
            onClick={onClick}
            className="flex w-full justify-center"
            title={isAccordionOpen ? 'Collapse' : 'Expand'}
          >
            <i
              title={isAccordionOpen ? 'Open' : 'Closed'}
              className={clsx([
                'ri-arrow-right-s-line text-xl',
                'transition-transform',
                isAccordionOpen ? 'rotate-90' : '',
              ])}
            />
          </button>
        </td>
      )}
      {isEnabled && (
        <td
          className={clsx([
            'p-2 text-center',
            tdClasses,
            variant === 'striped-column' ? stripedColumn : '',
          ])}
        >
          {isLoading ? <SkeletonItem h="1.25rem" w="1.25rem" /> : (
            <Checkbox
              label=""
              value=""
              isChecked={isSelected?.(item?.id ?? '')}
              onChange={() => isSelected?.(item?.id ?? '')
                ? deselectItem?.(item?.id ?? '')
                : selectItem?.(item?.id ?? '')}
            />
          )}
        </td>
      )}
      {properties?.length > 0 && properties.map((p, index) => {
        const link = isLoading ? null : item && typeof p.link === 'function' ? p.link(item) : null;
        const contentRenderer = isLoading ? <SkeletonItem h="1.75rem" w="80%" /> : item && p.value(item, itemIndex);
        const renderer = link || (p?.onClick && typeof (p?.onClick) === 'function') ? (
          <span className={`group-[${p?.id}-${index}]-row`}>
            {contentRenderer}
            <span className="w-[16px] opacity-0 group-hover:opacity-100 inline-block ml-1">
              <i className="ri-external-link-line" />
            </span>
          </span>
        ) : contentRenderer;
        return (
          <td
            key={link ? null : p.id}
            className={mcs([
              'p-3',
              tdClasses,
              link && 'cursor-pointer text-blue-600',
              p.stickRight ? 'sticky right-0 z-[5]' : '',
              p.stickRight ?
                index % 2 == 0 && variant === 'striped-column' ? 'bg-neutral-200 dark:bg-neutral-900' :
                  variant == 'striped-row' ?
                    (itemIndex || 1) % 2 != 0 ? 'dark:!bg-neutral-900 !bg-[#f1f3f3]' : 'dark:!bg-neutral-900/50 !bg-white'
                    : 'bg-background' : '',
              p.textAlign == 'right' ? 'text-right' : p.textAlign == 'center' ? 'text-center' : 'text-left',
              variant === 'striped-column' ? stripedColumn : '',
              p?.className,
            ])}
            style={{
              fontSize: p.fontSize,
              margin: '1px',
              boxShadow: p.stickRight ? 'inset 2px 0px 0px 0px rgba(50, 50, 50, 0.1)' : undefined,
            }}
            onClick={() => {
              if (p?.onClick && typeof (p.onClick) === 'function' && item) p.onClick(item);
              else if (isEnabled) {
                if (isSelected?.(item?.id ?? '')) deselectItem?.(item?.id ?? '');
                else if (selectedIDs && selectedIDs?.length > 0) selectItem?.(item?.id ?? '');
              }
            }}
          >
            {link ? LinkWrapper(link, renderer) : renderer}
          </td>
        );
      })}
    </tr>
  );
};

export default ItemListerItem;