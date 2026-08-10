'use client';
import React, { ReactElement, ReactNode } from 'react';

import * as RadixTooltip from '@radix-ui/react-tooltip';

import mcs from '../utils/merge';

import { AlignOptions, SideOptions } from './Dropdown';

export type TooltipProps = {
  children: ReactElement;
  overlay: ReactNode;
  side?: SideOptions;
  align?: AlignOptions;
  contentClassName?: string;
  /** Whether to show an arrow element alongside the tooltip.  */
  showArrow?: boolean;
};

const Tooltip = ({
  children,
  overlay,
  side = 'auto',
  align = 'center',
  contentClassName,
  showArrow = false,
}: TooltipProps) => (
  <RadixTooltip.Provider>
    <RadixTooltip.Root>
      <RadixTooltip.Trigger>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side != 'auto' ? side : undefined}
          align={align}
          sideOffset={5}
          className={mcs([
            'tooltip-content z-9000 rounded-lg whitespace-nowrap',
            'border',
            'bg-gray-100/95 dark:bg-neutral-800/95',
            'text-color px-2.5 py-1.5 text-sm shadow-md backdrop-blur dark:shadow-lg dark:shadow-black/30',
            contentClassName,
          ])}
        >
          {overlay}
          {showArrow ? (
            <RadixTooltip.Arrow className="fill-gray-100/95 stroke-gray-300 stroke-2 dark:fill-neutral-800/95 dark:stroke-neutral-500" />
          ) : null}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
);

export default Tooltip;
