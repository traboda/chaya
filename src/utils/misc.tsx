import React from 'react';

import DSRContext from '../contexts/DSRContext';
import { Spinner } from '../index';
import { ButtonSize } from '../components/Button/type';
 
export type LinkTargetType = ('_blank' | '_self' | '_parent' | '_top');
export type LinkRelType = (
    'noopener' | 'noreferrer' | 'noopener noreferrer' | 'alternate' | 'author' | 'bookmark' |
    'help' | 'license' | 'next' | 'nofollow' | 'prefetch' | 'prev' | 'search' | 'tag'
);

export type LinkOptions = {
  target?: LinkTargetType,
  rel?: LinkRelType,
  id?: string,
  className?: string,
  label?: string,
  style?: React.CSSProperties,
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
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
                  href={link}
                  target={options?.target}
                  rel={options?.rel}
                  className={options?.className}
                  style={options?.style}
                  aria-label={options?.label}
                  aria-disabled={options?.isDisabled}
                  onClick={event => options?.isDisabled && event.preventDefault()}
              >
                  {options?.isLoading ? <Spinner size={options?.size} /> : component}
              </a>,
          ) : null;
        }}
    </DSRContext.Consumer>
);
