'use client';
import React, { CSSProperties, ReactNode, useEffect, useMemo } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';

import useDelayUnmount from '../../hooks/useDelayUnmount';
import mcs from '../../utils/merge';
import Icon, { IconInputType } from '../Icon';

import drawerStyles from './drawer.module.scss';

export type DrawerProps = {
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  overlayClassName?: string;
  contentClassName?: string;
  className?: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  closable?: boolean;
  overlayContent?: ReactNode;
  title?: string;
  description?: string;
  titleIcon?: IconInputType;
  headerClassName?: string;
};

const Drawer = ({
  isOpen = true,
  onClose = () => {},
  position = 'right',
  children,
  overlayClassName = '',
  className = '',
  minWidth = '15vh',
  maxWidth = '100%',
  minHeight = '15vh',
  maxHeight = '100%',
  closable = true,
  overlayContent,
  title,
  description,
  titleIcon,
  contentClassName,
  headerClassName = '!bg-transparent',
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
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [shouldRenderChild]);

  const onKeyDown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return shouldRenderChild ? (
    <Dialog.Root open={isOpen} onOpenChange={() => (closable ? onClose() : null)} modal>
      <Dialog.Portal>
        <Dialog.Overlay>{overlayContent}</Dialog.Overlay>
        <Dialog.Content
          className={mcs([
            'fixed top-0 left-0 z-[7200] flex h-[100dvh] w-screen p-2',
            'bg-black/30 backdrop-blur-sm backdrop-filter',
            getPositionAlignmentParent,
            overlayClassName,
          ])}
          onClick={() => closable && onClose()}
        >
          <div
            className={mcs([
              'bg-background text-color relative w-full sm:w-auto',
              'overflow-auto border',
              getPositionAlignmentChild,
              getPositionAnimation,
              className,
            ])}
            style={
              {
                maxWidth: position === 'right' || position === 'left' ? maxWidth : '100%',
                '--drawer-position-direction': positionDirection,
              } as CSSProperties
            }
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
                className={clsx([
                  'modal-header flex w-full flex-col items-start justify-between gap-1',
                  'rounded-t-lg border-b px-3 py-2',
                  'border-light bg-background-lighten-1 dark:bg-background-darken-1',
                  headerClassName,
                ])}
              >
                {title && (
                  <Dialog.Title asChild>
                    <h3 className={clsx(['flex items-center gap-2 text-xl font-semibold'])}>
                      {titleIcon ? <Icon icon={titleIcon} /> : null}
                      {title}
                    </h3>
                  </Dialog.Title>
                )}
                {description && <p className="text-sm opacity-80">{description}</p>}
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
  ) : (
    <div />
  );
};

export default Drawer;
