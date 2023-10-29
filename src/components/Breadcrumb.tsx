'use client';
import React, { ReactNode } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { LinkWrapper } from '../utils/misc';

import Icon, { IconInputType } from './Icon';

export type BreadcrumbItemProps = {
  link?: string;
  title?: ReactNode;
  icon?: IconInputType;
  label?: string;
  isActive?: boolean;
};

export type BreadcrumbProps = {
  items: BreadcrumbItemProps[];
  className?: string;
  itemClassName?: string;
  hideHomeLink?: boolean;
  homeLink?: BreadcrumbItemProps;
};

const defaultHomeLink = {
  icon: 'home',
  link: '/',
  label: 'Go to home page',
};

const Breadcrumb = ({
  items,
  className = '',
  itemClassName = '',
  hideHomeLink = false,
  homeLink: _homeLink,
}: BreadcrumbProps) => {
  const computedItemClassName = clsx([
    'breadcrumb-item dsr-flex dsr-items-center dsr-gap-1 dsr-text-color',
    itemClassName,
  ]);

  const homePathItem: BreadcrumbItemProps = {
    ...defaultHomeLink,
    ..._homeLink,
  };

  const breadcrumbItems = !hideHomeLink
    ? items?.length > 0
      ? [homePathItem, ...items]
      : [homePathItem]
    : items;

  return (
    <ul
      className={clsx([
        'breadcrumb dsr-text-lg dsr-flex dsr-flex-wrap dsr-gap-2 dsr-items-center dsr-opacity-75',
        className,
      ])}
    >
      {breadcrumbItems.length > 0 &&
        breadcrumbItems.map((item, index) => (
          <li key={nanoid()} className={computedItemClassName}>
            {index !== 0 ? (<span className="dsr-px-1">/</span>) : null}
            <span
              className={clsx([
                'dsr-rounded focus:dsr-outline-none dsr-transition dsr-text-color',
                index == breadcrumbItems.length - 1 ? 'dsr-font-semibold' : 'hover:dsr-bg-gray-500/40 dsr-px-1 focus:dsr-bg-gray-500/50',
              ])}
            >
              {LinkWrapper(
                item?.link || '#',
                <React.Fragment>
                  {item?.icon && (
                    <div className={item?.title ? 'dsr-mr-1' : undefined}>
                      <Icon icon={item.icon} size={18} />
                    </div>
                  )}
                  {item?.title}
                </React.Fragment>,
                { title: item?.label },
              )}
            </span>
            
          </li>
        ))}
    </ul>
  );
};

export default Breadcrumb;
