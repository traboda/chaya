import { createContext, ReactElement, ReactNode } from 'react';
import { Theme } from '../types/theme';

export type LinkWrapper = (link: string, component: ReactElement) => ReactElement;

export type Icon = (size?: { width?: number, height?: number }) => ReactNode;
export type IconSet = {
  chevronDown?: Icon,
  chevronUp?: Icon,
  search?: Icon,
  times?: Icon,
};

export type DSRContextType = {
  theme?: Theme,
  linkWrapper?: LinkWrapper,
  iconSet?: IconSet,
  isDarkTheme?: boolean
};

const DSRContext = createContext<DSRContextType>({});

export default DSRContext;
