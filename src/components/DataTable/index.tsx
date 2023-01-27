import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash';
import hyperid from 'hyperid';
 
import InfiniteLoader from '../InfiniteLoader';

import ItemListerTitleBar from './TitleBar';
import ItemListerItem, { ItemListerProperty } from './Row';
import SelectionHelper from './SelectionHelper';

const generateId = hyperid();

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
  widthUnit?: 'px' | 'fr' | 'rem' | 'em' | '%',
  canExpand?: boolean,
  accordionRenderer?: (c: Type) => ReactNode,
  showTopBarOnEmpty?: boolean
};

const DataTable = <Type extends { id: string }>({
  properties = [],
  items = [],
  emptyListRenderer = () => <div />,
  isLoading = false, canLoadMore = false,
  allowSelection = false, onSelect = () => {},
  onLoadMore = () => {}, maxHeight,
  currentSortAttribute, sortOrder, onSort = () => null,
  customTopBarRenderer = () => <div />, loadable = true,
  canExpand = false, accordionRenderer = () => <div />,
  stickyRow, widthUnit = 'px', showTopBarOnEmpty = false,
}: DataTableProps<Type>) => {

  const titleBarRef = useRef(null);
  const titleTopRef = useRef<HTMLDivElement>(null);
  const scrollElement = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  const [titleTopHeight, setTitleTopHeight] = useState(0);
  const [scrollDir, setScrollDir] = useState('up');
  const [tableWidth, setTableWidth] = useState(1000);
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

  const calculateRemainingWidth = () => {
    let usedWidth = 0;
    if (allowSelection) usedWidth += 60;
    properties.forEach((property) => {
      if (!property.fill && !property?.isHidden)
        usedWidth += property.width ?? 100;
    });
    return Math.max(tableWidth - usedWidth, 200);
  };

  const dummyCol = (width: number) => ({
    width,
    id: generateId(),
    label: undefined,
    value() { return undefined; },
  });

  const gridTemplate = useMemo(() => {
    let divide: ItemListerProperty<Type>[] = [];
    if (canExpand) divide.push(dummyCol(60));
    if (allowSelection) divide.push(dummyCol(60));
    const propConfigs = properties.filter(p => !p.isHidden);
    divide =  divide?.length > 0 ? [...divide, ...propConfigs] : propConfigs;
    let cols = '';
    for (const col of divide)
      cols += col?.width ? `${col.width}${widthUnit} ` : col?.fill ? `minmax(${calculateRemainingWidth()}px, 1fr) ` : '100px ';
    return { gridTemplateColumns: cols };
  }, [canExpand, allowSelection, widthUnit, properties]);

  const toggleAccordion = (index: number) => {
    if (activeIndex.includes(index)) setActiveIndex(activeIndex.filter((i) => i !== index));
    else  setActiveIndex([...activeIndex, index]);
  };

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
                        className="dsr-flex dsr-flex-col dsr-transition-transform dsr-min-w-full"
                        style={{ transform: scrollDir === 'down' ? `translateY(-${titleTopHeight}px)` : undefined }}
                    >
                        <div className="dsr-sticky dsr-z-50" ref={titleBarRef} style={{ top: titleTopHeight }}>
                            <ItemListerTitleBar<Type>
                                properties={properties}
                                onSort={onSort}
                                currentSortAttribute={currentSortAttribute}
                                sortOrder={sortOrder}
                                gridTemplate={gridTemplate}
                                setWidth={setTableWidth}
                                isAccordionsOpen={canExpand ? activeIndex.length > 0 : undefined}
                                toggleAccordions={(open) => setActiveIndex(open ? items.map((_, i) => i) : [])}
                            />
                            {stickyRow && (
                                <ItemListerItem<Type>
                                    isPinned
                                    properties={properties}
                                    item={stickyRow}
                                    itemIndex={-1}
                                    gridTemplate={gridTemplate}
                                    supportAccordion={canExpand}
                                />
                            )}
                        </div>
                        <tbody>
                            {items?.length > 0 ?
                              items.map((i, index) =>
                                canExpand ? (
                                    <div className="accordion">
                                        <div className="accordion-item">
                                            <div> 
                                                <ItemListerItem<Type>
                                                    key={i?.id ?? generateId()}
                                                    properties={properties}
                                                    item={i}
                                                    itemIndex={index}
                                                    gridTemplate={gridTemplate}
                                                    onClick={() => toggleAccordion(index)}
                                                    supportAccordion={canExpand}
                                                    isAccordionOpen={activeIndex.includes(index)}
                                                />
                                            </div>
                                            {activeIndex.includes(index) && (
                                                <div className="accordion-content">
                                                    {accordionRenderer(i)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <ItemListerItem<Type>
                                        key={i.id ? i.id : generateId()}
                                        properties={properties}
                                        item={i}
                                        itemIndex={index}
                                        gridTemplate={gridTemplate}
                                    />
                                ),
                              ) : (!isLoading && items?.length === 0 && typeof emptyListRenderer === 'function') ?
                                emptyListRenderer() : <div />}
                        </tbody>
                        {isLoading && Array(10).fill(0).map(() => (
                            <ItemListerItem<Type>
                                key={generateId()}
                                properties={properties}
                                isLoading
                                gridTemplate={gridTemplate}
                            />
                        ))}
                        <InfiniteLoader
                            loadable={loadable}
                            canLoadMore={canLoadMore}
                            isLoading={isLoading}
                            onLoadMore={onLoadMore}
                        />
                    </table>
                </div>
            )}
      </SelectionHelper>
  );
};

export default DataTable;