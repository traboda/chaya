import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const shine = keyframes`
  50% {
    background-position: 100%;
  }
`;

type SkeletonItem = {
    circular?: boolean,
    minWidth?: string
    w?: string,
    h?: string
    mb?: string
}

const SkeletonItem = styled('div')<SkeletonItem>`
    background-repeat: no-repeat;
    border-radius: ${({ circular }) => (circular ? '100vw' : '2px')};
    background-color: hsla(0,0%,55%,.2);
    background-image: linear-gradient(
        90deg,
        hsla(0,0%,35%,.2) 0px,
        hsla(0,0%,45%,.2) 30%,
        hsla(0,0%,55%,.2) 90%
    );
    background-size: 600px;
    min-width: ${({ minWidth }) => (minWidth ? minWidth : null)};
    width: ${({ w }) => (w ? `${w}` : '20px')};
    height: ${({ h }) => (h ? `${h}` : '20px')};
    animation: ${shine} 1s infinite alternate-reverse linear;
    margin-bottom: ${({ mb }) => (mb ? mb : '0')};
`;

export default SkeletonItem;
