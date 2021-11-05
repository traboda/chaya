import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import styled from '@emotion/styled';

const ToolTipContainer = styled('div')`
  display: inline-block;
  position: relative;
  opacity: 1 !important;
`;

const ToolTipWrapper = styled('div')`
  position: absolute;
  border-radius: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  color: black;
  background: white;
  z-index: 9000;
  white-space: nowrap;
  opacity: 1 !important;

  &::before {
    content: " ";
    left: 50%;
    border: 0.5rem solid transparent;
    position: absolute;
    pointer-events: none;
  }

  &.top {
    top: calc(3.5rem * -1);

    &::before {
      top: 100%;
      border-top-color: white;
    }
  }

  &.bottom {
    bottom: calc(3.5rem * -1);

    &::before {
      bottom: 100%;
      border-bottom-color: white;
    }
  }

  &.left {
    left: calc(3.5rem * -1);

    &::before {
      left: 100%;
      border-bottom-color: white;
    }
  }

  &.right {
    right: calc(3.5rem * -1);

    &::before {
      right: 100%;
      border-bottom-color: white;
    }
  }
`;

type ToolTipProps = {
    placement?: ('left' | 'right' | 'top' | 'bottom'),
    children: ReactElement,
    overlay: (ReactNode | string),
    width?: (string | number)
};

const ToolTip = ({
     children, overlay, placement = 'bottom'
}: ToolTipProps) => {
    const timeout = useRef<any>(null);
    const [active, setActive] = useState(false);

    const showTip = () => {
        timeout.current = setTimeout(() => {
            setActive(true);
        }, 400);
    };

    const hideTip = () => {
        clearInterval(timeout.current);
        setActive(false);
    };

    return (
        <ToolTipContainer onMouseEnter={showTip} onMouseLeave={hideTip}>
            {active && (
                <ToolTipWrapper className={placement}>
                    {overlay}
                </ToolTipWrapper>
            )}
            {children}
        </ToolTipContainer>
    );
};

export default ToolTip;
