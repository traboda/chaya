import React, { ReactNode, useEffect } from 'react';
import { useTheme } from "@emotion/react";

type ModalProps = {
    isOpen: boolean,
    children: ReactNode,
    onClose: () => void,
    contentClassName?: string,
    maxWidth?: number | string
}

const Modal = ({ isOpen, children, onClose, contentClassName = '', maxWidth = 720 }: ModalProps) => {
    const { background, color } = useTheme();

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = null;
    }, [isOpen]);

    return isOpen ? (
        <div
            className="fixed top-0 left-0 w-screen h-screen flex justify-center items-end sm:items-center backdrop-filter backdrop-blur-sm"
            style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 10000 }}
            onClick={onClose}
        >
            <div
                className="relative rounded-t-lg sm:rounded-b-lg shadow-lg sm:w-auto w-full"
                style={{ background, color }}
                onClick={e => e.stopPropagation()}
            >
                <div className="absolute top-0 right-0 pr-2">
                    <span className="cursor-pointer font-mono font-bold text-2xl" onClick={onClose}>x</span>
                </div>

                <div
                    className={`${contentClassName} max-h-screen overflow-y-auto`}
                    style={{ maxWidth, minHeight: '15vh' }}
                >
                    {children}
                </div>
            </div>
        </div>
    ) : <div />;
};

export default Modal;