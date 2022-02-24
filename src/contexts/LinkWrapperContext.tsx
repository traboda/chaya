import React, { createContext } from 'react';

const defaultLinkWrapper = (_link, component) => (
    <React.Fragment>{component}</React.Fragment>
);

export type LinkWrapperFunction = (
    link: string,
    component: React.ReactElement,
) => React.ReactElement;

const LinkWrapperContext = createContext<LinkWrapperFunction>(defaultLinkWrapper);

export default LinkWrapperContext;
