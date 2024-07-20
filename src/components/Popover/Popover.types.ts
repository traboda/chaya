import { ReactNode } from 'react';

export type AlignOptions = 'start' | 'center' | 'end';
export type SideOptions = 'auto' | 'top' | 'right' | 'bottom' | 'left';

export type PopoverProps = {
  children: ReactNode,
  cardRenderer: ReactNode,
  id?: string,
  className?: string,
  isOpen?: boolean,
  defaultOpen?: boolean,
  duration?: number,
  openDelay?: number,
  closeDelay?: number,
  role?: string,
  side?: SideOptions,
  sideOffset?: number,
  align?: AlignOptions,
  alignOffset?: number,
  fillTriggerWidth?: boolean
};