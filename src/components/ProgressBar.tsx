import React, { useContext } from 'react';
import clsx from 'clsx';

import DSRContext from '../contexts/DSRContext';

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

  const { theme, isDarkTheme } = useContext(DSRContext);
  
  return (
      <div
          id={id}
          className={clsx([
            'dsr-w-full dsr-rounded-lg',
            className,
          ])}
          style={{
            background: isDarkTheme ? 'rgba(237, 237, 237, 0.1)' : 'rgba(237, 237, 237, 0.75)',
            height: height ? height : sizes[size],
          }}
      >
          <div
              role="progressbar"
              className={clsx([
                'dsr-rounded-lg dsr-h-full',
              ])}
              style={{
                width: `${value || 0}%`,
                backgroundSize: '1rem 1rem',
                backgroundColor: theme?.secondary,
                backgroundImage: striped ? 'linear-gradient( 45deg, rgba(255,255,255,.15) 25%,transparent 25%,' +
                    'transparent 50%, rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%, ' +
                    'transparent 75%,transparent )' : '',
              }}
              aria-valuenow={(value / 100) * maxVal}
              aria-valuemin={minVal}
              aria-valuemax={maxVal}
          />
      </div>
  );
};

export default ProgressBar;