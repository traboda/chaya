import React, { createContext } from 'react';

const defaultLinkWrapper = (link, component) => (
    <a href={link}>
        {component}
    </a>
);

export type LinkWrapperFunction = (
    link: string,
    component: React.ReactElement,
    options?: {
        target: ('_blank' | '_self' | '_parent' | '_top'),
    }
) => React.ReactElement;

const LinkWrapperContext = createContext<LinkWrapperFunction>(defaultLinkWrapper);

export default LinkWrapperContext;
