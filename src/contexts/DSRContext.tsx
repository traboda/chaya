import { createContext, ReactElement } from 'react';
import { Theme } from '../types/theme';

export type LinkWrapper = (link: string, component: ReactElement) => ReactElement;

export type DSRContextType = {
  theme?: Theme,
  linkWrapper?: LinkWrapper,
};

const DSRContext = createContext<DSRContextType>({});

export default DSRContext;
