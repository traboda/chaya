import React from 'react';
import styled from '@emotion/styled';

type ProgressBarContainer = {
    height: string,
}

const ProgressBarContainer = styled.div<ProgressBarContainer>`
    border-radius: 5px;
    background: ${({theme}) => theme.secondaryTextColor};
    border: 1px solid ${({theme}) => theme.secondary};
    padding: 0;
  	height: ${({ height }) => height};
  	div {
      background-color: ${({theme}) => theme.secondary};
	  height: 100%;
      background-image: ${({ stripsNone }) => stripsNone ? '' : 'linear-gradient( 45deg, rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%, rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%, transparent 75%,transparent )'};
      background-size: 1rem 1rem;
    }
`;

type ProgressBar = {
    percent?: number,
    minVal?: number,
    maxVal?: number,
    height?: string,
    stripsNone?: boolean
}

const ProgressBar = ({ className, stripsNone = false, childClassName, height = '1.35rem', percent = 0, minVal = 0, maxVal = 100 }: ProgressBar) => (
    <ProgressBarContainer height={height} stripsNone={stripsNone} className={className}>
        <div
            className={childClassName}
            role="progressbar"
            style={{ width: `${percent||0}%` }}
            aria-valuenow={(percent/100)*maxVal}
            aria-valuemin={minVal}
            aria-valuemax={maxVal}
        />
    </ProgressBarContainer>
);

export default ProgressBar;