import React, { useContext, useEffect, useRef } from 'react';
import Color from 'color';
import clsx from 'clsx';

import DSRContext from '../../contexts/DSRContext';
import Icon from '../Icon';

import SortButton from './SortButton';
import { ItemListerProperty } from './Row';
import SelectionContext from './SelectionContext';

type ItemListerTitleBarProps<Type> = {
  properties: ItemListerProperty<Type>[],
  onSort: (attribute: string, order?: ('asc' | 'desc')) => void,
  currentSortAttribute?: string,
  sortOrder?: 'asc' | 'desc',
  gridTemplate: React.CSSProperties,
  setWidth?: (width: number) => void
  isAccordionsOpen?: boolean,
  toggleAccordions?: (state: boolean) => void,
};

const thClasses = 'dsr-h-full dsr-bg-primary dsr-text-color';

const ItemListerTitleBar = <Type extends { id: string }>({
  properties, currentSortAttribute, sortOrder, isAccordionsOpen = undefined, toggleAccordions = () => {},
  gridTemplate, onSort = () => null, setWidth = () => {},
}: ItemListerTitleBarProps<Type>) => {

  const { theme } = useContext(DSRContext);
  const { isEnabled: isSelectEnabled, selectAll, deselectAll, isAllSelected } = useContext(SelectionContext);

  const barRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => { if (barRef.current) setWidth(barRef.current.offsetWidth); }, [barRef.current]);

  return (
      <div
          className="dsr-grid dsr-w-full dsr-transition-transform"
          ref={barRef}
          style={gridTemplate}
      >
          {isAccordionsOpen != null && (
              <th
                  style={{ borderBottomColor: Color(theme?.color).fade(0.85).toString() }}
                  className={clsx([
                    'dsr-flex dsr-justify-center dsr-h-full dsr-items-center dsr-text-center dsr-relative dsr-border-b-2',
                    thClasses,
                  ])}
              >
                  <button onClick={() => toggleAccordions(!isAccordionsOpen)}>
                      <Icon icon={isAccordionsOpen ? 'chevron-down' : 'chevron-right'} size={18} />
                  </button>
              </th>
          )}
          {isSelectEnabled && (
              <th
                  className={clsx(['dsr-py-3', thClasses])}
                  style={{ borderBottomColor: Color(theme?.color).fade(0.85).toString() }}
              >
                  <div className="dsr-flex dsr-justify-center dsr-h-full dsr-items-center dsr-text-center">
                      <input
                          type="checkbox"
                          checked={isAllSelected?.()}
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
            ),
            )
          )}
      </div>
  );

};

export default ItemListerTitleBar;