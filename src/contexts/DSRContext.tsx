'use client';

import { createContext, ReactElement } from 'react';

import { Theme } from '../types/theme';
import { IconProps, Icons } from '../components/Icon';

export type LinkWrapper = (link: string, component: ReactElement) => ReactElement;

export type IconWrapperType = (icon: Icons, props?: IconProps) => ReactElement;

export type DSRContextType = {
  theme?: Theme,
  linkWrapper?: LinkWrapper,
  iconWrapper?: IconWrapperType,
  isDarkTheme?: boolean
};

const DSRContext = createContext<DSRContextType>({});

export default DSRContext;
