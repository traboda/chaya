'use client';
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import mcs from '../../utils/merge';

import styles from './dropdown.module.scss';

export type AlignOptions = 'start' | 'center' | 'end';
export type SideOptions = 'top' | 'right' | 'bottom' | 'left';

export type DropdownProps = {
  children: ReactNode,
  buttonRenderer: ReactElement,
  isOpen?: boolean,
  onClose?: () => void,
  id?: string,
  containerClassName?: string,
  align?: AlignOptions,
  side?: SideOptions
};

const Dropdown = ({
  children, buttonRenderer, isOpen = false, onClose = () => {},
  containerClassName, align = 'center', side = 'bottom',
}: DropdownProps) => {

  const [open, setOpen] = useState(isOpen);

  useEffect(() => setOpen(isOpen), [isOpen]);
  useEffect(() => onClose, [open]);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild className="hover:outline-none">
        {buttonRenderer}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={mcs([
            'w-[240px] rounded-lg text-color shadow-md',
            'bg-background-lighten-3 dark:bg-background-darken-1',
            styles.animateEntry,
            containerClassName,
          ])}
          sideOffset={5}
          align={align}
          side={side}
          // style={{
          //   width: 'var(--radix-dropdown-menu-trigger-width)',
          // }}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
