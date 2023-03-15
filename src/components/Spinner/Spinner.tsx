import React, { useContext } from 'react';
import clsx from 'clsx';

import DSRContext from '../../contexts/DSRContext';

import spinnerStyles from './spinner.module.scss';

type SpinnerProps = {
  className?: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  variant?: 'simple' | 'dots',
};

const sizes = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '2rem',
  xl: '3rem',
};

const Spinner = ({ size = 'md', variant = 'simple' }: SpinnerProps) => {
  const { isDarkTheme } = useContext(DSRContext);
  
  return (
      <div style={{ height: sizes[size], width: sizes[size] }}>
          <svg
              className={clsx([
                variant === 'simple' && spinnerStyles.spinner,
                variant === 'dots' && spinnerStyles.svg,
              ])}
              viewBox="0 0 50 50"
          >
              <circle 
                  className={spinnerStyles.path}
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke={isDarkTheme ? 'rgba(237, 237, 237, 0.75)' : 'rgba(0, 0, 0, 0.5)'}
                  strokeWidth="5"
                  strokeDasharray={3}
              ></circle>
          </svg>
      </div>
  );
};

export default Spinner;