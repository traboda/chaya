import React, { ReactElement, ReactNode, useContext, useMemo } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import Color from 'color';
import clsx from 'clsx';

import DSRContext from '../contexts/DSRContext';

import { AlignOptions, SideOptions } from './Dropdown';

type ToolTipProps = {
  children: ReactElement,
  overlay: ReactNode,
  side?: SideOptions,
  align?: AlignOptions
  contentClassName?: string,
};

const ToolTip = ({ children, overlay, side = 'bottom', align = 'center', contentClassName }: ToolTipProps) => {

  const { isDarkTheme, theme } = useContext(DSRContext);

  const tooltipColor = useMemo(() => {
    const background = Color(theme?.background);
    return isDarkTheme ? background.lighten(1.5).fade(0.6).toString() : background.darken(0.3).fade(0.4).toString();
  }, [theme]);

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            align={align}
            style={{ background: tooltipColor }}
            className={clsx([
              'tooltip-content dsr-z-9000 dsr-whitespace-nowrap dsr-rounded-lg',
              'dsr-border dsr-border-gray-500/70',
              'dsr-px-2.5 dsr-py-1.5 dsr-backdrop-blur dsr-text-color dsr-text-sm',
              contentClassName,
            ])}
            sideOffset={5}
          >
            {overlay}
            <Tooltip.Arrow
              style={{ fill: tooltipColor }}
              className="dsr-stroke-gray-500 dsr-stroke-2"
            />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default ToolTip;
