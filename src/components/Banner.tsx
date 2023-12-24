import React from 'react';
import clsx from 'clsx';

import { cva } from '../utils/cva';
import {
  colorVariantMapper, ChayaColorType,
  SOLID_BG_COLOR_MAP, SOLID_TEXT_COLOR_MAP, EMPTY_COLOR_MAP,
} from '../utils/classMaps/colors';

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
      'float': 'dsr-p-4',
      'card': 'dsr-max-w-[700px]',
    },
    position: {
      'top': 'dsr-absolute dsr-top-0',
      'bottom': 'dsr-absolute dsr-bottom-0',
      'inline': '',
    },
  },
  compoundVariants: [
    {
      variant: ['full-width', 'float'],
      className: 'dsr-w-full dsr-left-0 dsr-right-0',
    },
    {
      variant: ['float', 'card'],
      className: 'dsr-rounded-lg dsr-shadow-lg',
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
      <div className="dsr-w-full dsr-flex dsr-gap-4 dsr-place-items-center">
        {icon && <Icon icon={icon} size={20} />}
        <p>
          {text}
          {learnMore && <a href={learnMore.link} className="dsr-whitespace-nowrap  hover:dsr-underline dsr-inline">{learnMore.text}</a>}
        </p>
      </div>
      <div className="dsr-flex dsr-gap-4 dsr-items-center dsr-flex-shrink-0">
        {children}
        {allowDismissal && (
          <button type="button" className="dsr-flex dsr-place-items-center" onClick={onClose}>
            <Icon icon="times" size={20} />
          </button>
        )}
      </div>
    </React.Fragment>
  );

  const cardRenderer = (
    <div
      className={clsx([
        'dsr-p-5 dsr-flex dsr-flex-col dsr-gap-4 dsr-flex-wrap md:dsr-flex-nowrap dsr-text-center md:dsr-text-left dsr-items-center dsr-justify-center md:dsr-justify-between',
      ])}
    >
      {contentRenderer}
    </div>
  );

  const bannerRenderer = (
    <div
      className={clsx([
        'dsr-w-full dsr-p-5 dsr-flex dsr-gap-4 dsr-flex-wrap md:dsr-flex-nowrap dsr-text-center md:dsr-text-left dsr-items-center dsr-justify-center md:dsr-justify-between',
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
        className={clsx([
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