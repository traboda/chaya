import React from 'react';
import styled from '@emotion/styled';
import {nanoid} from "nanoid";
import {defaultLinkWrapper} from "../utils/misc";

const BreadcrumbWrapper = styled.ul`
    padding: 0;
    display: flex;
    align-items: center;
    font-size: calc(1.2rem + 0.15vw);
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

type Breadcrumb = {
    items: {
        link?: string,
        title?: string,
        isActive?: boolean
    }[],
    linkWrapper?: (link: string, component: React.ReactNode) => React.ReactNode,
};

const Breadcrumb = ({ items, linkWrapper = defaultLinkWrapper }: Breadcrumb) => (
    <BreadcrumbWrapper>
        <li>
            {linkWrapper('/',  <a aria-label="Home"><i className="fa fa-home" /></a>)}
        </li>
        {items.length > 0 &&
        items.map((i) =>
            <li key={nanoid()}>
                {linkWrapper(i?.link || '#', i.title)}
            </li>
        )}
    </BreadcrumbWrapper>
);

export default Breadcrumb;