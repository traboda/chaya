'use client';
import React, { ReactElement, ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';

import mcs from '../utils/merge';

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
          className={mcs([
            'tooltip-content z-9000 whitespace-nowrap rounded-lg',
            'border border-gray-500/70 dark:bg-gray-500/20 bg-gray-500/10',
            'px-2.5 py-1.5 backdrop-blur text-color text-sm',
            contentClassName,
          ])}
          sideOffset={5}
        >
          {overlay}
          <RadixTooltip.Arrow
            className="stroke-gray-500 stroke-2 dark:fill-gray-500/20 fill-gray-500/10"
          />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
);

export default Tooltip;
