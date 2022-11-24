import React from 'react';
import styled from '@emotion/styled';

type ProgressBarContainer = {
    height: string,
    striped: boolean,
}

const ProgressBarContainer = styled.div<ProgressBarContainer>`
    background: ${({ theme }) => theme.isDarkTheme ? 'rgba(237, 237, 237, 0.1)' : 'rgba(237, 237, 237, 0.75)' };
  	height: ${({ height }) => height};
  	div {
      background-color: ${({theme}) => theme.secondary};
      background-image: ${({ striped }) => striped ? 'linear-gradient( 45deg, rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%, rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%, transparent 75%,transparent )' : null};
      background-size: 1rem 1rem;
    }
`;

type ProgressBar = {
    value: number,
    striped?: boolean,
    size?: ('xs'|'sm'|'md'|'lg'|'xl'),
    id?: string,
    className?: string,
    height?: string,
    minVal?: number,
    maxVal?: number,
}

const sizes = {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem',
}

const ProgressBar = ({ value, striped = false, size = 'md', className = '', id, minVal = 0, maxVal = 100, height }: ProgressBar) => (
    <ProgressBarContainer
        id={id}
        height={height ?? sizes[size]}
        striped={striped}
        className={`progress-bar-container rounded-lg w-full p-0 ${className}`}
    >
        <div
            role="progressbar"
            className="progress-bar rounded-lg h-full"
            style={{ width: `${value||0}%` }}
            aria-valuenow={(value/100)*maxVal}
            aria-valuemin={minVal}
            aria-valuemax={maxVal}
        />
    </ProgressBarContainer>
);

export default ProgressBar;