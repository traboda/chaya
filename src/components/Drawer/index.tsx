import React, { CSSProperties, ReactNode, useEffect, useMemo } from 'react';
import clsx from 'clsx';

import useDelayUnmount from '../../hooks/useDelayUnmount';
import DocumentPortal from '../../utils/Portal';
import Icon from '../Icon';

import drawerStyles from './drawer.module.scss';


type DrawerProps = {
  isOpen: boolean,
  onClose: () => void,
  children: ReactNode,
  overlayClassName?: string,
  className?: string,
  position?: 'top' | 'right' | 'bottom' | 'left',
  minWidth?: string | number,
  minHeight?: string | number,
  maxWidth?: string | number,
  maxHeight?: string | number,
};

const Drawer = ({
  isOpen, onClose, position = 'right', children, overlayClassName = '', className = '',
  minWidth = '15vh', maxWidth = '100%', minHeight = '15vh', maxHeight = '100%',
}: DrawerProps) => {

  const shouldRenderChild = useDelayUnmount(isOpen, 400);

  const getPositionAlignmentParent = useMemo(() => {
    switch (position) {
      case 'top': return 'dsr-justify-start dsr-items-start';
      case 'right': return 'dsr-justify-end dsr-items-start';
      case 'bottom': return 'dsr-justify-start dsr-items-end';
      case 'left': return 'dsr-justify-start dsr-items-start';
    }
  }, [position]);

  const getPositionAlignmentChild = useMemo(() => {
    switch (position) {
      case 'top':
        return 'dsr-w-flex-1 dsr-rounded-b-lg';
      case 'right':
        return 'dsr-h-full dsr-rounded-l-lg';
      case 'bottom':
        return 'dsr-flex-1 dsr-rounded-t-lg';
      case 'left':
        return 'dsr-h-full dsr-rounded-r-lg';
    }
  }, [position]);

  const positionDirection = useMemo(() => ({
    'top': '-100%',
    'right': '100%',
    'bottom': '100%',
    'left': '-100%',
  }[position]), [position]);

  const getPositionAnimation = useMemo(() => {
    if (position === 'top' || position === 'bottom') {
      return isOpen ? drawerStyles.animateTranslateOutY : drawerStyles.animateTranslateInY;
    } else {
      return isOpen ? drawerStyles.animateTranslateOutX : drawerStyles.animateTranslateInX;
    }
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
    <DocumentPortal>
      <div className="drawer dsr-relative dsr-z-7000">
        <section
          className={clsx([
            'dsr-fixed dsr-top-0 dsr-left-0 dsr-w-screen dsr-h-screen dsr-flex',
            'dsr-backdrop-filter dsr-backdrop-blur-sm dsr-bg-black dsr-bg-opacity-30',
            getPositionAlignmentParent,
            overlayClassName,
          ])}
          onClick={onClose}
        >
          <div
            className={clsx([
              'dsr-relative dsr-shadow-lg dsr-sm:w-auto dsr-w-full dsr-bg-background dsr-text-color',
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
            <div className="dsr-absolute dsr-top-0 dsr-right-0 dsr-pr-2">
              <button
                type="button"
                title="close"
                className="drawer-close-button dsr-outline-none"
                onClick={onClose}
              >
                <Icon icon="times" size={16} />
              </button>
            </div>
            <div>{children}</div>
          </div>
        </section>
      </div>
    </DocumentPortal>
  ) : <div />;
};

export default Drawer;
