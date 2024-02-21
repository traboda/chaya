'use client';
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import InfiniteLoader from '../InfiniteLoader';
import PageNavigator from '../PageNavigator';

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
  maxHeight?: string,
  isLoading?: boolean,

  emptyListRenderer?: () => ReactNode,

  customTopBarRenderer?: () => React.ReactElement,
  stickyRow?: Type,
  canExpand?: boolean,
  accordionRenderer?: (c: Type) => ReactNode,
  showTopBarOnEmpty?: boolean
  variant?: DataTableVariant,

  // pagination
  enablePagination?: boolean,
  itemsPerPage?: number,
  canLoadMore?: boolean,
  onLoadMore?: () => void,
  itemPage?: number,
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
  activePropertyIDs,
  sortablePropertyIDs,
  emptyListRenderer = () => null,
  isLoading = false, canLoadMore = false,
  selections, allowSelection = false, onSelect = () => {},
  onLoadMore = () => {}, maxHeight,
  currentSortAttribute, sortOrder, onSort = () => null,
  customTopBarRenderer = () => <div />,
  canExpand = false, accordionRenderer = () => <div />,
  stickyRow, showTopBarOnEmpty = false, enablePagination = false,
  page = 1, setPage = () => {},
  variant = 'default', totalCount = 1,
}: DataTableProps<Type>) => {

  const titleBarRef = useRef<HTMLTableSectionElement>(null);
  const titleTopRef = useRef<HTMLDivElement>(null);
  const scrollElement = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  const [titleTopHeight, setTitleTopHeight] = useState(0);
  const [scrollDir, setScrollDir] = useState('up');
  const [activeIndex, setActiveIndex] = useState<number[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const st = scrollElement.current?.scrollTop;
      if (st && st !== lastScrollTop.current) { // not horizontal scrolling
        setScrollDir(st > lastScrollTop.current ? 'down' : 'up');
        lastScrollTop.current = Math.max(st, 0);
      }
    }, 200);

    if (scrollElement.current) scrollElement.current.addEventListener('scroll', handleScroll, false);

    const resizeObs = new ResizeObserver(entries => setTitleTopHeight(entries[0].contentRect.height));
    if (titleTopRef.current) {
      setTitleTopHeight(titleTopRef.current.clientHeight);
      resizeObs.observe(titleTopRef.current);
    }
    return () => {
      if (scrollElement.current) scrollElement.current.removeEventListener('scroll', handleScroll);
      if (titleTopRef.current && titleBarRef.current) resizeObs.unobserve(titleBarRef.current);
    };
  }, [!isLoading && items?.length === 0]);

  const activeProperties = useMemo(() => properties.filter(p => (
    !p.isHidden && (!activePropertyIDs || activePropertyIDs.includes(p.id))
  )).map((p) => ({
    ...p,
    isSortable: sortablePropertyIDs ? sortablePropertyIDs.includes(p.id) || p.allowSort : p.allowSort,
  })), [properties, activePropertyIDs, sortablePropertyIDs]);

  const colsWidth = useMemo(() => {
    let divide: (string | number | undefined)[] = [];
    if (canExpand) divide.push(40);
    if (allowSelection) divide.push(40);
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
            style={{
              overflowX: maxHeight ? 'auto' : undefined,
              maxHeight: maxHeight,
            }}
            className="dsr-bg-background dsr-shadow"
            ref={scrollElement}
          >
            <div
              ref={titleTopRef}
              className="dsr-transition-opacity dsr-sticky dsr-left-0 dsr-top-0 dsr-z-40 dsr-border-gray-200 dsr-bg-background-lighten-1 dark:dsr-bg-background-darken-1 dsr-border-b dsr-border-neutral-100/10"
              style={{
                pointerEvents: scrollDir === 'up' ? 'auto' : 'none',
                opacity: scrollDir === 'up' ? 1 : 0,
              }}
            >
              {customTopBarRenderer()}
            </div>
            <table
              className={clsx([
                'data-table dsr-transition-transform dsr-min-w-full dsr-border-spacing-0',
                'dsr-border-collapse dsr-border-gray-200',
              ])}
              style={{ transform: scrollDir === 'down' ? `translateY(-${titleTopHeight}px)` : undefined }}
            >
              <thead
                className={clsx([
                  'dsr-sticky dsr-z-50 mb-2 dsr-shadow-sm',
                  variant === 'grid' ? 'dsr-border dsr-border-gray-500/80 dsr-shadow-gray-500/80' : 'dsr-shadow-gray-500/50',
                ])}
                ref={titleBarRef}
                style={{ top: titleTopHeight }}
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
              <tbody>
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
                        <tr className="accordion-content data-table-row dsr-group dsr-w-full">
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
            {enablePagination ? (
              <PageNavigator
                totalCount={totalCount}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                page={page}
                setPage={setPage}
              />
            ) : (
              <InfiniteLoader
                canLoadMore={canLoadMore}
                isLoading={isLoading}
                onLoadMore={onLoadMore}
              />
            )}
          </div>
        )}
    </SelectionHelper>
  );
};

export default DataTable;