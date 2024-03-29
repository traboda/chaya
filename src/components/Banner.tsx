import React from 'react';
import clsx from 'clsx';

import { cva } from '../utils/cva';
import {
  colorVariantMapper, ChayaColorType,
  SOLID_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP, EMPTY_COLOR_MAP,
} from '../utils/classMaps/colors';
import mcs from '../utils/merge';

import Icon, { IconInputType } from './Icon';

export type BannerProps = {
  id?: string,
  className?: string,
  variant?: 'full-width' | 'float' | 'card',
  color?: ChayaColorType,
  position?: 'top' | 'bottom' | 'inline',
  text?: string,
  icon?: IconInputType,
  allowDismissal?: boolean,
  children?: React.ReactNode,
  learnMore?: {
    link: string,
    text: string,
  }
  onClose?: () => void,
};

const wrapperClassName = cva({
  base: '',
  variants: {
    variant: {
      'full-width': '',
      'float': 'p-4',
      'card': 'max-w-[700px]',
    },
    position: {
      'top': 'absolute top-0',
      'bottom': 'absolute bottom-0',
      'inline': '',
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
      'float': '',
      'card': '',
    },
    color: EMPTY_COLOR_MAP,
  },
  compoundVariants: [
    ...colorVariantMapper([SOLID_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP], ['float', 'card', 'full-width']),
  ],
});

const Banner = ({
  id, className, variant, onClose, position = 'top', text, color = 'primary', icon,
  allowDismissal, children, learnMore,
}: BannerProps) => {

  const contentRenderer = (
    <React.Fragment>
      <div className="w-full flex gap-4 place-items-center">
        {icon && <Icon icon={icon} size={20} />}
        <p>
          {text}
          {learnMore && <a href={learnMore.link} className="whitespace-nowrap  hover:underline inline">{learnMore.text}</a>}
        </p>
      </div>
      <div className="flex gap-4 items-center flex-shrink-0">
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
        'p-5 flex flex-col gap-4 flex-wrap md:flex-nowrap text-center md:text-left items-center justify-center md:justify-between',
      ])}
    >
      {contentRenderer}
    </div>
  );

  const bannerRenderer = (
    <div
      className={clsx([
        'w-full p-5 flex gap-4 flex-wrap md:flex-nowrap text-center md:text-left items-center justify-center md:justify-between',
      ])}
    >
      {contentRenderer}
    </div>
  );

  return (
    <div
      className={clsx([
        wrapperClassName({ variant, position }),
      ])}
    >
      <div
        id={id}
        className={mcs([
          containerClassName({ variant, color }),
          className,
        ])}
      >
        {(variant === 'card') ? cardRenderer : bannerRenderer}
      </div>
    </div>
  );

};

export default Banner;