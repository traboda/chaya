import React from 'react';
import styled from '@emotion/styled';

import SkeletonItem from '../SkeletonItem';
import {defaultLinkWrapper} from "../../utils/misc";

const ListItem = styled.div`
  display: grid;
  align-items: center;
  font-size: 1.25rem;
  background: rgba(0, 0, 30, 0.25);
  &[data-shaded='true'] {
    background: rgba(100, 100, 150, 0.1);
  }
  
  a {
    color: inherit;
    text-decoration: none !important;
  }

  &:hover {
    background: rgba(100, 100, 150, 0.35);
  }
`;

const LinkWrap = styled.a`
  &:hover {
    color: ${({ theme }) => theme.secondary} !important;
    text-decoration: underline;
  }
`;

const ItemProperty = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;

  .fa-external-link {
    display: none;
    opacity: 0.75;
    font-size: 13px;
  }

  &:hover {
    .fa-external-link {
      display: block;
    }
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
    item?: {},
    itemIndex?: number,
    isShaded?: boolean,
    isLoading?: boolean,
    style?: object,
    linkWrapper?: (link: string, component: React.ReactNode) => React.ReactNode,
};

const ItemListerItem = ({
    properties, item, itemIndex, isShaded = false, isLoading = false, style = {}, linkWrapper = defaultLinkWrapper
}: ItemListerItemProps) => {

    const generateItemStyle = () => {
        const _divide = properties.filter((p) => !p.isHidden);
        let cols = '';
        for(const _col of _divide)
            cols += `minmax(${_col.minWidth || ((Number(_col.space) || 1) * 100) + 'px'}, ${_col.space || 1}fr) `;

        return { gridTemplateColumns: cols, ...style };
    };

    return <ListItem data-shaded={isShaded} style={generateItemStyle()}>
        {properties?.length > 0 &&
        properties.filter((p) => !p.isHidden).map((p) => {
            const link = isLoading ? null : typeof p.link === 'function' ? p.link(item) : null;
            const renderer =
                <ItemProperty
                    key={link ? null : p.id}
                    className={p?.className}
                    style={{
                        textAlign: p.textAlign,
                        fontSize: p.fontSize
                    }}
                >
                    {isLoading ? <SkeletonItem h="1.75rem" w="80%" /> : p.value(item, itemIndex)}
                    {link && <i className="fa fa-external-link ml-2" />}
                </ItemProperty>;
            return link ? linkWrapper(link, <LinkWrap href={link}>{renderer}</LinkWrap>) : renderer;
        })}
    </ListItem>;

};

export default ItemListerItem;