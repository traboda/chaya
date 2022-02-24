import React, { ReactNode, useEffect } from 'react';
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

import useDelayUnmount from '../hooks/useDelayUnmount';
import DocumentPortal from "../utils/Portal";

import Button, { ButtonProps } from "./Button";


type ModalProps = {
    isOpen: boolean,
    children: ReactNode,
    onClose: () => void,
    title?: string,
    iconClassName?: string,
    hideBg?: boolean,
    contentClassName?: string,
    maxWidth?: number | string,
    minHeight?: number | string,
    maxHeight?: number | string,
    primaryButton?: ButtonProps,
    secondaryButton?: ButtonProps,
};

type ModalContainer = {
    hideBg?: boolean
};

const ModalContainer = styled.div<ModalContainer>`
  .modal-section {
    background: ${({ theme, hideBg }) =>  `rgba(${theme.isDarkTheme ? `0, 0, 0,` : `255, 255, 255,`}${hideBg ? 0.75 : 0.5})`};
    z-index: 7200;
  }

  @keyframes expand {
    0% { height: 0; opacity: 0.5; overflow: hidden; }
    35% { height: 35%; opacity: 0.75; overflow: hidden}
    100% { opacity: 1; height: auto; overflow: unset }
  }

  @keyframes crunch {
    0%  { opacity: 1 }
    25% { height: 50%; overflow: hidden }
    50% { height: 0; opacity: 0; overflow: hidden }
    100% { height: 0; opacity: 0; overflow: hidden }
  }

  .animate-fade-in {
    animation: 100ms expand linear;
  }

  @keyframes bg-fadeout {
    0%  { background: rgba(0, 0, 0, 0.5)!important; --tw-backdrop-blur: 1px!important; }
    50% { background: rgba(0, 0, 0, 0.25)!important; opacity: 0.5; --tw-backdrop-blur: 0!important;}
    100% { background: rgba(0, 0, 0, 0)!important; opacity: 0; height: 0; }
  }

  .animate-fade-out {
    animation: 350ms bg-fadeout ease-out;
  }

  .animate-crunch {
    animation: 500ms crunch ease-out;
  }
`;

const Modal = ({
   isOpen, children, onClose, title, iconClassName = '', contentClassName = '',
   maxWidth = 720, hideBg = false, minHeight, maxHeight, primaryButton, secondaryButton,
}: ModalProps) => {

    const { background, color } = useTheme();
    const shouldRenderChild = useDelayUnmount(isOpen, 300);

    useEffect(() => {
        if (shouldRenderChild) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = null;
        return () => document.body.style.overflow = null;
    }, [shouldRenderChild]);

    const onKeyDown = ({ keyCode }) => {
        if (keyCode === 27) onClose();
    }

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    return shouldRenderChild ? (
        <DocumentPortal>
            <ModalContainer hideBg={hideBg}>
                <section
                    className={`modal-section fixed top-0 left-0 w-screen h-screen flex justify-center items-end sm:items-center backdrop-filter backdrop-blur-sm ${!isOpen ? 'animate-fade-out' : ''}`}
                    onClick={onClose}
                >
                    <div
                        className={`relative rounded-t-lg sm:rounded-b-lg shadow-lg sm:w-auto w-full animate-fade-in ${!isOpen ? 'animate-crunch' : ''}`}
                        style={{ background: !hideBg ? background : null, color }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="absolute top-0 right-0 pr-2">
                            <button
                                type="button"
                                title="close"
                                className="font-mono outline-none font-bold text-2xl p-0"
                                onClick={onClose}
                            >
                                x
                            </button>
                        </div>
                        {title && <h2 className="text-2xl pt-4 pb-2 px-4 font-semibold">
                            {iconClassName && <i className={iconClassName} />}
                            {title}
                        </h2>}
                        <div
                            className={`${contentClassName} overflow-auto`}
                            style={{ maxWidth, minHeight, maxHeight }}
                        >
                            {children}
                        </div>
                        {(primaryButton && secondaryButton) ? (
                            <div className="flex items-center justify-end py-2 px-3 gap-2">
                                {secondaryButton && (
                                    <Button {...secondaryButton} />
                                )}
                                {primaryButton && (
                                    <Button {...primaryButton} />
                                )}
                            </div>
                        ) : primaryButton && (
                            <Button
                                variant="solid"
                                color="primary"
                                size="lg"
                                className={`w-full mt-2 ${primaryButton?.className || ''}`}
                                {...primaryButton}
                            />
                        )}
                    </div>
                </section>
            </ModalContainer>
        </DocumentPortal>
    ) : <div/>;
};

export default Modal;