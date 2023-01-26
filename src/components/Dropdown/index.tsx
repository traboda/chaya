import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { LinkWrapper } from '../../utils/misc';
import Icon, { IconInputType } from '../Icon';

type DropdownMenuProps = {
  children: React.ReactNode
  items?: {
    title: string,
    iconClassName?: string,
    icon?: IconInputType,
    className?: string,
    onClick?: () => void,
    link?: string,
    renderer?: () => React.ReactNode,
  }[],
  isOpen?: boolean,
  onClose?: () => void,
  align?: ('left' | 'right'),
  id?: string,
  className?: string,
  dropdownButtonClassName?: string,
  dropdownContainerClassName?: string,
  customHeaderRenderer?: () => React.ReactNode
};

const DropdownMenu = ({
  children, items = [], isOpen = false, onClose = () => {}, id, className = '', align = 'left',
  dropdownButtonClassName = '', dropdownContainerClassName, customHeaderRenderer,
} : DropdownMenuProps) => {

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
                'dropdown-button dsr-rounded-md dsr-text-left dsr-bg-none dsr-border-none dsr-transition-all',
                dropdownButtonClassName,
              ])}
              aria-label="Navigation Dropdown"
              data-is-open={open}
              onClick={() => setOpen(!open)}
          >
              {children}
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
                    dropdownContainerClassName,
                  ])}
              >
                  {customHeaderRenderer?.()}
                  <div role="menu">
                      {items.length > 0 && items.map((n, i) => {
                        const content = n?.renderer ? n.renderer() : (
                            <div className="dsr-flex dsr-items-center dsr-text-left dsr-gap-2">
                                {n.icon && <Icon icon={n.icon} size={16} />}
                                {n?.title}
                            </div>
                        );
                        return (
                            <div
                                role="menuitem"
                                key={i}
                                className={clsx([
                                  n?.className,
                                  'dsr-w-full dsr-rounded-md dsr-mr-2 dsr-p-2 hover:dsr-bg-neutral-300 hover:dsr-text-primary',
                                ])}
                            >
                                {n?.link ? LinkWrapper(n.link, content) : <button className="dsr-text-left dsr-w-full dsr-rounded-md" onClick={n?.onClick}>{content}</button>}
                            </div>
                        );
                      })}
                  </div>
              </div>
          </div>
      </div>
  );
};

export default DropdownMenu;