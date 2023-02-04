import React from 'react';
import clsx from 'clsx';

import { LinkWrapper } from '../utils/misc';

import Icon, { IconInputType } from './Icon';
import Dropdown from './Dropdown';

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
  buttonClassName?: string,
  containerClassName?: string,
  customHeaderRenderer?: () => React.ReactNode
};

const DropdownMenu = ({
  children: buttonRenderer, items = [], isOpen = false, onClose = () => {}, id, className = '', align = 'left',
  buttonClassName = '', containerClassName, customHeaderRenderer,
} : DropdownMenuProps) => (
    <Dropdown
        isOpen={isOpen}
        onClose={onClose}
        id={id}
        className={className}
        align={align}
        buttonClassName={buttonClassName}
        containerClassName={containerClassName}
        buttonRenderer={buttonRenderer}
    >
        {customHeaderRenderer?.()}
        <div role="menu" className="dropdown-menu-container">
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
                        'dropdown-menu-item dsr-w-full dsr-rounded-md dsr-mr-2 dsr-p-2 hover:dsr-bg-neutral-300 hover:dsr-text-primary',
                      ])}
                  >
                      {n?.link ? LinkWrapper(n.link, content) : <button className="dsr-text-left dsr-w-full dsr-rounded-md" onClick={n?.onClick}>{content}</button>}
                  </div>
              );
            })}
        </div>
    </Dropdown>
);

export default DropdownMenu;