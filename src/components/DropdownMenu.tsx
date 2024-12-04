'use client';
import React from 'react';
import clsx from 'clsx';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';

import { LinkWrapper } from '../utils/misc';
import mcs from '../utils/merge';

import Icon, { IconInputType } from './Icon';
import Dropdown, { AlignOptions, SideOptions } from './Dropdown';

export type OptionType = {
  isHidden?: boolean,
  title: string,
  iconClassName?: string,
  icon?: IconInputType,
  className?: string,
  onClick?: () => void,
  link?: string,
  renderer?: () => React.ReactNode,
};

export type GroupType = {
  isHidden?: boolean,
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
  containerClassName?: string,
  customHeaderRenderer?: () => React.ReactNode,
  customFooterRenderer?: () => React.ReactNode,
  align?: AlignOptions,
  side?: SideOptions
};

const DropdownMenu = ({
  children: buttonRenderer, options, isOpen = false, onClose = () => {}, id,
  containerClassName, customHeaderRenderer, customFooterRenderer, align = 'center', side = 'bottom',
} : DropdownMenuProps) => {

  const linkClasses = (className?: string) => mcs([
    'flex rounded-lg transition px-2.5 py-1.5 w-full text-left',
    'hover:bg-gray-400/20 focus:bg-gray-400/20 focus:outline-none',
    className,
  ]);

  const optionRenderer: (o: OptionType) => React.ReactNode = (o) => {
    const content = o?.renderer ? o.renderer() : (
      <div className="flex items-center text-left text-sm gap-2">
        {o.icon && <Icon icon={o.icon} size={14} />}
        {o?.title}
      </div>
    );

    return o?.link?.length ? LinkWrapper(o.link,
      <RadixDropdownMenu.Item
        role="menuitem"
        tabIndex={-1}
        className={mcs(['dropdown-menu-item cursor-pointer', linkClasses(o?.className)])}
      >
        {content}
      </RadixDropdownMenu.Item>, { className: 'w-full' }) : (
        <RadixDropdownMenu.Item
          role="menuitem"
          className={mcs([
            'dropdown-menu-item', 'cursor-pointer',
            linkClasses(o?.className),
          ])}
          onClick={o?.onClick}
        >
          {content}
        </RadixDropdownMenu.Item>
    );
  };

  const groupRenderer: (g: GroupType) => React.ReactNode = (g) => (
    <RadixDropdownMenu.Group
      className={clsx([
        'pb-1',
        'border-b dark:border-gray-500/70 border-gray-500/10',
      ])}
    >
      {g?.title && (
      <div className="opacity-80 flex items-center uppercase px-1 text-xs my-2">
        {g.icon && <Icon className="inline-block mr-1" icon={g.icon} size={12} />}
        {g?.title}
      </div>
      )}
      {g?.options.filter((o) => !o.isHidden).map((o, i) => (
        <React.Fragment key={`dropdown_option_${g.title ?? ''}_${o?.title ?? ''}_${i}`}>
          {optionRenderer(o)}
        </React.Fragment>
      ))}
    </RadixDropdownMenu.Group>
  );

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      id={id}
      containerClassName={mcs([
        'rounded-lg p-1 flex flex-col gap-1 background z-[5000]',
        'border dark:border-gray-500/70 border-gray-500/10',
        containerClassName,
      ])}
      buttonRenderer={buttonRenderer}
      align={align}
      side={side}
    >
      {customHeaderRenderer?.()}
      {(options && options.length > 0) && options.filter((o) => !o.isHidden).map((o, i) => (
        <React.Fragment key={`dropdown-menu-${'options' in o ? 'group' : 'item'}-${i}-${o?.title || ''}`}>
          {'options' in o ? groupRenderer(o) : optionRenderer(o)}
        </React.Fragment>
      ))}
      {customFooterRenderer?.()}
    </Dropdown>
  );
};

export default DropdownMenu;