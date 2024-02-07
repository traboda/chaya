import React from 'react';
import clsx from 'clsx';

import skeletonItemStyles from './skeletonItem.module.scss';

export type SkeletonItemProps = {
  circular?: boolean
  minWidth?: string
  variant?: 'wave' | 'pulse'
  w?: string | number
  h?: string | number
  className?: string,
  children?: React.ReactNode,
};

const SkeletonItem = ({ circular, minWidth, w, h, className, variant = 'wave', children } : SkeletonItemProps) => (
  <div
    className={clsx([
      circular ? 'dsr-rounded-full' : 'dsr-rounded-lg',
      variant === 'pulse' ? 'dsr-animate-pulse' : skeletonItemStyles.animate,
      'skeleton dsr-relative dsr-overflow-hidden dsr-bg-gray-500/20',
      className,
    ])}
    style={{
      minWidth: minWidth ?? '',
      width: w ?? '20px',
      height: h ?? '20px',
    }}
  >
    {children}
  </div>
);


export default SkeletonItem;