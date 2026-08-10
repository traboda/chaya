'use client';
import React, { ReactNode, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';

import mcs from '../../utils/merge';
import InfiniteLoader from '../InfiniteLoader';
import PageNavigator, { PageNavigatorProps } from '../PageNavigator';

import ItemListerItem, { DataTableVariant, ItemListerProperty } from './Row';
import SelectionHelper, { SelectionType } from './SelectionHelper';
import ItemListerTitleBar from './TitleBar';

export type { SelectionType };

export type DataTableProps<Type> = {
  properties: ItemListerProperty<Type>[];
  activePropertyIDs?: string[];
  sortablePropertyIDs?: string[];

  items: Type[];
  maxHeight?: string | number;
  isLoading?: boolean;

  emptyListRenderer?: () => ReactNode;

  customTopBarRenderer?: () => React.ReactElement;
  stickyRow?: Type;
  canExpand?: boolean;
  accordionRenderer?: (c: Type) => ReactNode;
  showTopBarOnEmpty?: boolean;
  variant?: DataTableVariant;
  classNames?: {
    wrapper?: string;
    table?: string;
    thead?: string;
    tbody?: string;
  };

  // pagination
  enablePagination?: boolean;
  itemsPerPage?: number;
  canLoadMore?: boolean;
  onLoadMore?: () => void;
  paginatorProps?: Omit<
    PageNavigatorProps,
    'totalCount' | 'itemsPerPage' | 'page' | 'setPage' | 'setItemsPerPage'
  >;
  page?: number;
  setPage?: (page: number) => void;
  totalCount?: number;

  // selection
  allowSelection?: boolean;
  selections?: SelectionType;
  onSelect?: (args: SelectionType) => void;

  // sorting
  currentSortAttribute?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (attribute: string, order?: 'asc' | 'desc') => void;
};

const DataTable = <Type extends { id: string }>({
  properties = [],
  items = [],
  classNames,
  activePropertyIDs,
  sortablePropertyIDs,
  emptyListRenderer = () => null,
  isLoading = false,
  canLoadMore = false,
  selections,
  allowSelection = false,
  onSelect = () => {},
  onLoadMore = () => {},
  maxHeight = 600,
  currentSortAttribute,
  sortOrder,
  onSort = () => null,
  customTopBarRenderer,
  canExpand = false,
  accordionRenderer = () => <div />,
  stickyRow,
  showTopBarOnEmpty = false,
  enablePagination = false,
  page = 1,
  setPage = () => {},
  paginatorProps,
  variant = 'default',
  totalCount = 1,
}: DataTableProps<Type>) => {
  const tableTopbarRef = useRef<HTMLTableSectionElement>(null);
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const activeProperties = useMemo(
    () =>
      properties
        .filter((p) => !p.isHidden && (!activePropertyIDs || activePropertyIDs.includes(p.id)))
        .map((p) => ({
          ...p,
          isSortable: sortablePropertyIDs
            ? sortablePropertyIDs.includes(p.id) || p.allowSort
            : p.allowSort,
        })),
    [properties, activePropertyIDs, sortablePropertyIDs]
  );

  const colsWidth = useMemo(() => {
    let divide: (string | number | undefined)[] = [];
    if (canExpand) divide.push(60);
    if (allowSelection) divide.push(60);
    divide = [...divide, ...activeProperties.map((p) => p.width)];
    return divide.map((col) => col ?? 'auto');
  }, [canExpand, allowSelection, activeProperties]);

  const toggleAccordion = (index: number) => {
    if (activeIndex && activeIndex.includes(index))
      setActiveIndex(activeIndex.filter((i) => i !== index));
    else setActiveIndex([...activeIndex, index]);
  };

  const colSpan = activeProperties.length + Number(canExpand) + Number(allowSelection);

  return (
    <SelectionHelper isEnabled={allowSelection} selections={selections} onSelect={onSelect}>
      {!isLoading &&
      items?.length === 0 &&
      typeof emptyListRenderer === 'function' &&
      !showTopBarOnEmpty ? (
        emptyListRenderer()
      ) : (
        <div
          ref={tableWrapperRef}
          className={mcs([
            'flex flex-grow flex-col overflow-hidden rounded-lg border',
            classNames?.wrapper,
          ])}
        >
          {customTopBarRenderer !== undefined && (
            <div ref={tableTopbarRef} className="text-color p-2">
              {customTopBarRenderer()}
            </div>
          )}
          <div style={{ maxHeight }} className="table-container overflow-auto">
            <table
              className={clsx([
                'data-table min-w-full border-spacing-0 transition-transform',
                'text-color border-collapse',
                classNames?.table,
              ])}
            >
              <thead
                className={clsx([
                  'sticky top-0 z-50 mb-2 shadow-sm',
                  variant === 'grid' ? 'border-light border' : 'shadow-gray-500/50',
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
                {items?.length > 0 ? (
                  items.map((i, index) =>
                    canExpand ? (
                      <React.Fragment key={i?.id ?? index}>
                        <ItemListerItem<Type>
                          properties={activeProperties}
                          item={i}
                          itemIndex={index}
                          onClick={() => toggleAccordion(index)}
                          supportAccordion={canExpand}
                          isAccordionOpen={activeIndex && activeIndex.includes(index)}
                          variant={variant}
                        />
                        {activeIndex?.includes(index) && (
                          <tr className="accordion-content data-table-row group border-light w-full border-y">
                            <td colSpan={colSpan}>{accordionRenderer(i)}</td>
                          </tr>
                        )}
                      </React.Fragment>
                    ) : (
                      <ItemListerItem<Type>
                        key={i.id ?? index}
                        properties={activeProperties}
                        item={i}
                        itemIndex={index}
                        variant={variant}
                      />
                    )
                  )
                ) : !isLoading && items?.length === 0 && typeof emptyListRenderer === 'function' ? (
                  <tr>
                    <td colSpan={colSpan}>{emptyListRenderer()}</td>
                  </tr>
                ) : null}
                {isLoading &&
                  Array(10)
                    .fill(0)
                    .map((_, index) => (
                      <ItemListerItem<Type>
                        key={`skeleton-${index}`}
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
                'border bg-neutral-500/10 dark:bg-neutral-800/80',
                'flex justify-start rounded-b-lg p-3 shadow-inner',
              ])}
            >
              <PageNavigator
                totalCount={totalCount}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                page={page}
                setPage={setPage}
                hideItemsPerPage
                buttonClassName="bg-background-lighten-1 dark:bg-background-darken-1"
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
