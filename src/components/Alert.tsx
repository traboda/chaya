'use client';
import React, { useState } from 'react';
import clsx from 'clsx';

import { cva } from '../utils/cva';
import {
  ChayaColorType, colorVariantMapper,
  EMPTY_COLOR_MAP, MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP, BORDER_COLOR_MAP,
} from '../utils/classMaps/colors';

import Button, { ButtonProps } from './Button';
import Icon, { IconInputType } from './Icon';

export type AlertVariantsType = 'solid' | 'outline';

export type AlertProps = {
  type?: ChayaColorType;
  variant?: AlertVariantsType;
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

const alertClassName = cva({
  base: [
    'alert dsr-relative dsr-rounded-lg dsr-px-3 dsr-flex dsr-flex-col dsr-gap-0.5 dsr-border',
  ],
  variants: {
    variant: {
      solid: 'dark:dsr-border-opacity-70 dsr-border-opacity-20',
      outline: 'dark:dsr-border-opacity-80 dsr-border-opacity-60',
    },
    color: EMPTY_COLOR_MAP,
  },
  compoundVariants: [
    ...colorVariantMapper<AlertVariantsType>([MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP, BORDER_COLOR_MAP], 'solid'),
    ...colorVariantMapper<AlertVariantsType>([BORDER_COLOR_MAP, TEXT_COLOR_MAP], 'outline'),
    { variant: 'solid', color: 'black', className: 'dark:dsr-bg-neutral-800' },
    { variant: 'solid', color: 'white', className: 'dsr-bg-white dsr-border dsr-border-neutral-200 dsr-border-opacity-100' },
    { variant: 'outline', color: 'black', className: 'dsr-text-black dark:dsr-text-black' },
    { variant: 'outline', color: 'white', className: 'dsr-text-white dark:dsr-text-white dsr-border-white' },
    { variant: 'outline', color: 'contrast', className: 'dsr-text-neutral-800 dark:dsr-text-white' },
  ],
});

const Alert = ({
  type = 'primary', variant = 'solid', id, className = '', title, description, allowDismissal = false,
  onDismiss = () => {}, primaryButton, secondaryButton, titleIcon, children,
}: AlertProps) => {

  const [hide, setHide] = useState(false);

  return !hide ? (
    <div
      id={id}
      className={clsx([
        alertClassName({ variant, color: type }),
        description ? 'dsr-py-4' : 'dsr-py-3',
        className,
      ])}
    >
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
      <div className="dsr-flex dsr-items-center dsr-mt-2">
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
