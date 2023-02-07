import React, { ReactElement, ReactNode, useContext, useMemo } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import Color from 'color';

import DSRContext from '../contexts/DSRContext';

type ToolTipProps = {
  children: ReactElement,
  overlay: ReactNode,
};

const ToolTip = ({ children, overlay }: ToolTipProps) => {

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
                      style={{ background: tooltipColor }}
                      className="tooltip-content dsr-z-9000 dsr-whitespace-nowrap dsr-rounded-lg dsr-px-2.5 dsr-py-1.5 dsr-backdrop-blur dsr-text-color dsr-text-sm"
                      sideOffset={5}
                  >
                      {overlay}
                      <Tooltip.Arrow
                          style={{ fill: tooltipColor }}
                          className="dsr-backdrop-blur"
                      />
                  </Tooltip.Content>
              </Tooltip.Portal>
          </Tooltip.Root>
      </Tooltip.Provider>
  );
};

export default ToolTip;
