import React, { createContext } from 'react';

const defaultLinkWrapper = (link, component, options) => (
    <a href={link} target={options?.target}>
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
