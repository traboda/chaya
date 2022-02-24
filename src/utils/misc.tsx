import React from "react";
import LinkWrapperContext from "../contexts/LinkWrapperContext";


export const defaultLinkWrapper = (link, component, options) => (
    <LinkWrapperContext.Consumer>
        {(linkWrapper) => {
            return linkWrapper(link, component, options);
        }}
    </LinkWrapperContext.Consumer>
);
