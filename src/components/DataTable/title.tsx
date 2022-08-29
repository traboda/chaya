import React, {useContext} from 'react';
import styled from '@emotion/styled';
import classNames from 'classnames';

import SortButton from './SortButton';

import { ItemListerProperty } from './item';
import SelectionContext from "./SelectionContext";


const TitleBar = styled.tr`
  display: grid;
  width: 100%;
  color: ${({ theme }) => theme.primaryTextColor};
  transition: transform 200ms ease;

  & > * {
    height: 100%;
    background: ${({ theme }) => theme.primary};
  }
`;

type ItemListerTitleBarProps = {
    properties: ItemListerProperty[],
    onSort: (attribute: string, order: ('asc' | 'desc' | null)) => void,
    currentSortAttribute: string,
    sortOrder: 'asc' | 'desc' | null,
}

const ItemListerTitleBar = ({
    properties, currentSortAttribute, sortOrder, onSort = () => null
}: ItemListerTitleBarProps) => {

    const { isEnabled: isSelectEnabled, selectAll, deselectAll, isAllSelected } = useContext(SelectionContext)

    const generateTitleStyle = () => {
        let _divide = [];
        if(isSelectEnabled)
            _divide = [{ space: '1', }]
        const propConfigs = properties.filter((p) => !p.isHidden)
        _divide =  _divide?.length > 0 ? [..._divide, ...propConfigs] : propConfigs;
        let cols = '';
        for (const _col of _divide)
            cols += `minmax(${_col.minWidth || ((Number(_col.space) || 1) * 100) + 'px'}, ${_col.space || 1}fr) `;
        return { gridTemplateColumns: cols };
    };

    return (
        <TitleBar style={generateTitleStyle()}>
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
                            <div className={classNames('px-3', p?.labelClassName)}
                                 style={{ width: 'auto', fontWeight: 600 }}>
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