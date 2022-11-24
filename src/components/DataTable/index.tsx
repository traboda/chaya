import React, {ReactNode, useEffect, useRef, useState} from 'react';
import { nanoid } from 'nanoid';
import { throttle } from 'lodash';
import { useTheme } from "@emotion/react";

import ItemListerTitleBar from './title';
import ItemListerItem, { ItemListerProperty } from './item';
import InfiniteLoader from "../InfiniteLoader";
import SelectionHelper from "./SelectionHelper";

type DataTableProps = {
    properties: ItemListerProperty[],
    items: {
        id: string
    }[],
    icons?: {
        accordionOpened?: React.ReactElement,
        accordionClosed?: React.ReactElement
    },
    maxHeight?: string,
    isLoading?: boolean,
    canLoadMore?: boolean,
    onLoadMore?: () => void,
    emptyListRenderer?: () => ReactNode,
    currentSortAttribute?: string,
    allowSelection?: boolean,
    onSelect?: (args: { selectedIDs: string[], excludedIDs: string[] }) => void,
    sortOrder?: ('asc' | 'desc'),
    onSort?: (attribute: string, order: ('asc' | 'desc' | null)) => void,
    customTopBarRenderer?: () => React.ReactElement,
    loadable?: boolean,
    stickyRow?: object,
    widthUnit?: 'px' | 'fr' | 'rem' | 'em' | '%',
    canExpand?: boolean,
    accordionRenderer?: (c) => ReactNode,
}

const defaultIcons = {
    accordionOpened: <span style={{ fontSize: 13, lineHeight: 1, opacity: 0.9 }}>▼</span>,
    accordionClosed: <span style={{ fontSize: 13, lineHeight: 1, opacity: 0.9 }}>▶</span>
};

