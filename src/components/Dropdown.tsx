import React, { useContext, useEffect, useRef, useState } from 'react';
import { LinkWrapper } from '../utils/misc';
import clsx from 'clsx';
import DSRContext from '../contexts/DSRContext';

type DropdownMenuProps = {
  children: React.ReactNode
  items?: {
    title: string,
    iconClassName?: string,
    icon?: () => React.ReactNode,
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
  children, items = [], isOpen = false, onClose = () => {}, id, className = '', align = 'right',
  dropdownButtonClassName = '', dropdownContainerClassName, customHeaderRenderer,
} : DropdownMenuProps) => {

  const { theme } = useContext(DSRContext);
  const [open, setOpen] = useState(isOpen);
  const buttonRef = useRef(null);

  useEffect(() => setOpen(isOpen), [isOpen]);
  useEffect(() => onClose, [isOpen]);

  return (
      <div
          id={id}
          className={clsx([
            'dropdown dsr-relative',
            className,
          ])}
      >
          <button
              ref={buttonRef}
              className={clsx([
                'dropdown-button dsr-rounded-md p-[0.5rem] text-left bg-none border-none',
                dropdownButtonClassName,
              ])}
              aria-label="Navigation Dropdown"
              data-is-open={open}
              onClick={() => setOpen(!open)}
              style={{
                transition: '200ms ease',
              }}
          >
              {children}
          </button>
          {open && (
              <div
                  role="navigation"
                  className={clsx([
                    'dropdown-container dsr-mt-[0.5rem] dsr-rounded-lg overflow-hidden dsr-block dsr-p-0.5 dsr-text-left dsr-bg-none dsr-border-none',
                    align == 'left' ? 'dsr-left-0' : 'dsr-right-0',
                    dropdownContainerClassName,
                  ])}
                  style={{
                    boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important',
                    padding: '0.25rem',
                    maxWidth: '100vh',
                    width: '200px',
                    position: 'absolute',
                    backgroundColor: theme?.background,
                    color: theme?.color,
                    // @ts-ignore
                    top:  buttonRef?.current ? buttonRef?.current?.getBoundingClientRect().height + 2.5 : '45px',
                  }}
              >
                  {customHeaderRenderer ? customHeaderRenderer() : null}
                  <div role="menu" onMouseLeave={() => setOpen(false)}>
                      {items.length > 0 && items.map((n, i) => {
                        const content = n?.renderer ? n.renderer() : (
                            <div
                                className="dsr-flex dsr-items-center dsr-text-left "
                            >
                                {n?.iconClassName && <i className={`${n.iconClassName} dsr-mr-2`} />}
                                {typeof n?.icon == 'function' && <div className="dsr-inline-block">{n.icon()}</div>}
                                {n?.title}
                            </div>
                        );
                        return (
                            <div
                                role="menuitem"
                                key={i}
                                className={clsx([
                                  n?.className,
                                  'dsr-w-full dsr-rounded-md dsr-mr-2 dsr-p-[0.5rem] hover:dsr-bg-neutral-300 hover:dsr-text-primary',
                                ])}
                            >
                                {n?.link ? LinkWrapper(n.link, content) : <button className="dsr-text-left dsr-w-full dsr-rounded-md" onClick={n?.onClick}>{content}</button>}
                            </div>
                        );
                      })}
                  </div>
              </div>
          )}
      </div>
  );
};

export default DropdownMenu;