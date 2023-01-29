import React, { ReactNode, useContext } from 'react';
import Color from 'color';
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
  fill?: boolean,
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
  gridTemplate: React.CSSProperties
  supportAccordion?: boolean,
  isAccordionOpen?: boolean,
  onClick?: () => void,
};

const ItemListerItem = <Type extends { id: string }>({
  properties, item, itemIndex, gridTemplate, supportAccordion = false, isAccordionOpen = false,
  onClick = () => {}, isLoading = false, isPinned = false,
}: ItemListerItemProps<Type>) => {

  const { theme, isDarkTheme } = useContext(DSRContext);
  const { isEnabled, selectItem, isSelected, deselectItem } = useContext(SelectionContext);

  const tdClasses = clsx([
    'dsr-border-b dsr-h-full dsr-text-color dsr-bg',
    isPinned ? 'dsr-bg-background' : '',
    isPinned ? 'group-hover:dsr-bg-background' : isDarkTheme ? 'group-hover:dsr-bg-white/20' : 'group-hover:dsr-bg-gray-500/20',
  ]);

  return (
      <tr
          className="data-table-row dsr-grid dsr-items-center dsr-group"
          style={gridTemplate}
      >
          {supportAccordion && (
              <td
                  className={clsx([
                    'dsr-px-2 dsr-flex dsr-justify-center dsr-h-full dsr-items-center dsr-w-full dsr-text-center',
                    tdClasses,
                  ])}
                  style={{ borderBottomColor: Color(theme?.color).fade(0.85).string() }}
              >
                  <button onClick={onClick}>
                      <Icon icon={isAccordionOpen ? 'chevron-down' : 'chevron-right'} size={18} />
                  </button>
              </td>
          )}
          {isEnabled && (
              <td
                  className={clsx(['dsr-px-2', tdClasses])}
                  style={{ borderBottomColor: Color(theme?.color).fade(0.85).string() }}
              >
                  <div className="dsr-flex dsr-justify-center dsr-h-full dsr-items-center dsr-w-full dsr-py-3 dsr-text-center">
                      {isLoading ? <SkeletonItem h="1.25rem" w="1.25rem" /> : (
                          <input
                              type="checkbox"
                              checked={isSelected?.(item?.id ?? '')}
                              onChange={() => isSelected?.(item?.id ?? '') ? deselectItem?.(item?.id ?? '') : selectItem?.(item?.id ?? '')}
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
                        'dsr-py-2 dsr-px-3 dsr-flex dsr-items-center',
                        tdClasses,
                        p?.className,
                      ])}
                      style={{
                        textAlign: p.textAlign,
                        fontSize: p.fontSize,
                        borderBottomColor: Color(theme?.color).fade(0.85).string(),
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