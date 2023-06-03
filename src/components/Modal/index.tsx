import React, { ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import * as Dialog from '@radix-ui/react-dialog';

import useDelayUnmount from '../../hooks/useDelayUnmount';
import Icon, { IconInputType } from '../Icon';

import Button, { ButtonProps } from './../Button';
import modalStyles from './modal.module.scss';

export type ModalProps = {
  isOpen: boolean,
  children: ReactNode,
  onClose: () => void,
  title?: string,
  hideBg?: boolean,
  overlayClassName?: string,
  containerClassName?: string,
  contentClassName?: string,
  maxWidth?: number | string,
  minHeight?: number | string,
  maxHeight?: number | string,
  primaryButton?: ButtonProps,
  secondaryButton?: ButtonProps,
  titleIcon?: IconInputType,
  closable?: boolean
};

const Modal = ({
  isOpen, children, onClose, title, containerClassName, overlayClassName = '', contentClassName = '', titleIcon,
  maxWidth = 720, hideBg = false, minHeight, maxHeight, primaryButton, secondaryButton, closable = true,
}: ModalProps) => {

  const shouldRenderChild = useDelayUnmount(isOpen, 300);

  useEffect(() => {
    if (shouldRenderChild) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'initial';
    return () => { document.body.style.overflow = 'initial'; };
  }, [shouldRenderChild]);

  const onKeyDown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape' && closable) onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); };
  }, [closable]);

  return shouldRenderChild ? (
    <Dialog.Root open={isOpen} onOpenChange={(isOpen) => closable ? onClose() : null} modal>
        <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content
                className={clsx([
                    'modal-wrapper dsr-fixed dsr-top-0 dsr-left-0 dsr-w-screen dsr-h-[100dvh] dsr-flex dsr-justify-center',
                    'dsr-items-end sm:dsr-items-center dsr-backdrop-blur dsr-z-[7200]',
                    hideBg ? 'dsr-bg-white/75 dark:dsr-bg-black/75' : 'dsr-bg-white/50 dark:dsr-bg-black/50',
                    overlayClassName,
                ])}
                onClick={() => closable && onClose()}
            >
                <div
                    className={clsx([
                        'modal-container dsr-relative dsr-rounded-t-lg sm:dsr-rounded-b-lg dsr-shadow-lg sm:dsr-w-auto dsr-w-full',
                        'dsr-text-color dsr-max-w-screen dsr-max-h-[100dvh] dsr-overflow-auto',
                        containerClassName,
                        isOpen ? modalStyles.animateIn : modalStyles.animateOut,
                        hideBg ? '' : 'dsr-bg-background',
                    ])}
                    onClick={e => e.stopPropagation()}
                >
                    {closable && (
                        <div className="dsr-absolute dsr-top-0 dsr-right-0 dsr-pr-2 dsr-pt-2">
                            <Dialog.Close asChild>
                                <button
                                    type="button"
                                    title="close"
                                    className="dsr-font-mono dsr-outline-none dsr-font-bold dsr-text-2xl dsr-p-0"
                                >
                                    <Icon icon="times" size={18} />
                                </button>
                            </Dialog.Close>
                        </div>
                    )}
                    {title && (
                        <h2 className="dsr-text-2xl dsr-pt-4 dsr-pb-2 dsr-px-4 dsr-font-semibold">
                            {titleIcon ? <Icon icon={titleIcon} /> : null}
                            <Dialog.Title asChild>
                                {title}
                            </Dialog.Title>
                        </h2>
                    )}
                    <div
                        className={clsx([contentClassName, 'dsr-overflow-auto'])}
                        style={{ maxWidth, minHeight, maxHeight }}
                    >
                        {children}
                    </div>
                    {(primaryButton && secondaryButton) ? (
                        <div className="dsr-flex dsr-items-center dsr-justify-end dsr-py-2 dsr-px-3 dsr-gap-2">
                            {secondaryButton && <Button {...secondaryButton} />}
                            {primaryButton && <Button {...primaryButton} />}
                        </div>
                    ) : primaryButton && (
                        <Button
                            variant="solid"
                            color="primary"
                            size="lg"
                            className={clsx(['dsr-w-full dsr-mt-2', primaryButton?.className])}
                            {...primaryButton}
                        />
                    )}
                </div>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
  ) : <div />;
};

export default Modal;