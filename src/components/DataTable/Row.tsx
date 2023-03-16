import React, { ReactNode, useContext } from 'react';
import clsx from 'clsx';

import { LinkWrapper } from '../../utils/misc';
import DSRContext from '../../contexts/DSRContext';
import Icon from '../Icon';
import SkeletonItem from '../SkeletonItem';

import SelectionContext from './SelectionContext';

export type ItemListerProperty<Type> = {
  id: string,
  label: ReactNode,
  labelClassName?: string,
  value: (self: Type, index?: number) => ReactNode,
  width?: number,
  link?: (self: Type) => string,
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
  variant?: Variant,
};

export type Variant = 'default' | 'grid' | 'striped-column' | 'striped-row';

const grid = 'dsr-border dsr-border-gray-500/80';

const ItemListerItem = <Type extends { id: string }>({
  properties, item, itemIndex, supportAccordion = false, isAccordionOpen = false,
  onClick = () => {}, isLoading = false, isPinned = false, variant = 'default',
}: ItemListerItemProps<Type>) => {

  const { isDarkTheme } = useContext(DSRContext);
  const { isEnabled, selectItem, isSelected, deselectItem } = useContext(SelectionContext);
  const stripedColumn = isDarkTheme ? 'even:dsr-bg-gray-700' : 'even:dsr-bg-gray-300' ;
  const stripedRow = isDarkTheme ? 'odd:dsr-bg-gray-700' : 'odd:dsr-bg-gray-300' ;

  const tdClasses = clsx([
    'dsr-h-full dsr-text-color',
    variant === 'grid' ? grid : 'dsr-border-b dsr-border-gray-500/20',
    isPinned ? 'dsr-bg-background' : '',
    isPinned ? 'group-hover:dsr-bg-background' : isDarkTheme ? 'group-hover:dsr-bg-white/20' : 'group-hover:dsr-bg-gray-500/20',
  ]);

  return (
      <tr className={clsx(['dsr-group', variant === 'striped-row' ? stripedRow : ''])}>
          {supportAccordion && (
          <td
              className={clsx([
                'dsr-px-2',
                tdClasses,
                variant === 'striped-column' ? stripedColumn : '',
              ])}
          >
              <button onClick={onClick}>
                  <Icon icon={isAccordionOpen ? 'chevron-down' : 'chevron-right'} size={18} />
              </button>
          </td>
          )}
          {isEnabled && (
          <td
              className={clsx([
                'dsr-px-2',
                tdClasses,
                variant === 'striped-column' ? stripedColumn : '',
              ])}
          >
              <div className="dsr-py-3 dsr-grid dsr-content-center">
                  {isLoading ? <SkeletonItem h="1.25rem" w="1.25rem" /> : (
                      <input
                          type="checkbox"
                          checked={isSelected?.(item?.id ?? '')}
                          onChange={() => isSelected?.(item?.id ?? '')
                            ? deselectItem?.(item?.id ?? '')
                            : selectItem?.(item?.id ?? '')
                        }
                      />
                  )}
              </div>
          </td>
          )}
          {properties?.length > 0 &&
            properties.filter((p) => !p.isHidden).map((p) => {
              const link = isLoading ? null : item && typeof p.link === 'function' ? p.link(item) : null;
              const renderer = (
                  <span className="dsr-flex dsr-items-center dsr-gap-1">
                      {isLoading ? <SkeletonItem h="1.75rem" w="80%" /> : item && p.value(item, itemIndex)}
                      {link && <span className="dsr-w-[16px]"><Icon icon="external-link" size={16} /></span>}
                  </span>
              );
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
                        textAlign: p.textAlign,
                        fontSize: p.fontSize,
                      }}
                      onClick={() => {
                        if (isEnabled) {
                          if (isSelected?.(item?.id ?? '')) deselectItem?.(item?.id ?? '');
                          else selectItem?.(item?.id ?? '');
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