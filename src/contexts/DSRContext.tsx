import { createContext, ReactElement } from 'react';
import { Theme } from '../types/theme';

export type LinkWrapper = (link: string, component: ReactElement) => ReactElement;

export type IconSet = {
  chevronDown?: ReactElement,
  chevronUp?: ReactElement
};

export type DSRContextType = {
  theme?: Theme,
  linkWrapper?: LinkWrapper,
  iconSet?: IconSet,
  isDarkTheme?: boolean
};

const DSRContext = createContext<DSRContextType>({});

export default DSRContext;
