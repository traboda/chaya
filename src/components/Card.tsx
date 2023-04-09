import React, { ReactNode } from 'react';
import clsx from 'clsx';

import Icon, { IconInputType } from './Icon';

export type CardProps = {
  children: ReactNode,
  variant?: 'shaded' | 'outline',
  title?: string,
  description?: string,
  titleClassName?: string,
  icon?: IconInputType,
  background?: string,
  id?: string,
  className?: string,
  sidebarRenderer?: ReactNode
};

const Card = ({
  id, children, title, description, variant = 'shaded',
  className = '', titleClassName = '', icon,
  sidebarRenderer,
}: CardProps) => {

  return (
    <div
      id={id}
      className={clsx([
        'card dsr-p-4 dsr-rounded-lg dsr-h-full dsr-border dsr-border-transparent',
        variant === 'outline' ? 'dsr-border-gray-500/70' : '',
        variant === 'shaded' && 'dark:dsr-bg-gray-500/20 dsr-bg-gray-500/10',
        className,
      ])}
    >
      {title ? (
        <div className="dsr-flex dsr-items-start dsr-justify-between dsr-gap-4 dsr-mb-4 dsr-w-full">
          <div>
            {title && (
              <h3
                className={clsx([
                  'dsr-text-2xl dsr-font-semibold dsr-flex dsr-items-center dsr-gap-2',
                  titleClassName,
                ])}
              >
                {icon ? <Icon icon={icon} /> : null}
                {title}
              </h3>
            )}
            {description && <p className="dsr-opacity-90 mt-2">{description}</p>}
          </div>

          <div>{sidebarRenderer}</div>
        </div>
      ) : null}

      {children}
    </div>
  );
};


export default Card;
