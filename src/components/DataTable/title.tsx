import React, {useContext, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import classNames from 'classnames';
import Color from 'color';

import SortButton from './SortButton';

import { ItemListerProperty } from './item';
import SelectionContext from "./SelectionContext";


const TitleBar = styled.tr`
  display: grid;
  width: 100%;
  transition: transform 200ms ease;

  & > th {
    height: 100%;
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primaryTextColor};
    border-bottom: 2px solid ${({ theme }) => Color(theme.color).fade(0.85).string()};
  }
`;

type ItemListerTitleBarProps = {
    properties: ItemListerProperty[],
    onSort: (attribute: string, order: ('asc' | 'desc' | null)) => void,
    currentSortAttribute: string,
    sortOrder: 'asc' | 'desc' | null,
    gridTemplate: React.CSSProperties,
    setWidth?: (_width: number) => void
    isAccordionsOpen?: boolean,
    toggleAccordions?: (state: boolean) => void,
    icons: {
        accordionOpened: React.ReactNode,
        accordionClosed: React.ReactNode,
    }
}

const ItemListerTitleBar = ({
    properties, currentSortAttribute, sortOrder, icons, isAccordionsOpen = null, toggleAccordions = (_) => {},
    gridTemplate, onSort = () => null, setWidth = (_w) => {}
}: ItemListerTitleBarProps) => {

    const { isEnabled: isSelectEnabled, selectAll, deselectAll, isAllSelected } = useContext(SelectionContext)

    const barRef = useRef<HTMLTableRowElement>();

    useEffect(() => setWidth(barRef.current.offsetWidth), [barRef.current]);

    return (
        <TitleBar ref={barRef} style={gridTemplate}>
            {isAccordionsOpen != null && (
                <th className="flex justify-center h-full items-center text-center relative">
                    <button onClick={() => toggleAccordions(!isAccordionsOpen)}>
                        {isAccordionsOpen ? icons.accordionOpened : icons.accordionClosed}
                    </button>
                </th>
            )}
            {isSelectEnabled && (
                <th className="py-3">
                    <div className="flex justify-center h-full items-center text-center">
                        <input
                            type="checkbox"
                            checked={isAllSelected()}
                            onChange={() => isAllSelected() ? deselectAll() : selectAll()}
                        />
                    </div>
                </th>
            )}
            {properties?.length > 0 && (
                properties.filter((p) => !p.isHidden).map((p) => (
                    <th className="py-3" key={p.id} style={{ textAlign: p.textAlign }}>
                        {p?.allowSort ? (
                            <div className={classNames('flex items-center', p?.labelClassName)}>
                                <div className="px-2" style={{ width: 'auto', fontWeight: 600 }}>
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
                            </div>
                        ) : (
                            <div
                                className={classNames('flex items-center px-3', p?.labelClassName)}
                                style={{ width: 'auto', fontWeight: 600 }}
                            >
                                {p.label}
                            </div>
                        )}
                    </th>
                    )
                )
            )}
        </TitleBar>
    );

};

export default ItemListerTitleBar;