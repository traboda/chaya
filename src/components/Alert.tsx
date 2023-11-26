'use client';
import React, { useState } from 'react';
import clsx from 'clsx';

import Button, { ButtonProps } from './Button';
import Icon, { IconInputType } from './Icon';


export type AlertProps = {
  type?: 'success' | 'info' | 'warning' | 'danger' | 'default';
  variant?: 'solid' | 'outline';
  id?: string,
  className?: string,
  title?: string
  description?: string;
  children?: React.ReactNode,
  allowDismissal?: boolean,
  onDismiss?: () => void,
  primaryButton?: ButtonProps,
  secondaryButton?: ButtonProps,
  titleIcon?: IconInputType,
};

const getBackgroundClassByType = (type: string) => {
  switch (type) {
    case 'success': return 'dark:dsr-bg-green-900 dsr-bg-green-100';
    case 'info': return 'dark:dsr-bg-blue-900 dsr-bg-blue-100';
    case 'warning': return 'dark:dsr-bg-yellow-900 dsr-bg-yellow-100';
    case 'danger': return 'dark:dsr-bg-red-900 dsr-bg-red-100';
    default: return 'dark:dsr-bg-gray-500/20 dsr-bg-gray-500/10';
  }
};

const getColorClassByType = (type: string) => {
  switch (type) {
    case 'success': return 'dark:dsr-text-green-300 dsr-text-green-600';
    case 'info': return 'dark:dsr-text-blue-300 dsr-text-blue-600';
    case 'warning': return 'dark:dsr-text-yellow-300 dsr-text-yellow-600';
    case 'danger': return 'dark:dsr-text-red-300 dsr-text-red-600';
    default: return 'dark:dsr-text-gray-300 dsr-text-gray-600';
  }
};

const getBorderClassByType = (type: string) => {
  switch (type) {
    case 'success': return 'dark:dsr-border-green-600 dsr-border-green-600';
    case 'info': return 'dark:dsr-border-blue-500 dsr-border-blue-500';
    case 'warning': return 'dark:dsr-border-yellow-500 dsr-border-yellow-600';
    case 'danger': return 'dark:dsr-border-red-500 dsr-border-red-500';
    default: return 'dark:dsr-border-gray-500 dsr-border-gray-500';
  }
};

const Alert = ({
  type = 'default', variant = 'solid', id, className = '', title, description, allowDismissal = false,
  onDismiss = () => {}, primaryButton, secondaryButton, titleIcon, children,
}: AlertProps) => {
  const [hide, setHide] = useState(false);
  const computedClassName = clsx([
    description ? 'dsr-py-4' : 'dsr-py-3',
    'alert dsr-relative dsr-rounded-lg dsr-px-3 dsr-flex dsr-flex-col dsr-gap-2',
    'dsr-border', getBorderClassByType(type), getColorClassByType(type),
    variant === 'solid' && getBackgroundClassByType(type),
    variant === 'outline' ? 'dark:dsr-border-opacity-80 dsr-border-opacity-60' : 'dark:dsr-border-opacity-70 dsr-border-opacity-20',
    className,
  ]);

  return !hide ? (
    <div id={id} className={computedClassName}>
      {allowDismissal && (
      <div className="dsr-absolute dsr-top-0 dsr-right-0 dsr-pr-3 dsr-pt-2">
        <button
          title="dismiss"
          className="alert-dismiss-button dsr-font-mono dsr-outline-none dsr-font-bold dsr-text-lg"
          onClick={() => { setHide(true); onDismiss(); }}
        >
          <Icon icon="times" size={16} />
        </button>
      </div>
      )}
      {title && (
      <h4 className={description ? 'dsr-text-lg dsr-font-semibold' : ''}>
        {titleIcon ? <Icon icon={titleIcon} /> : null}
        {title}
      </h4>
      )}
      {description && <p>{description}</p>}
      {children}
      {(primaryButton || secondaryButton) && (
      <div className="dsr-flex dsr-items-center">
        {primaryButton && (
        <div className="dsr-mr-2">
          <Button
            color="primary"
            className="dsr-text-base"
            {...primaryButton}
          />
        </div>
        )}
        {secondaryButton && (
        <div>
          <Button
            color="secondary"
            className="dsr-text-base"
            {...secondaryButton}
          />
        </div>
        )}
      </div>
      )}
    </div>
  ) : <div />;
};

export default Alert;
