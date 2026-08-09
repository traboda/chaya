import React from 'react';

import clsx from 'clsx';

import {
  ChayaColorType,
  EMPTY_COLOR_MAP,
  SOLID_BG_COLOR_MAP,
  SOLID_TEXT_COLOR_MAP,
  colorVariantMapper,
} from '../utils/classMaps/colors';
import { cva } from '../utils/cva';
import mcs from '../utils/merge';

import Icon, { IconInputType } from './Icon';

export type BannerProps = {
  id?: string;
  className?: string;
  variant?: 'full-width' | 'float' | 'card';
  color?: ChayaColorType;
  position?: 'top' | 'bottom' | 'inline';
  text?: string;
  icon?: IconInputType;
  allowDismissal?: boolean;
  children?: React.ReactNode;
  learnMore?: {
    link: string;
    text: string;
  };
  onClose?: () => void;
};

const wrapperClassName = cva({
  base: '',
  variants: {
    variant: {
      'full-width': '',
      float: 'p-4',
      card: 'max-w-[700px]',
    },
    position: {
      top: 'absolute top-0',
      bottom: 'absolute bottom-0',
      inline: '',
    },
  },
  compoundVariants: [
    {
      variant: ['full-width', 'float'],
      className: 'w-full left-0 right-0',
    },
    {
      variant: ['float', 'card'],
      className: 'rounded-lg shadow-lg',
    },
  ],
});

const containerClassName = cva({
  variants: {
    variant: {
      'full-width': '',
      float: '',
      card: '',
    },
    color: EMPTY_COLOR_MAP,
  },
  compoundVariants: [
    ...colorVariantMapper(
      [SOLID_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP],
      ['float', 'card', 'full-width']
    ),
  ],
});

const Banner = ({
  id,
  className,
  variant,
  onClose,
  position = 'top',
  text,
  color = 'primary',
  icon,
  allowDismissal,
  children,
  learnMore,
}: BannerProps) => {
  const contentRenderer = (
    <React.Fragment>
      <div className="flex w-full place-items-center gap-4">
        {icon && <Icon icon={icon} size={20} />}
        <p>
          {text}
          {learnMore && (
            <a href={learnMore.link} className="inline whitespace-nowrap hover:underline">
              {learnMore.text}
            </a>
          )}
        </p>
      </div>
      <div className="flex flex-shrink-0 items-center gap-4">
        {children}
        {allowDismissal && (
          <button type="button" className="flex place-items-center" onClick={onClose}>
            <Icon icon="times" size={20} />
          </button>
        )}
      </div>
    </React.Fragment>
  );

  const cardRenderer = (
    <div
      className={clsx([
        'flex flex-col flex-wrap items-center justify-center gap-4 p-5 text-center md:flex-nowrap md:justify-between md:text-left',
      ])}
    >
      {contentRenderer}
    </div>
  );

  const bannerRenderer = (
    <div
      className={clsx([
        'flex w-full flex-wrap items-center justify-center gap-4 p-5 text-center md:flex-nowrap md:justify-between md:text-left',
      ])}
    >
      {contentRenderer}
    </div>
  );

  return (
    <div className={clsx([wrapperClassName({ variant, position })])}>
      <div id={id} className={mcs([containerClassName({ variant, color }), className])}>
        {variant === 'card' ? cardRenderer : bannerRenderer}
      </div>
    </div>
  );
};

export default Banner;
