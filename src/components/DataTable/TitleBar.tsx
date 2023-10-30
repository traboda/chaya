import React, { useContext } from 'react';
import clsx from 'clsx';

import Icon from '../Icon';
import Checkbox from '../Checkbox';

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
    'dsr-h-full dsr-text-color dsr-py-2',
    variant !== 'striped-column' && 'dsr-bg-neutral-200 dark:dsr-bg-neutral-900',
    variant === 'grid' && 'dsr-border-x dsr-border-neutral-600/50',
  ]);

  return (
    <React.Fragment>
      {isAccordionsOpen != null && (
        <th
          style={{ width: colsWidth[i++] }}
          className={clsx([
            'dsr-relative dsr-px-2 dsr-border-b-color dsr-border-opacity-80', thClasses,
          ])}
        >
          <button
            onClick={() => toggleAccordions(!isAccordionsOpen)}
            className="dsr-flex"
          >
            <Icon
              icon="chevron-right"
              size={18}
              className={clsx([
                'dsr-transition-transform',
                isAccordionsOpen ? 'dsr-rotate-90' : '',
              ])}
            />
          </button>
        </th>
      )}
      {isSelectEnabled && (
        <th
          className={clsx(['dsr-border-b-color dsr-border-opacity-80', thClasses])}
          style={{ width: colsWidth[i++] }}
        >
          <div className="dsr-flex dsr-justify-center dsr-h-full dsr-items-center dsr-text-center">
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
          .filter((p) => !p.isHidden)
          .map((p, i) => (
            <th
              className={clsx([
                'dsr-border-b-color dsr-border-opacity-80', thClasses,
                i % 2 == 0 && variant === 'striped-column' ? 'dsr-bg-neutral-200 dark:dsr-bg-neutral-900' : 'dsr-bg-neutral-100 dark:dsr-bg-neutral-800',
              ])}
              key={p.id}
              style={{
                textAlign: p.textAlign,
                width: colsWidth[i++],
              }}
            >
              {p?.allowSort ? (
                <div
                  className={clsx([
                    'dsr-flex dsr-items-center dsr-w-full dsr-gap-1',
                    p?.labelClassName,
                  ])}
                >
                  <div
                    className="dsr-px-2 dsr-m-auto dsr-font-semibold dsr-flex dsr-items-center dsr-gap-2 dsr-w-full"
                    style={{ textAlign: p.textAlign ?? 'left' }}
                  >

                    {p.icon ? <Icon icon={p.icon} /> : null}
                    {p.label}
                  </div>
                  <div className="dsr-w-[30px] dsr-opacity-75 dsr-text-[90%]">
                    <SortButton
                      attribute={p.id}
                      currentAttribute={currentSortAttribute}
                      currentOrder={sortOrder}
                      onSort={onSort}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={clsx([
                    'dsr-flex dsr-font-semibold dsr-w-full dsr-items-center dsr-px-3 dsr-m-auto',
                    p?.labelClassName,
                    p.textAlign == 'right' ? 'dsr-justify-end' : p.textAlign == 'center' ? 'dsr-justify-center' : null,
                  ])}
                >
                  {p.label}
                </div>
              )}
            </th>
          ))}
    </React.Fragment>
  );
};

export default ItemListerTitleBar;
