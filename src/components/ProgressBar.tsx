import React from 'react';
import clsx from 'clsx';

type ProgressBar = {
  value: number,
  striped?: boolean,
  size?: ('xs' | 'sm' | 'md' | 'lg' | 'xl'),
  id?: string,
  className?: string,
  height?: string,
  minVal?: number,
  maxVal?: number,
};

const sizes = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '2rem',
  xl: '3rem',
};

const ProgressBar = ({ value, striped = false, size = 'md', className = '', id, minVal = 0, maxVal = 100, height }: ProgressBar) => {

  return (
    <div
      id={id}
      className={clsx([
        'progress-bar dsr-w-full dsr-rounded-lg dsr-bg-gray-500/20',
        'dsr-border dark:dsr-border-gray-500/70 dsr-border-gray-500/10',
        className,
      ])}
      style={{ height: height ? height : sizes[size] }}
    >
      <div
        role="progressbar"
        className={clsx([
          'progress-bar-progress dsr-rounded-lg dsr-h-full dsr-bg-primary',
        ])}
        style={{
          width: `${value || 0}%`,
          backgroundSize: '1rem 1rem',
          backgroundImage: striped ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, ' +
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