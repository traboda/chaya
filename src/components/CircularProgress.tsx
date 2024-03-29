import React from 'react';

import mcs from '../utils/merge';

export type CircularProgressProps = {
  value: number,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  thickness?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  strokeColor?: string,
  minVal?: number,
  maxVal?: number,
  height?: number,
  className?: string,
  isIndeterminate?: boolean,
};

const sizes = {
  xs: '45px',
  sm: '72px',
  md: '100px',
  lg: '150px',
  xl: '200px',
};

const thicknesses = {
  xs: 6,
  sm: 9,
  md: 12,
  lg: 16,
  xl: 18,
};

const radiusOptions = {
  xs: 42,
  sm: 40,
  md: 38,
  lg: 36,
  xl: 34,
};

const offsetOptions = {
  xs: 66,
  sm: 75,
  md: 85,
  lg: 92,
  xl: 103,
};

const CircularProgress = ({
  value = 0, size = 'md', thickness = 'md', minVal = 0, maxVal = 100, height, className, strokeColor,
  isIndeterminate = false,
}: CircularProgressProps) => {

  return (
    <div
      role="progressbar"
      aria-valuenow={(value / 100) * maxVal}
      aria-valuemin={minVal}
      aria-valuemax={maxVal}
      className={mcs(['circular-progress', className])}
    >
      <svg
        viewBox="0 0 100 100"
        height={height ?? sizes[size]}
        className={isIndeterminate ? 'animate-spin' : ''}
      >
        <circle
          cx={50}
          cy={50}
          r={radiusOptions[thickness]}
          fill="transparent"
          className="dark:stroke-[#EDEDED]/[0.1] stroke-[#EDEDED]/[0.75]"
          strokeWidth={thicknesses[thickness]}
        />
        <circle
          cx={50}
          cy={50}
          r={radiusOptions[thickness]}
          fill="transparent"
          stroke={strokeColor}
          className={!(strokeColor?.length) ? 'stroke-primary' : undefined}
          strokeWidth={thicknesses[thickness]}
          strokeDashoffset={offsetOptions[thickness]}
          strokeDasharray={`${value * 2.64} ${264 - (value * 2.64)}`}
        />
      </svg>
    </div>
  );
};

export default CircularProgress;
