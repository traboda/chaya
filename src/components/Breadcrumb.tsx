import React, { ReactNode } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { LinkWrapper } from '../utils/misc';

import Icon from './Icon';

export type BreadcrumbItemProps = {
  link?: string,
  title?: ReactNode,
  label?: string,
  isActive?: boolean
};

export type BreadcrumbPropType = {
  items: BreadcrumbItemProps[],
  className?: string,
  itemClassName?: string
};

const Breadcrumb = ({ items, className = '', itemClassName = '' }: BreadcrumbPropType) => {

    const computedItemClassName = clsx([
        'breadcrumb-item dsr-flex dsr-items-center dsr-gap-1 dsr-text-color',
        itemClassName
    ]);

    const homePathItem = {
        title: <Icon icon="home" size={18} />,
        link: '/',
        label: 'Go to home page',
    };

    const withHomeLink = items?.length > 0 ? [homePathItem, ...items] : [homePathItem]

    return (
        <ul
            className={clsx([
                'breadcrumb dsr-text-lg dsr-flex dsr-gap-2 dsr-items-center dsr-opacity-75',
                className
            ])}
        >
            {withHomeLink.length > 0 && withHomeLink.map((item) => (
                <li
                    key={nanoid()}
                    className={computedItemClassName}
                >
                     <span
                         className={clsx([
                             'dsr-rounded hover:dsr-bg-gray-500/40 dsr-px-2 focus:dsr-bg-gray-500/50',
                             'focus:dsr-outline-none dsr-transition dsr-text-color'
                         ])}
                     >
                      {LinkWrapper(item?.link || '#', item?.title, { label: item?.label })}
                    </span>
                    <span className="dsr-text-color hover:dsr-text-primary">/</span>
                </li>
            ))}
        </ul>
    );
}

export default Breadcrumb;