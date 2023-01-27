import React, { ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';

export type DropdownProps = {
  isOpen?: boolean,
  onClose?: () => void,
  align?: 'left' | 'right',
  id?: string,
  className?: string,
  buttonClassName?: string,
  containerClassName?: string,
  children: ReactNode,
  buttonRenderer: ReactNode
};

const Dropdown = ({
  isOpen, onClose = () => {}, align = 'left', id, className, containerClassName,
  buttonClassName, children, buttonRenderer,
}: DropdownProps) => {

  const [open, setOpen] = useState(isOpen);

  useEffect(() => setOpen(isOpen), [isOpen]);
  useEffect(() => onClose, [isOpen]);

  return (
      <div
          id={id}
          onMouseLeave={() => setOpen(false)}
          className={clsx([
            'dropdown dsr-relative',
            className,
          ])}
      >
          <button
              className={clsx([
                'dropdown-button dsr-rounded-lg dsr-text-left dsr-bg-none dsr-border-none',
                buttonClassName,
              ])}
              aria-label="Navigation Dropdown"
              onClick={() => setOpen(!open)}
          >
              {buttonRenderer}
          </button>
          <div
              className={clsx([
                align == 'left' ? 'dsr-left-0 dsr-origin-top-left' : 'dsr-right-0 dsr-origin-top-right',
                'dsr-absolute dsr-pt-2 dsr-top-full dsr-transform dsr-transition-all dsr-ease-in-out dsr-duration-100',
                open ? 'dsr-opacity-100 dsr-pointer-events-auto dsr-scale-100' : 'dsr-opacity-0 dsr-pointer-events-none dsr-scale-75',
              ])}
          >
              <div
                  role="navigation"
                  className={clsx([
                    'dropdown-container dsr-p-1 dsr-rounded-lg overflow-hidden dsr-block dsr-p-0.5 dsr-text-left dsr-bg-none dsr-border-none',
                    'dsr-shadow dsr-bg-background bg-text-color dsr-w-[240px]',
                    containerClassName,
                  ])}
              >
                  {children}
              </div>
          </div>
      </div>
  );
};

export default Dropdown;
