import React from 'react';
import styled from '@emotion/styled';
import classNames from 'classnames';

import SortButton from './SortButton';

import ItemListerItem, { ItemListerProperty } from './item';


const TitleBar = styled.div`
  display: grid;
  width: 100%;
  color: ${({ theme }) => theme.primaryTextColor};
  background: ${({ theme }) => theme.primary};
  font-size: 1.35rem;
  transition: transform 200ms ease;
`;

const PropertyWrapper = styled.div`
  padding: 1.35rem 0;
`;

type ItemListerTitleBarProps = {
    properties: ItemListerProperty[],
    onSort: (attribute: string, order: ('asc' | 'desc' | null)) => void,
    currentSortAttribute: string,
    sortOrder: 'asc' | 'desc' | null,
    stickyRow: object,
    titleTopRef: any,
    scrollDir: string
}

const ItemListerTitleBar = ({
    properties, currentSortAttribute, sortOrder, onSort = () => null, scrollDir, stickyRow, titleTopRef
}: ItemListerTitleBarProps) => {

    const generateTitleStyle = () => {
        const _divide = properties.filter((p) => !p.isHidden);
        let cols = '';
        for(const _col of _divide)
            cols += `minmax(${_col.minWidth || ((Number(_col.space) || 1) * 100) + 'px'}, ${_col.space || 1}fr) `;

        return { gridTemplateColumns: cols };
    };

    return (
        <div style={{ transform: `translateY(-${scrollDir === 'down' ? titleTopRef.current?.clientHeight : 0}px)` }}>
            <TitleBar style={generateTitleStyle()}>
                {properties?.length > 0 &&
                properties.filter((p) => !p.isHidden).map((p) =>
                    <PropertyWrapper key={p.id} style={{ textAlign: p.textAlign }}>
                        {p?.allowSort ?
                            <div className={classNames('flex items-center', p?.labelClassName)}>
                                <div className="pl-3 pr-2" style={{ width: 'auto', fontWeight: 600 }}>
                                    {p.label}
                                </div>
                                <div style={{ width: '30px', opacity: 0.75, fontSize: '90%' }}>
                                    <SortButton
                                        attribute={p.id}
                                        currentAttribute={currentSortAttribute}
                                        currentOrder={sortOrder}
                                        onSort={onSort}
                                    />
                                </div>
                            </div> :
                            <div className={classNames('px-3', p?.labelClassName)} style={{ width: 'auto', fontWeight: 600 }}>
                                {p.label}
                            </div>
                        }
                    </PropertyWrapper>
                )}
            </TitleBar>
            {stickyRow &&
            <ItemListerItem
                isShaded={false}
                properties={properties}
                item={stickyRow}
                itemIndex={-1}
                style={{ background: '#191c2d' }}
            />}
        </div>
    );

};

export default ItemListerTitleBar;