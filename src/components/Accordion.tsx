import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import DSRContext from '../contexts/DSRContext';

import Icon from './Icon';

export type AccordionProps = {
  title: string,
  renderer?: () => React.ReactNode,
  text?: (string | React.ReactNode),
  isOpen?: boolean,
  onChange?: () => void,
  keepExpanded?: boolean
  id?: string,
  className?: string,
  titleClassName?: string,
  bodyClassName?: string,
};

const Accordion = ({
  title, renderer, text, isOpen: _isOpen, onChange = () => {}, id = nanoid(),
  className = '', titleClassName = '', bodyClassName = '',
}: AccordionProps) => {

  const [isOpen, setOpen] = useState(_isOpen ?? false);

  useEffect(() => { setOpen(_isOpen ?? false); }, [_isOpen]);

  const { isDarkTheme } = useContext(DSRContext);

  return (
      <div
          id={id}
          className={clsx([
            'accordion dsr-p-3 dsr-rounded-lg',
            isDarkTheme ? 'dsr-bg-white/10' : 'dsr-bg-black/10',
            className,
          ])}
      >
          <button
              className={clsx([
                'accordion-button dsr-w-full dsr-p-3 dsr-font-semibold dsr-flex dsr-rounded-lg dsr-text-xl',
                'dsr-justify-between dsr-text-color',
                titleClassName,
              ])}
              aria-expanded={isOpen}
              aria-controls={`${id}_content`}
              style={{ background: isDarkTheme ? 'rgba(237, 237, 237, 0.2)' : 'rgba(255, 255, 255, 0.9)' }}
              onClick={() => {
                setOpen(!isOpen);
                onChange();
              }}
          >
              {title}
              <Icon icon={isOpen ? 'chevron-up' : 'chevron-down'} size={18} />
          </button>
          <div
              id={`${id}_content`}
              aria-hidden={!isOpen}
              className={clsx([
                'accordion-content dsr-text-lg dsr-transition-all dsr-opacity-0 dsr-h-0 dsr-text-color dsr-px-3',
                isOpen ? clsx([bodyClassName, 'dsr-opacity-100 dsr-h-auto dsr-py-3']) : '',
              ])}
          >
              {isOpen && renderer ? renderer() : text}
          </div>
      </div>
  );
};

export default Accordion;