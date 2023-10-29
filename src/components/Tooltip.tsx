'use client';
import React, { ReactElement, ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';

import { AlignOptions, SideOptions } from './Dropdown';

export type TooltipProps = {
  children: ReactElement,
  overlay: ReactNode,
  side?: SideOptions,
  align?: AlignOptions
  contentClassName?: string,
};

const Tooltip = ({ children, overlay, side = 'bottom', align = 'center', contentClassName }: TooltipProps) => (
  <RadixTooltip.Provider>
    <RadixTooltip.Root>
      <RadixTooltip.Trigger>
        {children}
      </RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          align={align}
          className={clsx([
            'tooltip-content dsr-z-9000 dsr-whitespace-nowrap dsr-rounded-lg',
            'dsr-border dsr-border-gray-500/70 dark:dsr-bg-gray-500/20 dsr-bg-gray-500/10',
            'dsr-px-2.5 dsr-py-1.5 dsr-backdrop-blur dsr-text-color dsr-text-sm',
            contentClassName,
          ])}
          sideOffset={5}
        >
          {overlay}
          <RadixTooltip.Arrow
            className="dsr-stroke-gray-500 dsr-stroke-2 dark:dsr-fill-gray-500/20 dsr-fill-gray-500/10"
          />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
);

export default Tooltip;
