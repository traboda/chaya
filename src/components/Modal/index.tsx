'use client';
import React, { ReactNode, useEffect } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';

import useDelayUnmount from '../../hooks/useDelayUnmount';
import mcs from '../../utils/merge';
import Button, { ButtonProps } from '../Button';
import Icon, { IconInputType } from '../Icon';

import modalStyles from './modal.module.scss';

export type ModalProps = {
  children: ReactNode;
  isOpen?: boolean;
  overlayContent?: ReactNode;
  onClose?: () => void;
  title?: string;
  description?: string;
  hideBg?: boolean;
  overlayClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  headerClassName?: string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  titleIcon?: IconInputType;
  closable?: boolean;
};

const Modal = ({
  isOpen = true,
  children,
  onClose = () => {},
  title,
  description,
  containerClassName,
  overlayClassName = '',
  titleClassName = '',
  headerClassName = '',
  overlayContent,
  contentClassName = '',
  titleIcon,
  maxWidth = 720,
  hideBg = false,
  minHeight,
  maxHeight = '75vh',
  primaryButton,
  secondaryButton,
  closable = true,
}: ModalProps) => {
  const shouldRenderChild = useDelayUnmount(isOpen, 300);

  useEffect(() => {
    if (shouldRenderChild) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'initial';
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [shouldRenderChild]);

  const onKeyDown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape' && closable) onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [closable]);

  return shouldRenderChild ? (
    <Dialog.Root open={isOpen} onOpenChange={() => (closable ? onClose() : null)} modal>
      <Dialog.Portal>
        <Dialog.Overlay>{overlayContent}</Dialog.Overlay>
        <Dialog.Content
          className={mcs([
            'modal-wrapper fixed top-0 left-0 flex h-[100dvh] w-screen justify-center',
            'z-[7200] items-end backdrop-blur sm:items-center',
            hideBg ? 'bg-white/75 dark:bg-black/75' : 'bg-white/50 dark:bg-black/50',
            overlayClassName,
          ])}
          onClick={() => closable && onClose()}
        >
          <div
            className={mcs([
              'modal-container relative w-full rounded-t-lg shadow-lg sm:w-auto sm:rounded-b-lg dark:shadow-xl dark:shadow-black/40',
              'text-color max-h-[100dvh] max-w-screen overflow-auto',
              'border',
              containerClassName,
              isOpen ? modalStyles.animateIn : modalStyles.animateOut,
              hideBg ? '' : 'bg-background',
            ])}
            style={{ maxWidth }}
            onClick={(e) => e.stopPropagation()}
          >
            {closable && (
              <div className="absolute top-0 right-0 pt-2 pr-2">
                <Dialog.Close asChild>
                  <button
                    tabIndex={-1}
                    type="button"
                    title="close"
                    className={clsx([
                      'rounded p-0 font-mono text-2xl font-bold outline-none',
                      'focus:ring-2',
                    ])}
                  >
                    <Icon aria-hidden="true" icon="times" size={18} />
                  </button>
                </Dialog.Close>
              </div>
            )}
            {title?.length || description?.length ? (
              <div
                className={mcs([
                  'modal-header flex w-full flex-col items-start justify-between gap-1',
                  'rounded-t-lg border-b px-3 py-2',
                  'border-light bg-background-lighten-1 dark:bg-background-darken-1',
                  headerClassName,
                ])}
              >
                {title && (
                  <Dialog.Title asChild>
                    <h3
                      className={mcs([
                        'flex items-center gap-2 text-xl font-semibold',
                        titleClassName,
                      ])}
                    >
                      {titleIcon ? <Icon icon={titleIcon} /> : null}
                      {title}
                    </h3>
                  </Dialog.Title>
                )}
                {description && <p className="text-sm opacity-80">{description}</p>}
              </div>
            ) : null}
            <div
              className={mcs([contentClassName, 'modal-content overflow-auto p-2'])}
              style={{ maxWidth, minHeight, maxHeight }}
            >
              {children}
            </div>
            {primaryButton || secondaryButton ? (
              <div
                className={clsx([
                  'modal-footer rounded-b-lg border-t p-3',
                  'border-light bg-background-lighten-1 dark:bg-background-darken-1',
                ])}
              >
                {primaryButton && secondaryButton ? (
                  <div className="flex items-center justify-end gap-2">
                    {secondaryButton && <Button {...secondaryButton} />}
                    {primaryButton && <Button {...primaryButton} />}
                  </div>
                ) : (
                  primaryButton && (
                    <Button
                      variant="solid"
                      color="primary"
                      size="lg"
                      className={mcs(['w-full', primaryButton?.className])}
                      {...primaryButton}
                    />
                  )
                )}
              </div>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ) : (
    <div />
  );
};

export default Modal;
