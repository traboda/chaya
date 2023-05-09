import React, { useContext } from 'react';
import Color from 'color';
import clsx from 'clsx';

import DSRContext from '../../contexts/DSRContext';
import Icon from '../Icon';
import Checkbox from '../Checkbox';

import SortButton from './SortButton';
import { ItemListerProperty } from './Row';
import SelectionContext from './SelectionContext';

type ItemListerTitleBarProps<Type> = {
  properties: ItemListerProperty<Type>[],
  onSort: (attribute: string, order?: ('asc' | 'desc')) => void,
  currentSortAttribute?: string,
  sortOrder?: 'asc' | 'desc',
  colsWidth: (string | number)[],
  isAccordionsOpen?: boolean,
  toggleAccordions?: (state: boolean) => void,
};

const thClasses = 'dsr-h-full dsr-bg-primary dsr-text-primaryTextColor';

const ItemListerTitleBar = <Type extends { id: string }>({
  properties, currentSortAttribute, sortOrder, isAccordionsOpen = undefined, toggleAccordions = () => {},
  colsWidth, onSort = () => null,
}: ItemListerTitleBarProps<Type>) => {

  const { theme } = useContext(DSRContext);
  const { isEnabled: isSelectEnabled, selectAll, deselectAll, isAllSelected } = useContext(SelectionContext);

  let i = 0;

  return (
    <tr className="dsr-transition-transform">
      {isAccordionsOpen != null && (
        <th
          style={{ borderBottomColor: Color(theme?.color).fade(0.85).toString(), width: colsWidth[i++] }}
          className={clsx([
            'dsr-relative dsr-px-2 dsr-py-3',
            thClasses,
          ])}
        >
          <button onClick={() => toggleAccordions(!isAccordionsOpen)} className="dsr-flex">
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
          className={clsx(['dsr-py-3', thClasses])}
          style={{ borderBottomColor: Color(theme?.color).fade(0.85).toString(), width: colsWidth[i++] }}
        >
          <div className="dsr-flex dsr-justify-center dsr-h-full dsr-items-center dsr-text-center">
            <Checkbox
              label=""
              value=""
              isChecked={isAllSelected?.()}
              onChange={() => isAllSelected?.() ? deselectAll?.() : selectAll?.()}
            />
          </div>
        </th>
      )}
      {properties?.length > 0 && (
        properties.filter((p) => !p.isHidden).map((p) => (
          <th
            className={clsx(['dsr-py-3', thClasses])}
            key={p.id}
            style={{
              textAlign: p.textAlign,
              borderBottomColor: Color(theme?.color).fade(0.85).toString(),
              width: colsWidth[i++],
            }}
          >
            {p?.allowSort ? (
              <div className={clsx(['dsr-flex dsr-items-center dsr-gap-1', p?.labelClassName])}>
                <div className="dsr-px-2 dsr-m-auto dsr-font-semibold">
                  {p.label}
                </div>
                <div className="dsr-w-[30px] dsr-opacity-75 dsr-text-[90%] dsr-w-[14px]">
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
                  'dsr-flex dsr-font-semibold dsr-items-center dsr-px-3 dsr-m-auto',
                  p?.labelClassName,
                ])}
              >
                {p.label}
              </div>
            )}
          </th>
        ))
      )}
    </tr>
  );

};

export default ItemListerTitleBar;