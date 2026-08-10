'use client';
import React, { useId, useState } from 'react';

import * as RadixHoverCard from '@radix-ui/react-hover-card';
import clsx from 'clsx';

import { PopoverProps } from './Popover.types';

const Popover = ({
  children,
  cardRenderer,
  id,
  className,
  isOpen,
  defaultOpen = false,
  duration = 100,
  openDelay,
  closeDelay,
  role = '',
  side = 'auto',
  sideOffset = 5,
  align = 'center',
  alignOffset = 5,
  fillTriggerWidth = false,
}: PopoverProps) => {
  const [open, setOpen] = useState(defaultOpen);

  const reactId = useId();
  const popoverCardID = id && id.length > 1 ? id : `popover-${reactId}`;

  const isPopoverOpen = typeof isOpen === 'boolean' ? isOpen : open;

  return (
    <RadixHoverCard.Root
      open={isPopoverOpen}
      defaultOpen={defaultOpen}
      openDelay={openDelay ? openDelay : duration}
      closeDelay={closeDelay ? closeDelay : duration}
      onOpenChange={setOpen}
    >
      <RadixHoverCard.Trigger role="button" aria-expanded={isPopoverOpen} aria-haspopup="true">
        {children}
      </RadixHoverCard.Trigger>
      <RadixHoverCard.Portal>
        <RadixHoverCard.Content
          id={popoverCardID}
          role={role}
          align={align}
          alignOffset={alignOffset}
          side={side !== 'auto' ? side : undefined}
          sideOffset={sideOffset}
          className={clsx([
            'hover-card-content',
            'border',
            'text-color transform-gpu rounded-lg shadow-lg backdrop-blur-md dark:shadow-xl dark:shadow-black/30',
            'bg-background-darken-1/80 dark:bg-background-lighten-1',
            className,
          ])}
          style={{
            width: fillTriggerWidth ? 'var(--radix-dropdown-menu-trigger-width)' : undefined,
          }}
        >
          {cardRenderer}
        </RadixHoverCard.Content>
      </RadixHoverCard.Portal>
    </RadixHoverCard.Root>
  );
};

export default Popover;
