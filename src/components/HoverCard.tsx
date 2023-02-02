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

const HoverCard = ({ children, cardRenderer, id, className, minWidth = '250px', maxWidth = '350px' }: HoverCardProps) => {

  const { isDarkTheme, theme } = useContext(DSRContext);

  const hoverCardID = useMemo(() => id && id.length > 1 ? id : `hovercard-${nanoid()}`, [id]);
  
  const cardBackground = useMemo(() => {
    const background = Color(theme?.background);
    return isDarkTheme ? background.lighten(0.8).fade(0.2).toString() : background.lighten(0.4).fade(0.2).toString();
  }, [theme]);

  return (
      <RadixHoverCard.Root openDelay={100} closeDelay={100}>
          <RadixHoverCard.Trigger>
              {children}
          </RadixHoverCard.Trigger>
          <RadixHoverCard.Portal>
              <RadixHoverCard.Content
                  className={clsx([
                    'hover-card-content',
                    'dsr-rounded-lg dsr-shadow-lg dsr-text-color dsr-backdrop-blur-md dsr-transform-gpu',
                    className,
                  ])}
                  style={{
                    background: cardBackground,
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
