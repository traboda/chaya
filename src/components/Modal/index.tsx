'use client';
import React, { ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import * as Dialog from '@radix-ui/react-dialog';

import useDelayUnmount from '../../hooks/useDelayUnmount';
import Icon, { IconInputType } from '../Icon';
import mcs from '../../utils/merge';

import Button, { ButtonProps } from './../Button';
import modalStyles from './modal.module.scss';

export type ModalProps = {
  children: ReactNode,
  isOpen?: boolean,
  overlayContent?: ReactNode,
  onClose?: () => void,
  title?: string,
  description?: string,
  hideBg?: boolean,
  overlayClassName?: string,
  containerClassName?: string,
  contentClassName?: string,
  titleClassName?: string,
  headerClassName?: string,
  maxWidth?: number | string,
  minHeight?: number | string,
  maxHeight?: number | string,
  primaryButton?: ButtonProps,
  secondaryButton?: ButtonProps,
  titleIcon?: IconInputType,
  closable?: boolean
};

const Modal = ({
  isOpen = true, children, onClose = () => {}, title, description,
  containerClassName, overlayClassName = '', titleClassName = '', headerClassName = '',
  overlayContent, contentClassName = '', titleIcon,
  maxWidth = 720, hideBg = false, minHeight, maxHeight = '75vh', primaryButton, secondaryButton, closable = true,
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
    <Dialog.Root open={isOpen} onOpenChange={() => closable ? onClose() : null} modal>
      <Dialog.Portal>
        <Dialog.Overlay>
          {overlayContent}
        </Dialog.Overlay>
        <Dialog.Content
          className={mcs([
            'modal-wrapper fixed top-0 left-0 w-screen h-[100dvh] flex justify-center',
            'items-end sm:items-center backdrop-blur z-[7200]',
            hideBg ? 'bg-white/75 dark:bg-black/75' : 'bg-white/50 dark:bg-black/50',
            overlayClassName,
          ])}
          onClick={() => closable && onClose()}
        >
          <div
            className={mcs([
              'modal-container relative rounded-t-lg sm:rounded-b-lg shadow-lg sm:w-auto w-full',
              'text-color max-w-screen max-h-[100dvh] overflow-auto',
              'border dark:border-gray-500/70 border-gray-500/10',
              containerClassName,
              isOpen ? modalStyles.animateIn : modalStyles.animateOut,
              hideBg ? '' : 'bg-background',
            ])}
            style={{ maxWidth }}
            onClick={e => e.stopPropagation()}
          >
            <div
              className={mcs([
                'modal-header flex flex-col items-start justify-between gap-1 w-full',
                'px-3 py-2 rounded-t-lg border-b',
                'bg-background-lighten-1 dark:bg-background-darken-1 dark:border-neutral-500/70 border-neutral-500/20',
                headerClassName,
              ])}
            >
              {closable && (
                <div className="absolute top-0 right-0 pr-2 pt-2">
                  <Dialog.Close asChild>
                    <button
                      tabIndex={-1}
                      type="button"
                      title="close"
                      className={clsx([
                        'font-mono rounded outline-none font-bold text-2xl p-0',
                        'focus:ring-2',
                      ])}
                    >
                      <Icon aria-hidden="true" icon="times" size={18} />
                    </button>
                  </Dialog.Close>
                </div>
              )}
              {title && (
                <Dialog.Title asChild>
                  <h3
                    className={mcs([
                      'text-xl font-semibold flex items-center gap-2',
                      titleClassName,
                    ])}
                  >
                    {titleIcon ? <Icon icon={titleIcon} /> : null}
                    {title}
                  </h3>
                </Dialog.Title>
              )}
              {description && (
                <p className="opacity-80 text-sm">
                  {description}
                </p>
              )}
            </div>
            <div
              className={mcs([contentClassName, 'overflow-auto p-2'])}
              style={{ maxWidth, minHeight, maxHeight }}
            >
              {children}
            </div>
            {(primaryButton || secondaryButton) ? (
              <div
                className={clsx([
                  'modal-footer px-3 py-1 rounded-b-lg border-t',
                  'bg-background-lighten-1 dark:bg-background-darken-1 dark:border-neutral-500/70 border-neutral-500/20',
                ])}
              >
                {(primaryButton && secondaryButton) ? (
                  <div className="flex items-center justify-end gap-2">
                    {secondaryButton && <Button {...secondaryButton} />}
                    {primaryButton && <Button {...primaryButton} />}
                  </div>
                ) : primaryButton && (
                  <Button
                    variant="solid"
                    color="primary"
                    size="lg"
                    className={mcs(['w-full', primaryButton?.className])}
                    {...primaryButton}
                  />
                )}
              </div>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ) : <div />;
};

export default Modal;