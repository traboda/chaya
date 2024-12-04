'use client';
import React, { useState } from 'react';

import { cva } from '../utils/cva';
import {
  ChayaColorType, colorVariantMapper,
  EMPTY_COLOR_MAP, MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP, BORDER_COLOR_MAP,
} from '../utils/classMaps/colors';
import mcs from '../utils/merge';

import Icon, { IconInputType } from './Icon';
import Button, { ButtonProps } from './Button';

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
    'alert relative rounded-lg px-3 flex flex-col gap-0.5 border',
  ],
  variants: {
    variant: {
      solid: 'dark:border-opacity-70 border-opacity-20',
      outline: 'dark:border-opacity-80 border-opacity-60',
    },
    color: EMPTY_COLOR_MAP,
  },
  compoundVariants: [
    ...colorVariantMapper<AlertVariantsType>([MINIMAL_BG_COLOR_MAP, TEXT_COLOR_MAP, BORDER_COLOR_MAP], 'solid'),
    ...colorVariantMapper<AlertVariantsType>([BORDER_COLOR_MAP, TEXT_COLOR_MAP], 'outline'),
    { variant: 'solid', color: 'black', className: 'dark:bg-neutral-800' },
    { variant: 'solid', color: 'white', className: 'bg-white border border-neutral-200 border-opacity-100' },
    { variant: 'outline', color: 'black', className: 'text-black dark:text-black' },
    { variant: 'outline', color: 'white', className: 'text-white dark:text-white border-white' },
    { variant: 'outline', color: 'contrast', className: 'text-neutral-800 dark:text-white' },
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
      className={mcs([
        alertClassName({ variant, color: type }),
        description ? 'py-4' : 'py-3',
        className,
      ])}
    >
      {allowDismissal && (
      <div className="absolute top-0 right-0 pr-3 pt-2">
        <button
          title="dismiss"
          className="alert-dismiss-button font-mono outline-none font-bold text-lg"
          onClick={() => { setHide(true); onDismiss(); }}
        >
          <Icon icon="times" size={16} />
        </button>
      </div>
      )}
      {title && (
      <h4 className={description ? 'text-lg font-semibold' : ''}>
        {titleIcon ? <Icon icon={titleIcon} /> : null}
        {title}
      </h4>
      )}
      {description && <p>{description}</p>}
      {children}
      {(primaryButton || secondaryButton) && (
      <div className="flex items-center mt-2">
        {primaryButton && (
        <div className="mr-2">
          <Button
            color="primary"
            className="text-base"
            {...primaryButton}
          />
        </div>
        )}
        {secondaryButton && (
        <div>
          <Button
            color="secondary"
            className="text-base"
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
