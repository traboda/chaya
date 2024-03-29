import React from 'react';
import clsx from 'clsx';

import mcs from '../utils/merge';

export type ProgressBarProps = {
  value: number,
  isStriped?: boolean,
  size?: ('xs' | 'sm' | 'md' | 'lg' | 'xl'),
  id?: string,
  className?: string,
  height?: string,
  minVal?: number,
  maxVal?: number,
  isLoading?: boolean,
};

const sizes = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '2rem',
  xl: '3rem',
};

const ProgressBar = ({ value, isStriped = false, size = 'md', className = '', id, minVal = 0, maxVal = 100, height, isLoading = false }: ProgressBarProps) => {

  return (
    <div
      id={id}
      className={mcs([
        'progress-bar w-full rounded-lg bg-gray-500/20',
        'border dark:border-gray-500/70 border-gray-500/10',
        className,
      ])}
      style={{ height: height ? height : sizes[size] }}
    >
      <div
        role="progressbar"
        className={clsx([
          'progress-bar-progress rounded-lg h-full bg-primary',
          isLoading && 'animate-stripes',
        ])}
        style={{
          width: `${value || 0}%`,
          backgroundSize: '1rem 1rem',
          backgroundImage: isLoading || isStriped ? 'linear-gradient(-45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, ' +
                  'transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, ' +
                  'transparent 75%, transparent )' : '',
        }}
        aria-valuenow={(value / 100) * maxVal}
        aria-valuemin={minVal}
        aria-valuemax={maxVal}
      />
    </div>
  );
};

export default ProgressBar;