import React from 'react';
import styled from '@emotion/styled';
import {nanoid} from "nanoid";
import { link_wrapper } from "../utils/misc";

const BreadcrumbWrapper = styled.ul`
    padding: 0;
    display: flex;
    align-items: center;
    li {
        opacity: 0.75;
        list-style: none;
        margin-right: 0.75rem;
        a {
            color: inherit;
            text-decoration: none!important;
        }
        &:after {
            margin-left: 0.75rem;
            content: '/';
        }
        &:hover {
            color: ${({theme}) => theme.secondary};
        }
    }
`;

export type BreadcrumbPropType = {
    items: {
        link?: string,
        title?: string,
        isActive?: boolean
    }[],
    className?: string,
    icons?: {
        home?: React.ReactElement,
    }
};

const defaultIcons = {
    home: <>🏠</>
};


const Breadcrumb = ({ items, className = '', icons: _icons = null }: BreadcrumbPropType) => {

    const icons = {...defaultIcons, ..._icons};

    return (
        <BreadcrumbWrapper className={`text-lg breadcrumb ${className}`}>
            <li>
                {link_wrapper('/', icons?.home)}
            </li>
            {items.length > 0 &&
                items.map((i) =>
                    <li key={nanoid()}>
                        {link_wrapper(i?.link || '#', <>{i.title}</>)}
                    </li>
                )}
        </BreadcrumbWrapper>
    );
}

export default Breadcrumb;