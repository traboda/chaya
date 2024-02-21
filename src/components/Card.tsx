import React, { ReactNode } from 'react';
import clsx from 'clsx';

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
    className={clsx([
      'card dsr-rounded-lg dsr-h-full dsr-border',
      variant === 'outline' && 'dark:dsr-border-neutral-300/70 dsr-border-neutral-500/40',
      variant === 'shaded' && 'dark:dsr-bg-gray-500/20 dsr-bg-gray-500/10 dark:dsr-border-neutral-500/70 dsr-border-neutral-500/10',
      className,
    ])}
  >
    {title ? (
      <div
        className={clsx([
          'card-header dsr-flex dsr-items-start dsr-justify-between dsr-gap-3 dsr-w-full',
          'dsr-px-3 dsr-py-2 dsr-rounded-t-lg dsr-border-b',
          variant === 'shaded' && 'dsr-bg-background-lighten-1 dark:dsr-bg-background-darken-1 dark:dsr-border-neutral-500/70 dsr-border-neutral-500/20',
          variant === 'outline' && 'dark:dsr-border-neutral-300/70 dsr-border-neutral-500/40',
        ])}
      >
        <div>
          {title && (
          <h3
            className={clsx([
              'dsr-text-xl dsr-font-semibold dsr-flex dsr-items-center dsr-gap-2',
              titleClassName,
            ])}
          >
            {titleIcon ? <Icon icon={titleIcon} /> : null}
            {title}
          </h3>
          )}
          {description && <p className="dsr-opacity-80 dsr-mt-1 dsr-text-sm">{description}</p>}
        </div>
        <div>{sidebarRenderer}</div>
      </div>
    ) : null}
    <div className={clsx(['card-body dsr-p-3', bodyClassName])}>
      {children}
    </div>
  </div>
);


export default Card;
