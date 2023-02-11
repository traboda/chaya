import React from 'react';
import clsx from 'clsx';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';

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
  id?: string,
  className?: string,
  containerClassName?: string,
  customHeaderRenderer?: () => React.ReactNode
};

const DropdownMenu = ({
  children: buttonRenderer, items = [], isOpen = false, onClose = () => {}, id, className = '',
  containerClassName, customHeaderRenderer,
} : DropdownMenuProps) => {
  const linkClasses = (className?: string) => clsx([
    'dsr-flex dsr-rounded-lg hover:dsr-bg-gray-400/20 dsr-transition dsr-px-2.5 dsr-py-1.5 dsr-w-full dsr-text-left',
    className,
  ]);

  return (
      <Dropdown
          isOpen={isOpen}
          onClose={onClose}
          id={id}
          className={className}
          containerClassName={clsx([containerClassName, 'dsr-p-1'])}
          buttonRenderer={buttonRenderer}
      >
          {customHeaderRenderer?.()}
          {items.length > 0 && items.map((n, i) => {
            const content = n?.renderer ? n.renderer() : (
                <div className="dsr-flex dsr-items-center dsr-text-left dsr-gap-2">
                    {n.icon && <Icon icon={n.icon} size={16} />}
                    {n?.title}
                </div>
            );

            return (
                <RadixDropdownMenu.Item
                    role="menuitem"
                    key={i}
                    className="dropdown-menu-item hover:dsr-outline-none"
                >
                    {n?.link ? LinkWrapper(n.link, content, { className: linkClasses(n?.className) }) : (
                        <button className={linkClasses(n?.className)} onClick={n?.onClick}>
                            {content}
                        </button>
                    )}
                </RadixDropdownMenu.Item>
            );
          })}
      </Dropdown>
  );
};

export default DropdownMenu;