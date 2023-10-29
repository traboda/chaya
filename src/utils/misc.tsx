'use client';

import React from 'react';

import DSRContext from '../contexts/DSRContext';
import Spinner from '../components/Spinner';
import { ButtonSize } from '../components/Button/type';
 
export type LinkTargetType = ('_blank' | '_self' | '_parent' | '_top');
export type LinkRelType = (
    'noopener' | 'noreferrer' | 'noopener noreferrer' | 'alternate' | 'author' | 'bookmark' |
    'help' | 'license' | 'next' | 'nofollow' | 'prefetch' | 'prev' | 'search' | 'tag'
);

export type LinkOptions = {
  target?: LinkTargetType,
  rel?: LinkRelType,
  tabIndex?: number,
  autoFocus?: boolean,
  id?: string,
  className?: string,
  title?: string,
  label?: string,
  role?: string,
  style?: React.CSSProperties,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
  isDisabled?: boolean,
  isLoading?: boolean,
  size?: ButtonSize
};

export const LinkWrapper = (link: string, component: React.ReactNode, options?: LinkOptions) => (
  <DSRContext.Consumer>
    {({ linkWrapper }) => {
      return linkWrapper ? linkWrapper(
        link,
        <a
          id={options?.id}
          autoFocus={options?.autoFocus}
          role={options?.role}
          tabIndex={options?.tabIndex}
          href={link}
          target={options?.target}
          rel={options?.rel}
          className={options?.className}
          style={options?.style}
          title={options?.title}
          aria-label={options?.label || options?.title}
          aria-disabled={options?.isDisabled}
          onClick={event => {
            if (!options?.isDisabled) {
              options?.onClick?.(event);
            } else {
              event.preventDefault();
            }
          }}
        >
          {options?.isLoading ? <Spinner size={options?.size} /> : component}
        </a>,
      ) : null;
    }}
  </DSRContext.Consumer>
);
