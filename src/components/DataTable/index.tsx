import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import InfiniteLoader from '../InfiniteLoader';

import ItemListerTitleBar from './TitleBar';
import ItemListerItem, { DataTableVariant, ItemListerProperty } from './Row';
import SelectionHelper from './SelectionHelper';

type DataTableProps<Type> = {
  properties: ItemListerProperty<Type>[],
  items: Type[],
  maxHeight?: string,
  isLoading?: boolean,
  canLoadMore?: boolean,
  onLoadMore?: () => void,
  emptyListRenderer?: () => ReactNode,
  currentSortAttribute?: string,
  allowSelection?: boolean,
  onSelect?: (args: { selectedIDs: string[], excludedIDs: string[] }) => void,
  sortOrder?: ('asc' | 'desc'),
  onSort?: (attribute: string, order?: ('asc' | 'desc')) => void,
  customTopBarRenderer?: () => React.ReactElement,
  loadable?: boolean,
  stickyRow?: Type,
  canExpand?: boolean,
  accordionRenderer?: (c: Type) => ReactNode,
  showTopBarOnEmpty?: boolean
  variant?: DataTableVariant,
};

const grid = 'dsr-border dsr-border-gray-500/80';

const DataTable = <Type extends { id: string }>({
  properties = [],
  items = [],
  emptyListRenderer = () => null,
  isLoading = false, canLoadMore = false,
  allowSelection = false, onSelect = () => {},
  onLoadMore = () => {}, maxHeight,
  currentSortAttribute, sortOrder, onSort = () => null,
  customTopBarRenderer = () => <div />, loadable = true,
  canExpand = false, accordionRenderer = () => <div />,
  stickyRow, showTopBarOnEmpty = false,
  variant = 'default',
}: DataTableProps<Type>) => {

  const titleBarRef = useRef(null);
  const titleTopRef = useRef<HTMLDivElement>(null);
  const scrollElement = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  const [titleTopHeight, setTitleTopHeight] = useState(0);
  const [scrollDir, setScrollDir] = useState('up');
  const [activeIndex, setActiveIndex] = useState<number[]>([]);

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

  const colsWidth = useMemo(() => {
    let divide: (string | number | undefined)[] = [];
    if (canExpand) divide.push(60);
    if (allowSelection) divide.push(60);
    divide = [...divide, ...properties.filter(p => !p.isHidden).map(p => p.width)];
    return divide.map(col => col ?? 'auto');
  }, [canExpand, allowSelection, properties]);

  const toggleAccordion = (index: number) => {
    if (activeIndex.includes(index)) setActiveIndex(activeIndex.filter((i) => i !== index));
    else setActiveIndex([...activeIndex, index]);
  };

  const colSpan = properties.filter(p => !p.isHidden).length + Number(canExpand) + Number(allowSelection);

  return (
      <SelectionHelper isEnabled={allowSelection} onSelect={onSelect}>
          {(!isLoading && items?.length === 0 && typeof emptyListRenderer === 'function' && !showTopBarOnEmpty) ?
            emptyListRenderer() : (
                <div
                    style={{
                      overflowX: maxHeight ? 'auto' : undefined,
                      maxHeight: maxHeight,
                    }}
                    ref={scrollElement}
                >
                    <div
                        ref={titleTopRef}
                        className="dsr-transition-opacity dsr-sticky dsr-left-0 dsr-top-0 dsr-z-40 dsr-bg-background"
                        style={{
                          pointerEvents: scrollDir === 'up' ? 'auto' : 'none',
                          opacity: scrollDir === 'up' ? 1 : 0,
                        }}
                    >
                        {customTopBarRenderer()}
                    </div>
                    <table
                        className={clsx([
                          'data-table dsr-transition-transform dsr-min-w-full dsr-border-spacing-0 ',
                          'dsr-border-collapse dsr-border-gray-200',
                        ])}
                        style={{ transform: scrollDir === 'down' ? `translateY(-${titleTopHeight}px)` : undefined }}
                    >
                        <thead
                            className={clsx([
                              'dsr-sticky dsr-z-50',
                              variant === 'grid' ? grid : '',
                            ])}
                            ref={titleBarRef}
                            style={{ top: titleTopHeight }}
                        >
                            <ItemListerTitleBar<Type>
                                properties={properties}
                                onSort={onSort}
                                currentSortAttribute={currentSortAttribute}
                                sortOrder={sortOrder}
                                colsWidth={colsWidth}
                                isAccordionsOpen={canExpand ? activeIndex.length > 0 : undefined}
                                toggleAccordions={(open) => setActiveIndex(open ? items.map((_, i) => i) : [])}
                            />
                            {stickyRow && (
                                <ItemListerItem<Type>
                                    isPinned
                                    properties={properties}
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
                                            properties={properties}
                                            item={i}
                                            itemIndex={index}
                                            onClick={() => toggleAccordion(index)}
                                            supportAccordion={canExpand}
                                            isAccordionOpen={activeIndex.includes(index)}
                                            variant={variant}
                                        />
                                        {activeIndex.includes(index) && (
                                            <tr className="accordion-content data-table-row dsr-group dsr-w-full">
                                                <td colSpan={colSpan}>{accordionRenderer(i)}</td>
                                            </tr>
                                        )}
                                    </>
                                ) : (
                                    <ItemListerItem<Type>
                                        key={i.id ? i.id : nanoid()}
                                        properties={properties}
                                        item={i}
                                        itemIndex={index}
                                        variant={variant}
                                    />
                                ),
                              ) : (!isLoading && items?.length === 0 && typeof emptyListRenderer === 'function') ?
                                (
                                    <tr>
                                        <td colSpan={colSpan}>
                                            {emptyListRenderer()}
                                        </td>
                                    </tr>
                                ) : null}

                            {isLoading && Array(10).fill(0).map(() => (
                                <ItemListerItem<Type>
                                    key={nanoid()}
                                    properties={properties}
                                    isLoading
                                    variant={variant}
                                />
                            ))}
                        </tbody>
                    </table>
                    <InfiniteLoader
                        loadable={loadable}
                        canLoadMore={canLoadMore}
                        isLoading={isLoading}
                        onLoadMore={onLoadMore}
                    />
                </div>
            )}
      </SelectionHelper>
  );
};

export default DataTable;