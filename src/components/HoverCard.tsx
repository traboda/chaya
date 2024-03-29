'use client';
import React, { ReactNode, useMemo } from 'react';
import * as RadixHoverCard from '@radix-ui/react-hover-card';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

type HoverCardProps = {
  id?: string,
  className?: string,
  children: ReactNode,
  cardRenderer: ReactNode,
  minWidth?: string | number,
  maxWidth?: string | number,
};

const HoverCard = ({ children, cardRenderer, id, className, minWidth = 250, maxWidth = 350 }: HoverCardProps) => {

  const hoverCardID = useMemo(() => id && id.length > 1 ? id : `hovercard-${nanoid()}`, [id]);

  return (
    <RadixHoverCard.Root openDelay={100} closeDelay={100}>
      <RadixHoverCard.Trigger>
        {children}
      </RadixHoverCard.Trigger>
      <RadixHoverCard.Portal>
        <RadixHoverCard.Content
          className={clsx([
            'hover-card-content',
            'border dark:border-gray-500/70 border-gray-500/10',
            'rounded-lg shadow-lg text-color backdrop-blur-md transform-gpu',
            'dark:bg-background-lighten-1 bg-background-darken-1 bg-opacity-80',
            className,
          ])}
          style={{ minWidth, maxWidth }}
          sideOffset={5}
          id={hoverCardID}
        >
          {cardRenderer}
        </RadixHoverCard.Content>
      </RadixHoverCard.Portal>
    </RadixHoverCard.Root>
  );
};

export default HoverCard;
