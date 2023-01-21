import React, { ReactElement } from 'react';
import DSRContext from '../contexts/DSRContext';
import { useContext } from 'react';

export type Icons = 'chevronDown' | 'chevronUp' | 'search' | 'times' | string;
export type IconProps = {
  size?: number,
  width?: number,
  height?: number
};
export type IconInputType = Icons | ((props: IconProps) => ReactElement);

type IconComponentProps = IconProps & { icon: IconInputType };

const Icon = ({ icon, ...props }: IconComponentProps) => {
  const { iconWrapper } = useContext(DSRContext);

  return typeof icon === 'function' ? icon(props) : (iconWrapper?.(icon, props) ?? <span />);
};

export default Icon;