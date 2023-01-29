import React, { ReactNode, useContext, useEffect } from 'react';
import clsx from 'clsx';

import useDelayUnmount from '../../hooks/useDelayUnmount';
import DocumentPortal from '../../utils/Portal';
import Icon, { IconInputType } from '../Icon';
import DSRContext from '../../contexts/DSRContext';

import Button, { ButtonProps } from './../Button';
import modalStyles from './modal.module.scss';

type ModalProps = {
  isOpen: boolean,
  children: ReactNode,
  onClose: () => void,
  title?: string,
  hideBg?: boolean,
  contentClassName?: string,
  maxWidth?: number | string,
  minHeight?: number | string,
  maxHeight?: number | string,
  primaryButton?: ButtonProps,
  secondaryButton?: ButtonProps,
  titleIcon?: IconInputType,
};

const Modal = ({
  isOpen, children, onClose, title, contentClassName = '', titleIcon,
  maxWidth = 720, hideBg = false, minHeight, maxHeight, primaryButton, secondaryButton,
}: ModalProps) => {

  const { isDarkTheme } = useContext(DSRContext);
  const shouldRenderChild = useDelayUnmount(isOpen, 300);

  useEffect(() => {
    if (shouldRenderChild) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'initial';
    return () => { document.body.style.overflow = 'initial'; };
  }, [shouldRenderChild]);

  const onKeyDown = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); };
  }, []);

  return shouldRenderChild ? (
      <DocumentPortal>
          <section
              className={clsx([
                'modal-wrapper dsr-fixed dsr-top-0 dsr-left-0 dsr-w-screen dsr-h-screen dsr-flex dsr-justify-center',
                'dsr-items-end sm:dsr-items-center dsr-backdrop-blur dsr:backdrop-blur-sm',
              ])}
              style={{
                zIndex: 7200,
                background: `rgba(${isDarkTheme ? '0, 0, 0' : '255, 255, 255'}, ${hideBg ? 0.75 : 0.5})`,
              }}
              onClick={onClose}
          >
              <div
                  className={clsx([
                    'modal-container dsr-relative dsr-rounded-t-lg sm:dsr-rounded-b-lg dsr-shadow-lg sm:dsr-w-auto dsr-w-full',
                    'dsr-text-color',
                    isOpen ? modalStyles.animateIn : modalStyles.animateOut,
                    hideBg ? '' : 'dsr-bg-background',
                  ])}
                  onClick={e => e.stopPropagation()}
              >
                  <div className="dsr-absolute dsr-top-0 dsr-right-0 dsr-pr-2 dsr-pt-2">
                      <button
                          type="button"
                          title="close"
                          className="dsr-font-mono dsr-outline-none dsr-font-bold dsr-text-2xl dsr-p-0"
                          onClick={onClose}
                      >
                          <Icon icon="times" size={18} />
                      </button>
                  </div>
                  {title && (
                  <h2 className="dsr-text-2xl dsr-pt-4 dsr-pb-2 dsr-px-4 dsr-font-semibold">
                      {titleIcon ? <Icon icon={titleIcon} /> : null}
                      {title}
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
          </section>
      </DocumentPortal>
  ) : <div />;
};

export default Modal;