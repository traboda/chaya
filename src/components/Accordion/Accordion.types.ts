import React from 'react';

export type AccordionProps = {
  title: string | React.ReactNode,
  children: (isOpen: boolean, onClose: () => void) => React.ReactNode,
  isOpen?: boolean,
  onChange?: () => void,
  id?: string,
  className?: string,
  titleClassName?: string,
  bodyClassName?: string,
  isDisabled?: boolean,
  isLocked?: boolean,
};