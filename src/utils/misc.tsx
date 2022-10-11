import React from "react";
import LinkWrapperContext from "../contexts/LinkWrapperContext";

export type LinkTargetType = ('_blank' | '_self' | '_parent' | '_top');
export type LinkRelType =  (
    'noopener' | 'noreferrer' | 'noopener noreferrer' | 'alternate' | 'author' | 'bookmark' |
    'help' | 'license' | 'next' | 'nofollow' | 'prefetch' | 'prev' | 'search' | 'tag'
);

export type LinkOptions = {
    target?: LinkTargetType;
    rel?: LinkRelType;
    id?: string,
    className?: string;
    label?: string,
    style?: React.CSSProperties;
};

export const link_wrapper = (link: string, component: React.ReactElement, options: LinkOptions = null) => (
    <LinkWrapperContext.Consumer>
        {(linkWrapper) => {
            return linkWrapper(
                link,
                <a
                    id={options?.id}
                    href={link}
                    target={options?.target}
                    rel={options?.rel}
                    className={options?.className}
                    style={options?.style}
                    aria-label={options?.label}
                >
                    {component}
                </a>
            );
        }}
    </LinkWrapperContext.Consumer>
);
