import React, { ReactElement } from 'react';
import { useContext } from 'react';

import DSRContext from '../contexts/DSRContext';

export type Icons = 'chevron-down' | 'chevron-up' | 'chevron-right' | 'chevrons-right' | 'chevrons-left' | 'search' |
'times' | 'home' | 'external-link' | 'info' | 'alert-triangle' | 'check' | string;
export type IconProps = {
  size?: number | string,
  width?: number | string,
  height?: number | string
};
export type IconInputType = Icons | ((props: IconProps) => ReactElement);

type IconComponentProps = IconProps & { icon: IconInputType };

const Icon = ({ icon, ...props }: IconComponentProps) => {
  const { iconWrapper } = useContext(DSRContext);
  // 1rem = 16px by default
  props.size = typeof props.size === 'number' ? `${props.size / 16}rem` : props.size;

  return typeof icon === 'function' ? icon(props) : (iconWrapper?.(icon, props) ?? <span />);
};

export default Icon;