import React, { ReactNode, useContext, useEffect, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import Color from 'color';

import DSRContext from '../../contexts/DSRContext';

import styles from './dropdown.module.scss';

export type DropdownProps = {
  children: ReactNode,
  buttonRenderer: ReactNode,
  isOpen?: boolean,
  onClose?: () => void,
  id?: string,
  className?: string,
  containerClassName?: string
};

const Dropdown = ({
  children, buttonRenderer, isOpen = false, onClose = () => {},
  containerClassName,
}: DropdownProps) => {

  const { theme, isDarkTheme } = useContext(DSRContext);

  const [open, setOpen] = useState(isOpen);

  useEffect(() => setOpen(isOpen), [isOpen]);
  useEffect(() => onClose, [open]);

  return (
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger asChild className="hover:dsr-outline-none">
              {buttonRenderer}
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
              <DropdownMenu.Content
                  className={clsx([
                    'dsr-w-[240px] dsr-rounded-lg dsr-text-color dsr-shadow-md',
                    styles.animateEntry,
                    containerClassName,
                  ])}
                  style={{ backgroundColor: isDarkTheme ? Color(theme?.background).lighten(0.4).toString() : Color(theme?.background).darken(0.06).toString() }}
                  sideOffset={5}
              >
                  {children}
              </DropdownMenu.Content>
          </DropdownMenu.Portal>
      </DropdownMenu.Root>
  );
};

export default Dropdown;
