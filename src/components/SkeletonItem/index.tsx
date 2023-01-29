import React from 'react';
import clsx from 'clsx';

import skeletonItemStyles from './skeletonItem.module.scss';

type SkeletonItemProps = {
  circular?: boolean
  minWidth?: string
  variant?: 'wave' | 'pulse'
  w?: string
  h?: string
  className?: string
};

const SkeletonItem = ({ circular, minWidth, w, h, className, variant = 'wave' } : SkeletonItemProps) => (
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
    />
);


export default SkeletonItem;