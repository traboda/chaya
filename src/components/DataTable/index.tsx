'use client';
import React, { ReactNode, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import InfiniteLoader from '../InfiniteLoader';
import PageNavigator, { PageNavigatorProps } from '../PageNavigator';
import mcs from '../../utils/merge';

import ItemListerTitleBar from './TitleBar';
import ItemListerItem, { DataTableVariant, ItemListerProperty } from './Row';
import SelectionHelper, { SelectionType } from './SelectionHelper';

export type {
  SelectionType,
};

export type DataTableProps<Type> = {
  properties: ItemListerProperty<Type>[],
  activePropertyIDs?: string[],
  sortablePropertyIDs?: string[],

  items: Type[],
  maxHeight?: string | number,
  isLoading?: boolean,

  emptyListRenderer?: () => ReactNode,

  customTopBarRenderer?: () => React.ReactElement,
  stickyRow?: Type,
  canExpand?: boolean,
  accordionRenderer?: (c: Type) => ReactNode,
  showTopBarOnEmpty?: boolean
  variant?: DataTableVariant,
  classNames?: {
    wrapper?: string,
    table?: string,
    thead?: string,
    tbody?: string,
  }

  // pagination
  enablePagination?: boolean,
  itemsPerPage?: number,
  canLoadMore?: boolean,
  onLoadMore?: () => void,
  paginatorProps?: Omit<PageNavigatorProps, 'totalCount' | 'itemsPerPage' | 'page' | 'setPage' | 'setItemsPerPage'>,
  page?: number,
  setPage?: (page: number) => void,
  totalCount?: number,


  // selection
  allowSelection?: boolean,
  selections?: SelectionType,
  onSelect?: (args: SelectionType) => void,

  // sorting
  currentSortAttribute?: string,
  sortOrder?: ('asc' | 'desc'),
  onSort?: (attribute: string, order?: ('asc' | 'desc')) => void,

};

const DataTable = <Type extends { id: string }>({
  properties = [],
  items = [],
  classNames,
  activePropertyIDs,
  sortablePropertyIDs,
  emptyListRenderer = () => null,
  isLoading = false, canLoadMore = false,
  selections, allowSelection = false, onSelect = () => {},
  onLoadMore = () => {}, maxHeight = 600,
  currentSortAttribute, sortOrder, onSort = () => null,
  customTopBarRenderer = () => <div />,
  canExpand = false, accordionRenderer = () => <div />,
  stickyRow, showTopBarOnEmpty = false, enablePagination = false,
  page = 1, setPage = () => {}, paginatorProps,
  variant = 'default', totalCount = 1,
}: DataTableProps<Type>) => {

  const tableTopbarRef = useRef<HTMLTableSectionElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const activeProperties = useMemo(() => properties.filter(p => (
    !p.isHidden && (!activePropertyIDs || activePropertyIDs.includes(p.id))
  )).map((p) => ({
    ...p,
    isSortable: sortablePropertyIDs ? sortablePropertyIDs.includes(p.id) || p.allowSort : p.allowSort,
  })), [properties, activePropertyIDs, sortablePropertyIDs]);

  const colsWidth = useMemo(() => {
    let divide: (string | number | undefined)[] = [];
    if (canExpand) divide.push(60);
    if (allowSelection) divide.push(60);
    divide = [...divide, ...activeProperties.map(p => p.width)];
    return divide.map(col => col ?? 'auto');
  }, [canExpand, allowSelection, activeProperties]);

  const toggleAccordion = (index: number) => {
    if (activeIndex && activeIndex.includes(index)) setActiveIndex(activeIndex.filter((i) => i !== index));
    else setActiveIndex([...activeIndex, index]);
  };

  const colSpan = activeProperties.length + Number(canExpand) + Number(allowSelection);

  return (
    <SelectionHelper
      isEnabled={allowSelection}
      selections={selections}
      onSelect={onSelect}
    >
      {(!isLoading && items?.length === 0 && typeof emptyListRenderer === 'function' && !showTopBarOnEmpty) ?
        emptyListRenderer() : (
          <div
            ref={tableWrapperRef}
            className={mcs(['p-2 flex flex-col flex-grow', classNames?.wrapper])}
          >
            <div
              ref={tableTopbarRef}
              className="border-gray-200 text-color bg-background-lighten-1 dark:bg-background-darken-1 border-b border-neutral-100/10"
            >
              {customTopBarRenderer()}
            </div>
            <div
              style={{ maxHeight }}
              className="table-container overflow-auto border dark:border-neutral-500/70 border-neutral-500/20"
            >
              <table
                className={clsx([
                  'data-table transition-transform min-w-full border-spacing-0',
                  'border-collapse bg-background text-color',
                  classNames?.table,
                ])}
              >
                <thead
                  className={clsx([
                    'sticky z-50 mb-2 shadow-sm top-0',
                    variant === 'grid' ? 'border dark:border-neutral-500/70 border-neutral-500/20' : 'shadow-gray-500/50',
                    classNames?.thead,
                  ])}
                >
                  <ItemListerTitleBar<Type>
                    properties={activeProperties}
                    onSort={onSort}
                    currentSortAttribute={currentSortAttribute}
                    sortOrder={sortOrder}
                    colsWidth={colsWidth}
                    isAccordionsOpen={canExpand ? activeIndex.length > 0 : undefined}
                    toggleAccordions={(open) => setActiveIndex(open ? items.map((_, i) => i) : [])}
                    variant={variant}
                  />
                  {stickyRow && (
                    <ItemListerItem<Type>
                      isPinned
                      properties={activeProperties}
                      item={stickyRow}
                      itemIndex={-1}
                      supportAccordion={canExpand}
                      variant={variant}
                    />
                  )}
                </thead>
                <tbody className={classNames?.tbody}>
                  {items?.length > 0 ?
                    items.map((i, index) =>
                      canExpand ? (
                        <>
                          <ItemListerItem<Type>
                            key={i?.id ?? nanoid()}
                            properties={activeProperties}
                            item={i}
                            itemIndex={index}
                            onClick={() => toggleAccordion(index)}
                            supportAccordion={canExpand}
                            isAccordionOpen={activeIndex && activeIndex.includes(index)}
                            variant={variant}
                          />
                          {activeIndex?.includes(index) && (
                            <tr className="accordion-content border-y dark:border-neutral-500/70 border-neutral-500/20 data-table-row group w-full">
                              <td colSpan={colSpan}>{accordionRenderer(i)}</td>
                            </tr>
                          )}
                        </>
                      ) : (
                        <ItemListerItem<Type>
                          key={i.id ? i.id : nanoid()}
                          properties={activeProperties}
                          item={i}
                          itemIndex={index}
                          variant={variant}
                        />
                      ),
                    ) : (!isLoading && items?.length === 0 && typeof emptyListRenderer === 'function') ? (
                      <tr>
                        <td colSpan={colSpan}>
                          {emptyListRenderer()}
                        </td>
                      </tr>
                    ) : null}
                  {isLoading && Array(10).fill(0).map(() => (
                    <ItemListerItem<Type>
                      key={nanoid()}
                      properties={activeProperties}
                      isLoading
                      variant={variant}
                    />
                  ))}
                </tbody>
              </table>
              {!enablePagination ? (
                <InfiniteLoader
                  canLoadMore={canLoadMore}
                  isLoading={isLoading}
                  onLoadMore={onLoadMore}
                />
              ) : null}
            </div>
            {enablePagination ? (
              <div
                className={clsx([
                  'dark:bg-gray-900 bg-neutral-500/10 border dark:border-neutral-500/70 border-neutral-500/10',
                  'shadow-inner rounded-b-lg p-3 flex justify-start',
                ])}
              >
                <PageNavigator
                  totalCount={totalCount}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  page={page}
                  setPage={setPage}
                  hideItemsPerPage
                  buttonClassName="bg-white dark:bg-neutral-900"
                  {...paginatorProps}
                />
              </div>
            ) : null}
          </div>
        )}
    </SelectionHelper>
  );
};

export default DataTable;