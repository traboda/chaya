import React from 'react';
import Color from 'color';
import styled from '@emotion/styled';

import Breadcrumb from './Breadcrumb';
import { defaultLinkWrapper } from "../utils/misc";

const PageHeaderSection = styled.section`
    padding: 5vh 5vw;
    background: ${({ theme }) => theme?.isDarkTheme ? Color(theme.background || '#000').lighten(0.2).hex() : Color(theme.background || '#FFF').darken(0.15).hex() };
    display: flex;
    align-items: center;
    .container {
        min-width: 75%;
        max-width: 1200px;
    }
    p {
        font-size: calc(1rem + 0.25vw);
    }
`;

type PageHeader = {
    title?: string,
    customTitle?: React.ReactElement,
    description?: string,
    className?: string,
    headingClassName?: string,
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
    title, description, className, headingClassName,
    breadcrumbItems = [],
    customRender = () => <div />,
    titleBottomRenderer = () => <div />,
    sidebarRenderer = () => <div />,
    customTitle = null,
    linkWrapper = defaultLinkWrapper
} : PageHeader) => (
    <PageHeaderSection className={className}>
        <div className="container">
            <div className="flex flex-wrap mx-0">
                <div className="md:w-2/3 py-2">
                    <div className="px-2 mb-4">
                        <Breadcrumb linkWrapper={linkWrapper} items={breadcrumbItems} />
                    </div>
                    {customTitle ? customTitle : <h1 aria-level={1} className={`text-6xl mb-3 font-semibold ${headingClassName}`} role="heading">{title}</h1>}
                    {description?.length > 0 && <p className="text-lg opacity-80">{description}</p>}
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