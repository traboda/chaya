import React from 'react';
import hyperid from 'hyperid';
import Icon from './Icon';
import { LinkWrapper } from '../utils/misc';
import clsx from 'clsx';
const generateId = hyperid();

export type BreadcrumbPropType = {
  items: {
    link?: string,
    title?: string,
    isActive?: boolean
  }[],
  className?: string,
};

const Breadcrumb = ({ items, className = '' }: BreadcrumbPropType) => {
  return (
      <ul className={clsx(['dsr-text-lg dsr-flex dsr-gap-2 dsr-items-center dsr-opacity-75', className])}>
          <li>
              {LinkWrapper('/', <Icon icon="home" size={18} />)}
          </li>
          <li>
              /
          </li>
          {items.length > 0 && items.map(item => (
              <ul className="dsr-flex dsr-gap-2 dsr-text-color hover:dsr-text-secondary">
                  <li key={generateId()}>
                      {LinkWrapper(item?.link || '#', item?.title)}
                  </li>
                  <li>
                      /
                  </li>
              </ul>
          ))}
      </ul>
  );
};

export default Breadcrumb;