import React, { ReactElement } from 'react';
import { useContext } from 'react';

import DSRContext from '../contexts/DSRContext';

export type Icons = 'chevronDown' | 'chevronUp' | 'chevronRight' | 'search' | 'times' | 'home' | 'externalLink' | string;
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