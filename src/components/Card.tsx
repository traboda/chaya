import React, { ReactNode, useContext } from 'react';
import clsx from 'clsx';

import DSRContext from '../contexts/DSRContext';

import Icon, { IconInputType } from './Icon';

export type CardProps = {
  children: ReactNode,
  variant?: 'shaded' | 'outline',
  title?: string,
  description?: string,
  titleClassName?: string,
  icon?: IconInputType,
  id?: string,
  className?: string,
};

const Card = ({
  id, children, title, description, variant = 'shaded',
  className = '', titleClassName = '', icon,
}: CardProps) => {
  const { isDarkTheme } = useContext(DSRContext);

  return (
      <div
          id={id}
          className={clsx([
            'dsr-p-4 dsr-rounded-lg dsr-h-full dsr-border dsr-border-solid',
            isDarkTheme ? 'dsr-border-white/20' : 'dsr-border-black/20',
            variant === 'shaded' ? isDarkTheme ? 'dsr-bg-white/10' : 'dsr-bg-black/10' : '',
            className,
          ])}
      >
          <div>
              {title && (
                  <h3 className={clsx(['dsr-text-3xl dsr-mb-2 dsr-font-semibold', titleClassName])}>
                      {icon ? <Icon icon={icon} /> : null}
                      {title}
                  </h3>
              )}
              {description && <p className="dsr-text-lg dsr-opacity-90 dsr-mb-2">{description}</p>}
              {children}
          </div>
      </div>
  );
};


export default Card;
