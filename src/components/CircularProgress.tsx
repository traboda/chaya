import React from 'react';
import styled from "@emotion/styled";
import {useTheme} from "@emotion/react";

const BackgroundCircle = styled('circle')`
  stroke: ${({ theme }) => theme.isDarkTheme ? 'rgba(237, 237, 237, 0.1)' : 'rgba(237, 237, 237, 0.75)' };
`;

type CircularProgressProps = {
    value: number,
    size?: ('xs'|'sm'|'md'|'lg'|'xl'),
    thickness?: ('xs'|'sm'|'md'|'lg'|'xl'),
    strokeColor?: string,
    minVal?: number,
    maxVal?: number,
    height?: number,
    className?: string,
};

const sizes = {
    xs: '45px',
    sm: '72px',
    md: '100px',
    lg: '150px',
    xl: '200px',
}

const thicknesses = {
    xs: 6,
    sm: 9,
    md: 12,
    lg: 16,
    xl: 18,
};

const radius_options = {
    xs: 42,
    sm: 40,
    md: 38,
    lg: 36,
    xl: 34
};

const offset_options = {
    xs: 66,
    sm: 75,
    md: 85,
    lg: 92,
    xl: 103,
}

const CircularProgress = ({
    value = 0, size = 'md', thickness = 'md', minVal = 0, maxVal = 100, height, className, strokeColor,
}:CircularProgressProps) => {

    const theme = useTheme();

    return (
        <div
            role="progressbar"
            aria-valuenow={(value/100)*maxVal}
            aria-valuemin={minVal}
            aria-valuemax={maxVal}
            className={className}
        >
            <svg
                viewBox="0 0 100 100"
                height={height ?? sizes[size]}
            >
                <BackgroundCircle
                    cx={50}
                    cy={50}
                    r={radius_options[thickness]}
                    fill="transparent"
                    strokeWidth={thicknesses[thickness]}
                />
                <circle
                    cx={50}
                    cy={50}
                    r={radius_options[thickness]}
                    fill="transparent"
                    stroke={strokeColor ?? theme?.primary}
                    strokeWidth={thicknesses[thickness]}
                    strokeDashoffset={offset_options[thickness]}
                    strokeDasharray={`${value * 2.64} ${264 - (value * 2.64)}`}
                />
            </svg>
        </div>
    );
}

export default CircularProgress;