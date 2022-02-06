import React, { createContext } from 'react';

const defaultLinkWrapper = (link, component) => (
    <a href={link}>
        {component}
    </a>
);

export type LinkWrapperFunction = (link: string, component: React.ReactNode) => React.ReactNode;

const LinkWrapperContext = createContext<LinkWrapperFunction>(defaultLinkWrapper);

export default LinkWrapperContext;
