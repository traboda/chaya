import React from "react";
import LinkWrapperContext from "../contexts/LinkWrapperContext";


export const defaultLinkWrapper = (link, component) => (
    <LinkWrapperContext.Consumer>
        {(linkWrapper) => {
            return linkWrapper(link, component);
        }}
    </LinkWrapperContext.Consumer>
);
