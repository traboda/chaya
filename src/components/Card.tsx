import React, { ReactNode } from 'react';
import clsx from 'clsx';

import mcs from '../utils/merge';

import Icon, { IconInputType } from './Icon';

export type CardProps = {
  children?: ReactNode,
  variant?: 'shaded' | 'outline',
  title?: string,
  description?: string,
  titleClassName?: string,
  bodyClassName?: string,
  titleIcon?: IconInputType,
  id?: string,
  className?: string,
  sidebarRenderer?: ReactNode
};

const Card = ({
  id, children, title, description, variant = 'shaded',
  className, bodyClassName, titleClassName, titleIcon,
  sidebarRenderer,
}: CardProps) => (
  <div
    id={id}
    className={mcs([
      'card rounded-lg h-full border',
      variant === 'outline' && 'dark:border-neutral-300/70 border-neutral-500/40',
      variant === 'shaded' && 'dark:bg-gray-500/20 bg-gray-500/10 dark:border-neutral-500/70 border-neutral-500/10',
      className,
    ])}
  >
    {title ? (
      <div
        className={clsx([
          'card-header flex items-start justify-between gap-3 w-full',
          'px-3 py-2 rounded-t-lg border-b',
          variant === 'shaded' && 'bg-background-lighten-1 dark:bg-background-darken-1 dark:border-neutral-500/70 border-neutral-500/20',
          variant === 'outline' && 'dark:border-neutral-300/70 border-neutral-500/40',
        ])}
      >
        <div>
          {title && (
          <h3
            className={mcs([
              'text-xl font-semibold flex items-center gap-2',
              titleClassName,
            ])}
          >
            {titleIcon ? <Icon icon={titleIcon} /> : null}
            {title}
          </h3>
          )}
          {description && <p className="opacity-80 mt-1 text-sm">{description}</p>}
        </div>
        <div>{sidebarRenderer}</div>
      </div>
    ) : null}
    <div className={mcs(['card-body p-3', bodyClassName])}>
      {children}
    </div>
  </div>
);


export default Card;
