'use client';
import React, { CSSProperties, ReactNode, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import * as Dialog from '@radix-ui/react-dialog';

import useDelayUnmount from '../../hooks/useDelayUnmount';
import Icon, { IconInputType } from '../Icon';

import drawerStyles from './drawer.module.scss';


export type DrawerProps = {
  children: ReactNode,
  isOpen?: boolean,
  onClose?: () => void,
  overlayClassName?: string,
  className?: string,
  position?: 'top' | 'right' | 'bottom' | 'left',
  minWidth?: string | number,
  minHeight?: string | number,
  maxWidth?: string | number,
  maxHeight?: string | number,
  closable?: boolean,
  overlayContent?: ReactNode,
  title?: string,
  description?: string,
  titleIcon?: IconInputType,
};

const Drawer = ({
  isOpen = true, onClose = () => {}, position = 'right', children, overlayClassName = '', className = '',
  minWidth = '15vh', maxWidth = '100%', minHeight = '15vh', maxHeight = '100%', closable = true, overlayContent,
  title, description, titleIcon,
}: DrawerProps) => {

  const shouldRenderChild = useDelayUnmount(isOpen, 400);

  const getPositionAlignmentParent = {
    top: 'dsr-justify-start dsr-items-start',
    right: 'dsr-justify-end dsr-items-start',
    bottom: 'dsr-justify-start dsr-items-end',
    left: 'dsr-justify-start dsr-items-start',
  }[position];

  const getPositionAlignmentChild = {
    top: 'dsr-w-flex-1 dsr-rounded-lg',
    right: 'dsr-h-full dsr-rounded-lg',
    bottom: 'dsr-w-flex-1 dsr-rounded-lg',
    left: 'dsr-h-full dsr-rounded-lg',
  }[position];

  const positionDirection = {
    top: '-100%',
    right: '100%',
    bottom: '100%',
    left: '-100%',
  }[position];

  const getPositionAnimation = useMemo(() => {
    if (position === 'top' || position === 'bottom') {
      return isOpen ? drawerStyles.animateTranslateOutY : drawerStyles.animateTranslateInY;
    } else return isOpen ? drawerStyles.animateTranslateOutX : drawerStyles.animateTranslateInX;
  }, [isOpen, position]);

  useEffect(() => {
    if (shouldRenderChild) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => {document.body.style.overflow = 'auto';};
  }, [shouldRenderChild]);

  const onKeyDown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return shouldRenderChild ? (
    <Dialog.Root open={isOpen} onOpenChange={() => closable ? onClose() : null} modal>
      <Dialog.Portal>
        <Dialog.Overlay>
          {overlayContent}
        </Dialog.Overlay>
        <Dialog.Content
          className={clsx([
            'dsr-fixed dsr-top-0 dsr-left-0 dsr-w-screen dsr-h-[100dvh] dsr-z-[7200] dsr-flex dsr-p-2',
            'dsr-backdrop-filter dsr-backdrop-blur-sm dsr-bg-black dsr-bg-opacity-30',
            getPositionAlignmentParent,
            overlayClassName,
          ])}
          onClick={() => closable && onClose()}
        >
          <div
            className={clsx([
              'dsr-relative dsr-shadow-lg dsr-sm:w-auto dsr-w-full dsr-bg-background dsr-text-color',
              'dsr-border dark:dsr-border-gray-500/70 dsr-border-gray-500/10 dsr-overflow-auto',
              getPositionAlignmentChild,
              getPositionAnimation,
              className,
            ])}
            style={{
              minHeight,
              maxHeight,
              maxWidth: position === 'right' || position === 'left' ? maxWidth : '100%',
              minWidth,
              '--drawer-position-direction': positionDirection,
            } as CSSProperties}
            onClick={e => e.stopPropagation()}
          >
            <div
              className={clsx([
                'modal-header dsr-flex dsr-flex-col dsr-items-start dsr-justify-between dsr-gap-1 dsr-w-full',
                'dsr-px-3 dsr-py-2 dsr-rounded-t-lg dsr-border-b',
                'dsr-bg-background-lighten-1 dark:dsr-bg-background-darken-1 dark:dsr-border-neutral-500/70 dsr-border-neutral-500/20',
              ])}
            >
              {closable && (
                <div className="dsr-absolute dsr-top-0 dsr-right-0 dsr-pr-2 dsr-pt-2">
                  <Dialog.Close asChild>
                    <button
                      tabIndex={-1}
                      type="button"
                      title="close"
                      className={clsx([
                        'dsr-font-mono dsr-rounded dsr-outline-none dsr-font-bold dsr-text-2xl dsr-p-0',
                        'focus:dsr-ring-2',
                      ])}
                      onClick={onClose}
                    >
                      <Icon aria-hidden="true" icon="times" size={18} />
                    </button>
                  </Dialog.Close>
                </div>
              )}
              {title && (
                <Dialog.Title asChild>
                  <h3
                    className={clsx([
                      'dsr-text-xl dsr-font-semibold dsr-flex dsr-items-center dsr-gap-2',
                    ])}
                  >
                    {titleIcon ? <Icon icon={titleIcon} /> : null}
                    {title}
                  </h3>
                </Dialog.Title>
              )}
              {description && (
                <p className="dsr-opacity-80 dsr-text-sm">
                  {description}
                </p>
              )}
            </div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ) : <div />;
};

export default Drawer;