const DataTable = ({
    properties = [],
    items = [], icons: _icons,
    emptyListRenderer = () => <div />,
    isLoading = false, canLoadMore = false,
    allowSelection = false, onSelect = () => {},
    onLoadMore = () => {}, maxHeight = null,
    currentSortAttribute, sortOrder, onSort = () => null,
    customTopBarRenderer = () => <div />, loadable = true,
    canExpand = false, accordionRenderer = (_) => <div />,
    stickyRow = null, widthUnit = 'px'
}: DataTableProps) => {

    const { background } = useTheme();

    const icons = { ...defaultIcons, ..._icons};

    const TitleBarRef = useRef(null);
    const TitleTopRef = useRef(null);
    const scrollElement = useRef(null);
    const lastScrollTop = useRef(0);

    const [titleTopHeight, setTitleTopHeight] = useState(0);
    const [scrollDir, setScrollDir] = useState('up');
    const [tableWidth, setTableWidth] = useState(1000);
    const [activeIndex, setActiveIndex] = useState([]);

    useEffect(() => {
        const handleScroll = throttle(() => {
            const st = scrollElement.current.scrollTop;
            if (st !== lastScrollTop.current) { // not horizontal scrolling
                setScrollDir(st > lastScrollTop.current ? 'down' : 'up');
                lastScrollTop.current = Math.max(st, 0);
            }
        }, 200);

        if (scrollElement.current) scrollElement.current.addEventListener('scroll', handleScroll, false);

        const resize_ob = new ResizeObserver(entries => setTitleTopHeight(entries[0].contentRect.height));
        if (TitleTopRef.current) {
            setTitleTopHeight(TitleTopRef.current.clientHeight);
            resize_ob.observe(TitleTopRef.current);
        }

        return () => {
            if (scrollElement.current) scrollElement.current.removeEventListener('scroll', handleScroll);
            if (TitleTopRef.current) resize_ob.unobserve(TitleBarRef.current);
        }
    }, [!isLoading && items?.length === 0]);

    const calculateRemainingWidth = () => {
        let usedWidth = 0;
        if(allowSelection) usedWidth += 60;
        properties.forEach((property) => {
            if (!property.fill && !property?.isHidden)
                usedWidth += property?.width ? property.width : 100;
        });
        return Math.max(tableWidth - usedWidth, 200);
    }

    const gridTemplate = (() => {
        let _divide = [];
        if(canExpand) _divide.push({ width: 60, });
        if(allowSelection) _divide.push({ ..._divide, width: 60 });
        const propConfigs = properties.filter((p) => !p.isHidden)
        _divide =  _divide?.length > 0 ? [..._divide, ...propConfigs] : propConfigs;
        let cols = '';
        for(const _col of _divide)
            cols += _col?.width ? `${_col.width}${widthUnit} ` : _col?.fill ?  `${calculateRemainingWidth()}px ` : '100px ';
        return { gridTemplateColumns: cols };
    })();

    const toggleAccordion = (index) => {
        if(activeIndex.includes(index)) setActiveIndex(activeIndex.filter((i) => i !== index));
        else  setActiveIndex([...activeIndex, index])
    }

    return (
        <SelectionHelper isEnabled={allowSelection} onSelect={onSelect}>
            <div>
                {(!isLoading && items?.length === 0 && typeof emptyListRenderer === "function") ? (
                    <div>
                        {emptyListRenderer()}
                    </div>
                ) : (
                    <div style={{ overflowX: maxHeight ? 'auto' : null, maxHeight: maxHeight }} ref={scrollElement}>
                        <div
                            ref={TitleTopRef}
                            className="transition-opacity sticky left-0 top-0 z-40"
                            style={{
                                background,
                                pointerEvents: scrollDir === 'up' ? 'auto' : 'none',
                                opacity: scrollDir === 'up' ? 1 : 0
                            }}
                        >
                            {customTopBarRenderer()}
                        </div>
                        <table
                            className="flex flex-col transition-transform"
                            style={{ transform: scrollDir === 'down' ? `translateY(-${titleTopHeight}px)` : null }}
                        >
                            <div className="sticky z-50" ref={TitleBarRef} style={{ top: titleTopHeight }}>
                                <ItemListerTitleBar
                                    properties={properties}
                                    onSort={onSort}
                                    currentSortAttribute={currentSortAttribute}
                                    sortOrder={sortOrder}
                                    gridTemplate={gridTemplate}
                                    setWidth={setTableWidth}
                                    icons={icons}
                                    isAccordionsOpen={canExpand ? activeIndex.length > 0 : null}
                                    toggleAccordions={(open) =>
                                        setActiveIndex(open ? items.map((_, i) => i) : [])
                                    }
                                />
                                {stickyRow && (
                                    <ItemListerItem
                                        isPinned
                                        properties={properties}
                                        item={stickyRow}
                                        itemIndex={-1}
                                        icons={icons}
                                        gridTemplate={gridTemplate}
                                        supportAccordion={canExpand}
                                    />
                                )}
                            </div>
                            <tbody>
                                {items?.length > 0 && items.map((i, index) =>
                                    canExpand ? (
                                        <div className="accordion">
                                            <div className="accordion-item">
                                                <div>
                                                    <ItemListerItem
                                                        key={i.id ? i.id : nanoid()}
                                                        properties={properties}
                                                        item={i}
                                                        itemIndex={index}
                                                        icons={icons}
                                                        gridTemplate={gridTemplate}
                                                        onClick={() => toggleAccordion(index)}
                                                        supportAccordion={canExpand}
                                                        isAccordionOpen={activeIndex.includes(index)}
                                                    />
                                                </div>
                                                {activeIndex.includes(index) && <div className="accordion-content">
                                                    {accordionRenderer(i)}
                                                </div>}
                                            </div>
                                        </div>
                                    ) : (
                                        <ItemListerItem
                                            key={i.id ? i.id : nanoid()}
                                            properties={properties}
                                            item={i}
                                            itemIndex={index}
                                            gridTemplate={gridTemplate}
                                            icons={icons}
                                        />
                                    )
                                )}
                            </tbody>
                            {isLoading && Array(10).fill(0).map((_n) =>
                                <ItemListerItem
                                    key={nanoid()}
                                    properties={properties}
                                    isLoading
                                    gridTemplate={gridTemplate}
                                    icons={icons}
                                />
                            )}
                            <InfiniteLoader
                                loadable={loadable}
                                canLoadMore={canLoadMore}
                                isLoading={isLoading}
                                onLoadMore={onLoadMore}
                            />
                        </table>
                    </div>
                )}
            </div>
        </SelectionHelper>
    );

};

export default DataTable;