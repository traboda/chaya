import React, { useContext } from 'react';
import clsx from 'clsx';

import Checkbox from '../Checkbox';
import mcs from '../../utils/merge';

import SortButton from './SortButton';
import { ItemListerProperty } from './Row';
import SelectionContext from './SelectionContext';

type ItemListerTitleBarProps<Type> = {
  properties: ItemListerProperty<Type>[];
  onSort: (attribute: string, order?: 'asc' | 'desc') => void;
  currentSortAttribute?: string;
  sortOrder?: 'asc' | 'desc';
  colsWidth: (string | number)[];
  isAccordionsOpen?: boolean;
  toggleAccordions?: (state: boolean) => void;
  variant?: string
};


const ItemListerTitleBar = <Type extends { id: string }>({
  properties,
  currentSortAttribute,
  sortOrder,
  variant,
  isAccordionsOpen = undefined,
  toggleAccordions = () => {},
  colsWidth,
  onSort = () => null,
}: ItemListerTitleBarProps<Type>) => {
  const {
    isEnabled: isSelectEnabled,
    selectAll,
    deselectAll,
    isAllSelected,
  } = useContext(SelectionContext);

  let i = 0;

  const thClasses = clsx([
    'h-full text-color py-2',
    variant !== 'striped-column' && 'bg-background-lighten-1 dark:background-darken-2',
    variant === 'grid' && 'border-x border-neutral-600/50',
  ]);

  return (
    <React.Fragment>
      {isAccordionsOpen != null && (
        <th
          style={{ width: colsWidth[i++] }}
          className={clsx([
            'relative px-2', thClasses,
          ])}
        >
          <button
            onClick={() => toggleAccordions(!isAccordionsOpen)}
            className="flex"
          >
            <i
              className={clsx([
                'ri-arrow-right-s-line',
                'transition-transform',
                isAccordionsOpen ? 'rotate-90' : '',
              ])}
            />
          </button>
        </th>
      )}
      {isSelectEnabled && (
        <th
          className={clsx([thClasses, 'bg-background'])}
          style={{ width: colsWidth[i++] }}
        >
          <div className="flex justify-center h-full items-center text-center">
            <Checkbox
              label=""
              value=""
              isChecked={isAllSelected?.()}
              onChange={() =>
                isAllSelected?.() ? deselectAll?.() : selectAll?.()
              }
            />
          </div>
        </th>
      )}
      {properties?.length > 0 &&
        properties
          .map((p, i) => (
            <th
              className={clsx([
                thClasses,
                p.stickRight ? 'sticky right-0 z-[10]' : '',
                i % 2 == 0 && variant === 'striped-column' ? 'bg-neutral-200 dark:bg-neutral-900' : '',
                'group',
              ])}
              key={p.id}
              style={{
                textAlign: p.textAlign,
                width: colsWidth[i++],
                boxShadow: p.stickRight ? 'inset 2px 0px 0px 0px rgba(50, 50, 50, 0.1)' : undefined,
              }}
            >
              <div
                className={mcs([
                  'flex font-semibold w-full items-center px-3 m-auto',
                  p?.labelClassName,
                  p.textAlign == 'right' ? 'justify-end text-right' : p.textAlign == 'center' ? 'justify-center text-center' : 'justify-start text-left',
                ])}
              >
                {p.label}
                {p.allowSort ? (
                  <div
                    className={clsx([
                      'w-[16px] flex items-center ml-1',
                      currentSortAttribute !== p.id && 'opacity-20 group-hover:opacity-80',
                    ])}
                  >
                    <SortButton
                      attribute={p.id}
                      currentAttribute={currentSortAttribute}
                      currentOrder={sortOrder}
                      onSort={onSort}
                    />
                  </div>
                ) : null}
              </div>
            </th>
          ))}
    </React.Fragment>
  );
};

export default ItemListerTitleBar;
