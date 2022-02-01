import React from 'react';
import Color from 'color';
import styled from '@emotion/styled';

import Breadcrumb from './Breadcrumb';
import {defaultLinkWrapper} from "../utils/misc";

const PageHeaderSection = styled.section`
    padding: 5vh 4rem;
    background: ${({ theme }) => theme?.isDarkTheme ? Color(theme.background).lighten(0.2).hex() : Color(theme.background).darken(0.15).hex() };
    display: flex;
    align-items: center;
    .container {
        min-width: 75%;
        max-width: 1200px;
    }
    h1 {
        font-size: calc(1.5rem + 2.25vw);
        font-weight: 600;
    }
    p {
        max-width: 900px;
        font-size: calc(1rem + 0.25vw);
        opacity: 0.8;
    }
`;

type PageHeader = {
    title?: string,
    customTitle?: React.ReactElement,
    description?: string,
    breadcrumbItems?: {
        link: string,
        title: string,
        isActive?: boolean
    }[],
    titleBottomRenderer?: () => (React.ReactChildren|React.ReactNode|React.ReactElement),
    sidebarRenderer?: () => (React.ReactChildren|React.ReactNode|React.ReactElement)
    customRender?: () => (React.ReactChildren|React.ReactNode|React.ReactElement),
    linkWrapper?: (link: string, component: React.ReactNode) => React.ReactNode,
}

const PageHeader = ({
    title, description,
    breadcrumbItems = [],
    customRender = () => <div />,
    titleBottomRenderer = () => <div />,
    sidebarRenderer = () => <div />,
    customTitle = null,
    linkWrapper = defaultLinkWrapper
} : PageHeader) => (
    <PageHeaderSection>
        <div className="container">
            <div className="flex flex-wrap mx-0">
                <div className="md:w-2/3 py-2">
                    <div className="px-2 mb-4">
                        <Breadcrumb linkWrapper={linkWrapper} items={breadcrumbItems} />
                    </div>
                    {customTitle ? customTitle : <h1 aria-level={1} role="heading">{title}</h1>}
                    {description?.length > 0 && <p>{description}</p>}
                    {titleBottomRenderer()}
                </div>
                <div className="md:w-1/3 py-2 flex justify-end items-center">
                    {sidebarRenderer()}
                </div>
            </div>
            {customRender && customRender()}
        </div>
    </PageHeaderSection>
);

export default PageHeader;