'use client';
import React, { useMemo, useState } from 'react';
import * as RadixHoverCard from '@radix-ui/react-hover-card';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import { PopoverProps } from './Popover.types';

const Popover = ({
  children, cardRenderer, id, className,
  isOpen, defaultOpen = false, duration = 100, openDelay, closeDelay,
  role = '', side = 'auto', sideOffset = 5,
  align = 'center', alignOffset = 5, fillTriggerWidth = false,
}: PopoverProps) => {

  const [open, setOpen] = useState(defaultOpen);

  const popoverCardID = useMemo(() => id && id.length > 1 ? id : `popover-${nanoid()}`, [id]);

  const isPopoverOpen = typeof isOpen === 'boolean' ? isOpen : open;

  return (
    <RadixHoverCard.Root
      open={isPopoverOpen}
      defaultOpen={defaultOpen}
      openDelay={openDelay ? openDelay : duration}
      closeDelay={closeDelay ? closeDelay : duration}
      onOpenChange={setOpen}
    >
      <RadixHoverCard.Trigger
        role="button"
        aria-expanded={isPopoverOpen}
        aria-haspopup="true"

      >
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
            'border dark:border-gray-500/70 border-gray-500/10',
            'rounded-lg shadow-lg text-color backdrop-blur-md transform-gpu',
            'dark:bg-background-lighten-1 bg-background-darken-1 bg-opacity-80',
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
