import React from 'react';
import skeletonItemStyles from './skeletonItem.module.scss';
import clsx from 'clsx';

type SkeletonItemProps = {
  circular?: boolean
  minWidth?: string
  w?: string
  h?: string
  className?: string
};

const SkeletonItem = ({ circular, minWidth, w, h, className } : SkeletonItemProps) => {
  return (
      <div
          className={clsx([
            circular ? 'dsr-rounded-full' : 'dsr-rounded-lg',
            skeletonItemStyles.animate,
            'dsr-relative dsr-overflow-hidden dsr-bg-gray-500/20',
            className,
          ])}
          style={{
            minWidth: minWidth ?? '',
            width: w ?? '20px',
            height: h ?? '20px',
          }}
      />
  );
};

export default SkeletonItem;