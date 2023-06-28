import React from 'react';
import clsx from 'clsx';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';

import { LinkWrapper } from '../utils/misc';

import Icon, { IconInputType } from './Icon';
import Dropdown, { AlignOptions, SideOptions } from './Dropdown';

export type OptionType = {
  title: string,
  iconClassName?: string,
  icon?: IconInputType,
  className?: string,
  onClick?: () => void,
  link?: string,
  renderer?: () => React.ReactNode,
};

export type GroupType = {
  title?: string,
  icon?: IconInputType,
  options: OptionType[],
};

export type DropdownMenuOptionType = OptionType | GroupType;

export type DropdownMenuProps = {
  children: React.ReactElement
  options?: DropdownMenuOptionType[],
  isOpen?: boolean,
  onClose?: () => void,
  id?: string,
  className?: string,
  containerClassName?: string,
  customHeaderRenderer?: () => React.ReactNode,
  align?: AlignOptions,
  side?: SideOptions
};

const DropdownMenu = ({
  children: buttonRenderer, options, isOpen = false, onClose = () => {}, id, className = '',
  containerClassName, customHeaderRenderer, align = 'center', side = 'bottom',
} : DropdownMenuProps) => {
  const linkClasses = (className?: string) => clsx([
    'dsr-flex dsr-rounded-lg dsr-transition dsr-px-2.5 dsr-py-1.5 dsr-w-full dsr-text-left',
    'hover:dsr-bg-gray-400/20 focus:dsr-bg-gray-400/20 focus:dsr-outline-none',
    className,
  ]);

  const optionRenderer: (o: OptionType, index: number) => React.ReactNode = (o, index) => {
    const content = o?.renderer ? o.renderer() : (
      <div className="dsr-flex dsr-items-center dsr-text-left dsr-gap-2">
        {o.icon && <Icon icon={o.icon} size={16} />}
        {o?.title}
      </div>
    );

    return (
      <RadixDropdownMenu.Item
        asChild
        role="menuitem"
        key={`dropdown-menu-item-${index}-${o?.title}`}
        className="dropdown-menu-item dsr-my-1"
      >
        {o?.link ?
            <div className={linkClasses(o?.className)}>
              {LinkWrapper(o.link, content)}
            </div> : (
          <button className={linkClasses(o?.className)} onClick={o?.onClick}>
            {content}
          </button>
        )}
      </RadixDropdownMenu.Item>
    );
  };

  const groupRenderer: (g: GroupType, index: number) => React.ReactNode = (g, index) => {
    return (
      <RadixDropdownMenu.Group
        key={`dropdown-menu-group-${index}-${g?.title || ''}`}
        className={clsx([
          'dsr-pb-1',
          'dsr-mb-1 dsr-border-b dark:dsr-border-gray-500/70 dsr-border-gray-500/10',
        ])}
      >
        {g?.title && (
          <div className="dsr-opacity-80 dsr-flex dsr-items-center dsr-uppercase dsr-px-1 dsr-text-xs dsr-my-2">
            {g.icon && <Icon className="dsr-inline-block dsr-mr-1" icon={g.icon} size={12} />}
            {g?.title}
          </div>
        )}
        {g?.options.map((o, i) => optionRenderer(o, i))}
      </RadixDropdownMenu.Group>
    );
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      id={id}
      className={className}
      containerClassName={clsx([
        'dsr-rounded-lg dsr-p-1',
        'dsr-border dark:dsr-border-gray-500/70 dsr-border-gray-500/10',
        containerClassName,
      ])}
      buttonRenderer={buttonRenderer}
      align={align}
      side={side}
    >
      {customHeaderRenderer?.()}
      {(options && options.length > 0) && options.map((o, i) =>
        'options' in o ? groupRenderer(o, i) : optionRenderer(o, i),
      )}
    </Dropdown>
  );
};

export default DropdownMenu;