import React, { ReactNode, useContext } from 'react';
import clsx from 'clsx';

import { LinkWrapper } from '../../utils/misc';
import DSRContext from '../../contexts/DSRContext';
import Icon, { IconInputType } from '../Icon';
import SkeletonItem from '../SkeletonItem';
import Checkbox from '../Checkbox';

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

const grid = 'dsr-border dsr-border-gray-500/60';
const stripedColumn = 'dark:odd:dsr-bg-neutral-900/50 dark:even:dsr-bg-neutral-800 odd:dsr-bg-white even:dsr-bg-[#f1f3f3]' ;
const stripedRow = 'dark:odd:dsr-bg-neutral-900/50 dark:even:dsr-bg-neutral-900 odd:dsr-bg-white even:dsr-bg-[#f1f3f3] ';


const ItemListerItem = <Type extends { id: string }>({
  properties, item, itemIndex, supportAccordion = false, isAccordionOpen = false,
  onClick = () => {}, isLoading = false, isPinned = false, variant = 'default',
}: ItemListerItemProps<Type>) => {

  const { isDarkTheme } = useContext(DSRContext);
  const { isEnabled, selectedIDs, selectItem, isSelected, deselectItem } = useContext(SelectionContext);

  const tdClasses = clsx([
    'dsr-h-full dsr-text-color',
    variant === 'grid' ? grid : 'dsr-border-b dsr-border-gray-500/20',
    isPinned ? 'dsr-bg-background' : '',
    isPinned ? 'group-hover:dsr-bg-background' : isDarkTheme ? 'group-hover:dsr-bg-neutral-800' : 'group-hover:dsr-bg-gray-500/20',
  ]);

  return (
    <tr className={clsx(['dsr-group', variant === 'striped-row' ? stripedRow : ''])}>
      {supportAccordion && (
        <td
          className={clsx([
            'dsr-px-2 dsr-text-center',
            tdClasses,
            variant === 'striped-column' ? stripedColumn : '',
          ])}
        >
          <button onClick={onClick} className="dsr-flex">
            <Icon
              icon="chevron-right"
              size={18}
              className={clsx([
                'dsr-transition-transform',
                isAccordionOpen ? 'dsr-rotate-90' : '',
              ])}
            />
          </button>
        </td>
      )}
      {isEnabled && (
        <td
          className={clsx([
            'dsr-px-2 dsr-text-center',
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
      {properties?.length > 0 && properties.filter(p => !p.isHidden).map((p, index) => {
        const link = isLoading ? null : item && typeof p.link === 'function' ? p.link(item) : null;
        const contentRenderer = isLoading ? <SkeletonItem h="1.75rem" w="80%" /> : item && p.value(item, itemIndex);
        const renderer = link || (p?.onClick && typeof (p?.onClick) === 'function') ? (
          <span className={`group-[${p?.id}-${index}]-row`}>
            {contentRenderer}
            <span className="dsr-w-[16px] dsr-opacity-0 group-hover:dsr-opacity-100 dsr-inline-block dsr-ml-1">
              <Icon className="dsr-inline" icon="external-link" size={16} />
            </span>
          </span>
        ) : contentRenderer;
        return (
          <td
            key={link ? null : p.id}
            className={clsx([
              'dsr-py-2 dsr-px-3',
              tdClasses,
              variant === 'striped-column' ? stripedColumn : '',
              p?.className,
            ])}
            style={{
              textAlign: p.textAlign ?? 'left',
              fontSize: p.fontSize,
            }}
            onClick={() => {
              if (p?.onClick && typeof (p.onClick) === 'function' && item) p.onClick(item);
              else if (isEnabled) {
                if (isSelected?.(item?.id ?? '')) deselectItem?.(item?.id ?? '');
                else if (selectedIDs && selectedIDs?.length > 0) selectItem?.(item?.id ?? '');
              }
            }}
          >
            {link ? LinkWrapper(link, renderer, { className: 'dsr-text-primary' }) : renderer}
          </td>
        );
      })}
    </tr>
  );
};

export default ItemListerItem;