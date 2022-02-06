import React, {ReactNode, useEffect, useState} from 'react';
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

type ModalProps = {
    isOpen: boolean,
    children: ReactNode,
    onClose: () => void,
    bgClassName?: string,
    contentClassName?: string,
    maxWidth?: number | string,
    minHeight?: number | string,
    maxHeight?: number | string,
};

const ModalContainer = styled.div`
  @keyframes expand {
    0% { height: 0; opacity: 0.5; overflow: hidden; }
    35% { height: 35%; opacity: 0.75; overflow: hidden}
    100% { opacity: 1; height: auto; overflow: unset }
  }

  @keyframes crunch {
    0%  { opacity: 1 }
    25% { height: 50%; overflow: hidden }
    50% { height: 0; opacity: 0; overflow: hidden }
    100% { opacity: 0 }
  }

  .animate-fade-in {
    animation: 300ms expand linear;
  }

  @keyframes bg-fadeout {
    0%  { background: rgba(0, 0, 0, 0.5); }
    50% { background: rgba(0, 0, 0, 0.25); opacity: 0.5; }
    100% { background: rgba(0, 0, 0, 0); opacity: 0; }
  }

  .animate-fade-out {
    animation: 500ms bg-fadeout linear;
  }

  .animate-crunch {
    animation: 500ms crunch linear;
  }
`;

const useDelayUnmount = (isMounted: boolean, delayTime: number) => {

    const [ shouldRender, setShouldRender ] = useState(false);

    useEffect(() => {
        let timeoutId: any;
        if (isMounted && !shouldRender) {
            setShouldRender(true);
        }
        else if(!isMounted && shouldRender) {
            timeoutId = setTimeout(
                () => setShouldRender(false),
                delayTime
            );
        }
        return () => clearTimeout(timeoutId);
    }, [isMounted, delayTime, shouldRender]);
    return shouldRender;

}

const Modal = ({
   isOpen, children, onClose, bgClassName = '', contentClassName = '',
   maxWidth = 720, minHeight, maxHeight,
}: ModalProps) => {

    const { background, color } = useTheme();
    const shouldRenderChild = useDelayUnmount(isOpen, 500);

    useEffect(() => {
        if (shouldRenderChild) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = null;
    }, [shouldRenderChild]);

    return shouldRenderChild ? (
        <ModalContainer
            className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-end sm:items-center backdrop-filter backdrop-blur-sm ${!isOpen ? `animate-fade-out` : ''}`}
            style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 10000 }}
            onClick={onClose}
        >
            <div
                className={`${bgClassName} relative rounded-t-lg sm:rounded-b-lg shadow-lg sm:w-auto w-full animate-fade-in ${!isOpen ? 'animate-crunch' : ''}`}
                style={{ background, color }}
                onClick={e => e.stopPropagation()}
            >
                <div className="absolute top-0 right-0 pr-2">
                    <button title="close" className="font-mono outline-none font-bold text-2xl" onClick={onClose}>x</button>
                </div>
                <div
                    className={`${contentClassName} overflow-y-auto`}
                    style={{ maxWidth, minHeight, maxHeight }}
                >
                    {children}
                </div>
            </div>
        </ModalContainer>
    ) : <div />;
};

export default Modal;