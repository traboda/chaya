import React, { ReactNode } from 'react';

import clsx from 'clsx';

import mcs from '../utils/merge';

import Icon, { IconInputType } from './Icon';

export type CardProps = {
  children?: ReactNode;
  variant?: 'shaded' | 'outline';
  title?: string;
  description?: string;
  titleClassName?: string;
  bodyClassName?: string;
  titleIcon?: IconInputType;
  id?: string;
  className?: string;
  sidebarRenderer?: ReactNode;
};

const Card = ({
  id,
  children,
  title,
  description,
  variant = 'shaded',
  className,
  bodyClassName,
  titleClassName,
  titleIcon,
  sidebarRenderer,
}: CardProps) => (
  <div
    id={id}
    className={mcs([
      'card h-full rounded-lg border',
      variant === 'outline' && 'border-neutral-300/80 dark:border-neutral-600/80',
      variant === 'shaded' &&
        'bg-gray-500/8 border-neutral-200/80 dark:border-neutral-600/70 dark:bg-gray-500/15',
      className,
    ])}
  >
    {title ? (
      <div
        className={clsx([
          'card-header flex w-full items-start justify-between gap-3',
          'rounded-t-lg border-b px-3 py-2',
          variant === 'shaded' &&
            'border-neutral-200/60 bg-background-lighten-1 dark:border-neutral-600/70 dark:bg-background-darken-1',
          variant === 'outline' && 'border-neutral-300/80 dark:border-neutral-600/80',
        ])}
      >
        <div>
          {title && (
            <h3 className={mcs(['flex items-center gap-2 text-xl font-semibold', titleClassName])}>
              {titleIcon ? <Icon icon={titleIcon} /> : null}
              {title}
            </h3>
          )}
          {description && <p className="mt-1 text-sm opacity-80">{description}</p>}
        </div>
        <div>{sidebarRenderer}</div>
      </div>
    ) : null}
    <div className={mcs(['card-body p-3', bodyClassName])}>{children}</div>
  </div>
);

export default Card;
