import React, { ReactNode, useEffect } from 'react';
import useDelayUnmount from "../hooks/useDelayUnmount";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const DrawerContainer = styled.div`
  section {
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }

  @keyframes fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fade-in {
    animation: 250ms fade ease-in;
  }
  
  .animate-fade-out {
    animation: 300ms fade ease-out reverse;
  }
`;

type DrawerProps = {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode,
    position?: 'top' | 'right' | 'bottom' | 'left',
    minWidth?: string | number,
    minHeight?: string | number,
    maxWidth?: string | number,
    maxHeight?: string | number,
}

const Drawer = ({
    isOpen, onClose, position = 'right', children,
    minWidth = '15vh', maxWidth = '100%', minHeight = '15vh', maxHeight = '100%'
}: DrawerProps) => {

    const { background, color } = useTheme();
    const shouldRenderChild = useDelayUnmount(isOpen, 300);

    const getPositionAlignmentParent = () => {
        switch (position) {
            case 'top': return 'justify-start items-start';
            case 'right': return 'justify-end items-start';
            case 'bottom': return 'justify-start items-end';
            case 'left': return 'justify-start items-start';
        }
    }

    const getPositionAlignmentChild = () => {
        switch (position) {
            case 'top': return 'flex-1 rounded-b-lg';
            case 'right': return 'h-full rounded-l-lg';
            case 'bottom': return 'flex-1 rounded-t-lg';
            case 'left': return 'h-full rounded-r-lg';
        }
    }

    useEffect(() => {
        if (shouldRenderChild) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = null;
        return () => document.body.style.overflow = null;
    }, [shouldRenderChild]);

    return  shouldRenderChild ? (
        <DrawerContainer>
            <section
                className={`
                    fixed top-0 left-0 w-screen h-screen flex backdrop-filter backdrop-blur-sm 
                    ${getPositionAlignmentParent()} ${!isOpen ? 'animate-fade-out' : ''}
                `.trim()}
                onClick={onClose}
            >
                <div
                    className={`relative shadow-lg sm:w-auto w-full animate-fade-in ${getPositionAlignmentChild()} ${!isOpen ? 'animate-crunch' : ''}`}
                    style={{ background, color, minHeight, maxHeight, maxWidth, minWidth }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="absolute top-0 right-0 pr-2">
                        <button
                            title="close"
                            className="font-mono outline-none font-bold text-2xl"
                            onClick={onClose}
                        >
                            x
                        </button>
                    </div>

                    <div>{children}</div>
                </div>
            </section>
        </DrawerContainer>
    ) : <div />;
};

export default Drawer;