import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

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

  return (
      <div
          id={id}
          className={clsx([
            'accordion dsr-p-3 dsr-rounded-lg dark:dsr-bg-gray-500/20 dsr-bg-gray-500/10',
            className,
          ])}
      >
          <button
              className={clsx([
                'accordion-button dsr-w-full dsr-p-3 dsr-font-semibold dsr-flex dsr-rounded-lg dsr-text-xl',
                'dsr-justify-between dsr-text-color dsr-items-center dsr-bg-white/90 dark:dsr-bg-gray-200/20',
                titleClassName,
              ])}
              aria-expanded={isOpen}
              aria-controls={`${id}_content`}
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