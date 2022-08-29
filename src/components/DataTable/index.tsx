import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { throttle } from 'lodash';

import ItemListerTitleBar from './title';
import ItemListerItem, { ItemListerProperty } from './item';
import InfiniteLoader from "../InfiniteLoader";
import { useTheme } from "@emotion/react";
import SelectionHelper from "./SelectionHelper";

type ItemListerProps = {
    properties: ItemListerProperty[],
    items: {
        id: string
    }[],
    labels?: {
        description?: string,
        endOfList?: string
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
}

const ItemLister = ({
    properties = [],
    items = [], labels,
    emptyListRenderer = () => <div />,
    isLoading = false, canLoadMore = false,
    allowSelection = false, onSelect = () => {},
    onLoadMore = () => {}, maxHeight = null,
    currentSortAttribute, sortOrder, onSort = () => null,
    customTopBarRenderer = () => <div />, loadable = true,
    stickyRow = null,
}: ItemListerProps) => {

    const { background } = useTheme();

    const TitleBarRef = useRef(null);
    const TitleTopRef = useRef(null);
    const scrollElement = useRef(null);
    const lastScrollTop = useRef(0);
    const [titleTopHeight, setTitleTopHeight] = useState(0);
    const [scrollDir, setScrollDir] = useState('up');

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

    return (
        <SelectionHelper isEnabled={allowSelection} onSelect={onSelect}>
            <div>
                {labels?.description &&
                    <div className="mb-2 py-3 px-1">
                        {labels?.description}
                    </div>}
                {(!isLoading && items?.length === 0) ? (
                    <div>
                        {customTopBarRenderer()}
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
                                />
                                {stickyRow && (
                                    <ItemListerItem
                                        isPinned
                                        isShaded={false}
                                        properties={properties}
                                        item={stickyRow}
                                        itemIndex={-1}
                                    />
                                )}
                            </div>
                            <tbody>
                                {items?.length > 0 && items.map((i, index) =>
                                    <ItemListerItem
                                        key={i.id ? i.id : nanoid()}
                                        isShaded={index % 2 === 0}
                                        properties={properties}
                                        item={i}
                                        itemIndex={index}
                                    />
                                )}
                            </tbody>
                            {isLoading && Array(10).fill(0).map((_n, index) =>
                                <ItemListerItem
                                    key={nanoid()}
                                    isShaded={index % 2 === 0}
                                    properties={properties}
                                    isLoading
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

export default ItemLister;