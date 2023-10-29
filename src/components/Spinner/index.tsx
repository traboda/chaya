import React from 'react';
import clsx from 'clsx';

import spinnerStyles from './spinner.module.scss';

export type SpinnerProps = {
  className?: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  variant?: 'simple' | 'dots',
  id?: string,
};

const sizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
};

const Spinner = ({ size = 'md', variant = 'simple', className, id }: SpinnerProps) => (
  <div id={id} className={className} style={{ height: sizes[size], width: sizes[size] }}>
    <svg
      className={clsx([
        variant === 'simple' && spinnerStyles.spinner,
        variant === 'dots' && spinnerStyles.svg,
      ])}
      viewBox="0 0 50 50"
    >
      <circle
        className={clsx([
          spinnerStyles.path,
          'dark:text-gray-300 text-gray-500',
        ])}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
        strokeDasharray={3}
      ></circle>
    </svg>
  </div>
);

export default Spinner;