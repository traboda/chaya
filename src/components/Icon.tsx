'use client';
import React, { CSSProperties, ReactElement } from 'react';
import { useContext } from 'react';

import DSRContext from '../contexts/DSRContext';

export type Icons = 'chevron-down' | 'chevron-up' | 'chevron-right' | 'chevrons-right' | 'chevrons-left' | 'search' |
'times' | 'home' | 'external-link' | 'info' | 'alert-triangle' | 'check' | string;

export type IconProps = {
  size?: number | string,
  width?: number | string,
  height?: number | string,
  className?: string,
  style?: CSSProperties
};

export type IconInputType = Icons | ((props: IconProps) => ReactElement) | (IconProps & { icon: Icons, });

type IconComponentProps = IconProps & { icon: IconInputType };

const Icon = ({ icon, ...defaultProps }: IconComponentProps) => {
  const { iconWrapper } = useContext(DSRContext);
  let props = { ...defaultProps };
  if (typeof icon === 'object') props = { ...props, ...icon };
  // 1rem = 16px by default
  props.size = typeof props.size === 'number' ? `${props.size / 16}rem` : props.size;

  console.log(icon);

  return typeof icon === 'function' ? icon(props) : (iconWrapper?.(typeof icon === 'object' ? icon.icon : icon, props) ?? <span />);
};

export default Icon;