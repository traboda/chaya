import React, { ReactElement, ReactNode, useContext, useMemo } from 'react';
import * as RadixHoverCard from '@radix-ui/react-hover-card';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import Color from 'color';

import DSRContext from '../contexts/DSRContext';

type HoverCardProps = {
  id?: string,
  className?: string,
  children: ReactElement,
  cardRenderer: (ReactNode | string),
  minWidth?: string,
  maxWidth?: string,
};

const HoverCard = ({ children, cardRenderer, id, className, minWidth = '250px', maxWidth = '50vw' }: HoverCardProps) => {

  const { isDarkTheme, theme } = useContext(DSRContext);

  const hoverCardID = useMemo(() => id && id.length > 1 ? id : `hovercard-${nanoid()}`, [id]);
  
  const cardBackground = useMemo(() => {
    const background = Color(theme?.background);
    return isDarkTheme ? background.lighten(1.5).toString() : background.darken(0.1).toString();
  }, [theme]);

  return (
      <RadixHoverCard.Root openDelay={100} closeDelay={100}>
          <RadixHoverCard.Trigger>
              {children}
          </RadixHoverCard.Trigger>
          <RadixHoverCard.Portal>
              <RadixHoverCard.Content
                  className={clsx([
                    'HoverCardContent',
                    'dsr-rounded-lg dsr-shadow-lg dsr-text-color',
                    className,
                  ])}
                  style={{
                    background: cardBackground || theme?.background,
                    minWidth,
                    maxWidth,
                  }}
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
