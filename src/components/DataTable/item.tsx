import React, {useContext} from 'react';
import styled from '@emotion/styled';
import Color from "color";

import SkeletonItem from '../SkeletonItem';
import { link_wrapper } from "../../utils/misc";
import SelectionContext from "./SelectionContext";

type ListItem = {
    isPinned?: boolean,
};

const ListItem = styled.tr<ListItem>`
  display: grid;
  align-items: center;
  
  & > td {
    border-right: 1px solid ${({ theme }) => Color(theme.color).fade(0.85).string()};
    border-bottom: 1px solid ${({ theme }) => Color(theme.color).fade(0.85).string()};
    height: 100%;
    color: ${({ theme }) => theme.color};
    background: ${({theme, isPinned }) => isPinned ? theme.background : null};
  }

  a {
    color: inherit;
    text-decoration: none !important;
  }

  &:hover > * {
    background: ${({theme, isPinned }) => isPinned ? theme.background : theme?.isDarkTheme ? 'rgba(255, 255, 255, 0.2)!important' : 'rgba(100, 100, 100, 0.25)!important'};
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
    width?: number,
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
    isLoading?: boolean,
    isPinned?: boolean,
    gridTemplate: React.CSSProperties
};

const ItemListerItem = ({
    properties, item, itemIndex, gridTemplate, isLoading = false, isPinned = false
}: ItemListerItemProps) => {

    const { isEnabled, selectItem, isSelected, deselectItem } = useContext(SelectionContext)

    return (
        <ListItem isPinned={isPinned} style={gridTemplate}>
            {isEnabled && (
                <td className="px-2">
                    <div className="flex justify-center h-full items-center w-full py-3 text-center">
                        {isLoading ? <SkeletonItem h="1.25rem" w="1.25rem" /> :
                        <input
                            type="checkbox"
                            checked={isSelected(item?.id)}
                            onChange={() => isSelected(item?.id) ? deselectItem(item?.id) : selectItem(item?.id)}
                        />}
                    </div>
                </td>
            )}
            {properties?.length > 0 &&
            properties.filter((p) => !p.isHidden).map((p) => {
                const link = isLoading ? null : typeof p.link === 'function' ? p.link(item) : null;
                const renderer = (
                    <div className={`py-2 px-3 flex items-center ${p?.className}`}>
                        {isLoading ? <SkeletonItem h="1.75rem" w="80%" /> : p.value(item, itemIndex)}
                        {link && <i className="fa fa-external-link ml-2" />}
                    </div>
                );
                return (
                    <td
                        key={link ? null : p.id}
                        style={{
                            textAlign: p.textAlign,
                            fontSize: p.fontSize,
                        }}
                    >
                        {link ? link_wrapper(link, <LinkWrap href={link}>{renderer}</LinkWrap>) : renderer}
                    </td>
                );
            })}
        </ListItem>
    );

};

export default ItemListerItem;