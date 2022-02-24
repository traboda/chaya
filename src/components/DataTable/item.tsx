import React, {useContext} from 'react';
import styled from '@emotion/styled';

import SkeletonItem from '../SkeletonItem';
import { link_wrapper } from "../../utils/misc";
import SelectionContext from "./SelectionContext";

const ListItem = styled.div`
  display: grid;
  align-items: center;
  
  & > * {
    height: 100%;
    background: rgba(0, 0, 30, 0.25);
  }

  &[data-shaded='true'] > * {
    background: rgba(100, 100, 150, 0.1);
  }
  
  a {
    color: inherit;
    text-decoration: none !important;
  }

  &:hover > * {
    background: rgba(100, 100, 150, 0.35);
  }
`;

const LinkWrap = styled.a`
  &:hover {
    color: ${({ theme }) => theme.secondary} !important;
    text-decoration: underline;
  }
`;

export type ItemListerProperty = {
    id: string,
    label: (String | React.ReactNode | React.ReactChildren | React.ReactElement),
    labelClassName?: string,
    value: (self: any, index?: number) => String | React.ReactNode | React.ReactChildren | React.ReactElement,
    space?: string,
    minWidth?: string,
    link?: (self: any) => string,
    className?: string,
    textAlign?: 'center' | 'left' | 'right',
    fontSize?: string
    allowSort?: boolean,
    isHidden?: boolean,
};

type ItemListerItemProps = {
    properties: ItemListerProperty[],
    item?: Partial<{ id: string }>,
    itemIndex?: number,
    isShaded?: boolean,
    isLoading?: boolean,
    style?: object,
};

const ItemListerItem = ({
    properties, item, itemIndex, isShaded = false, isLoading = false, style = {}
}: ItemListerItemProps) => {

    const { isEnabled, selectItem, isSelected, deselectItem } = useContext(SelectionContext)

    const generateItemStyle = () => {
        let _divide = [];
        if(isEnabled)
            _divide = [{ space: '1', }]
        const propConfigs = properties.filter((p) => !p.isHidden)
        _divide =  _divide?.length > 0 ? [..._divide, ...propConfigs] : propConfigs;
        let cols = '';
        for(const _col of _divide)
            cols += `minmax(${_col.minWidth || ((Number(_col.space) || 1) * 100) + 'px'}, ${_col.space || 1}fr) `;

        return { gridTemplateColumns: cols, ...style };
    };

    return <ListItem data-shaded={isShaded} style={generateItemStyle()}>
        {isEnabled && (
            <div className="px-2">
                <div className="flex justify-center w-full py-3 text-center">
                    <input
                        type="checkbox"
                        checked={isSelected(item?.id)}
                        onChange={() => isSelected(item?.id) ? deselectItem(item?.id) : selectItem(item?.id)}
                    />
                </div>
            </div>
        )}
        {properties?.length > 0 &&
        properties.filter((p) => !p.isHidden).map((p) => {
            const link = isLoading ? null : typeof p.link === 'function' ? p.link(item) : null;
            const renderer =
                <div
                    key={link ? null : p.id}
                    className={`py-2 px-3 flex items-center ${p?.className}`}
                    style={{
                        textAlign: p.textAlign,
                        fontSize: p.fontSize
                    }}
                >
                    {isLoading ? <SkeletonItem h="1.75rem" w="80%" /> : p.value(item, itemIndex)}
                    {link && <i className="fa fa-external-link ml-2" />}
                </div>;
            return link ? link_wrapper(link, <LinkWrap href={link}>{renderer}</LinkWrap>) : renderer;
        })}
    </ListItem>;

};

export default ItemListerItem;