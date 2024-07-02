'use client';
import React, { CSSProperties, ReactNode, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import * as Dialog from '@radix-ui/react-dialog';

import useDelayUnmount from '../../hooks/useDelayUnmount';
import Icon, { IconInputType } from '../Icon';
import mcs from '../../utils/merge';

import drawerStyles from './drawer.module.scss';


export type DrawerProps = {
  children: ReactNode,
  isOpen?: boolean,
  onClose?: () => void,
  overlayClassName?: string,
  contentClassName?: string,
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
  title, description, titleIcon, contentClassName,
}: DrawerProps) => {

  const shouldRenderChild = useDelayUnmount(isOpen, 400);

  const getPositionAlignmentParent = {
    top: 'justify-start items-start',
    right: 'justify-end items-start',
    bottom: 'justify-start items-end',
    left: 'justify-start items-start',
  }[position];

  const getPositionAlignmentChild = {
    top: 'w-flex-1 rounded-lg',
    right: 'h-full rounded-lg',
    bottom: 'w-flex-1 rounded-lg',
    left: 'h-full rounded-lg',
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
          className={mcs([
            'fixed top-0 left-0 w-screen h-[100dvh] z-[7200] flex p-2',
            'backdrop-filter backdrop-blur-sm bg-black bg-opacity-30',
            getPositionAlignmentParent,
            overlayClassName,
          ])}
          onClick={() => closable && onClose()}
        >
          <div
            className={mcs([
              'relative shadow-lg sm:w-auto w-full bg-background text-color',
              'border dark:border-gray-500/70 border-gray-500/10 overflow-auto',
              getPositionAlignmentChild,
              getPositionAnimation,
              className,
            ])}
            style={{
              maxWidth: position === 'right' || position === 'left' ? maxWidth : '100%',
              '--drawer-position-direction': positionDirection,
            } as CSSProperties}
            onClick={e => e.stopPropagation()}
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
            {(title?.length || description?.length) ? (
              <div
                className={clsx([
                  'modal-header flex flex-col items-start justify-between gap-1 w-full',
                  'px-3 py-2 rounded-t-lg border-b',
                  'bg-background-lighten-1 dark:bg-background-darken-1 dark:border-neutral-500/70 border-neutral-500/20',
                ])}
              >
                {title && (
                  <Dialog.Title asChild>
                    <h3
                      className={clsx([
                        'text-xl font-semibold flex items-center gap-2',
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
            ) : null}
            <div
              className={mcs([contentClassName, 'drawer-content overflow-auto p-2'])}
              style={{ minWidth, maxWidth, minHeight, maxHeight }}
            >
              {children}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ) :
    <div />
  ;
};

export default Drawer;
