'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import Icon from './Icon';

export type AccordionProps = {
  title: string | React.ReactNode,
  renderer?: () => React.ReactNode,
  text?: (string | React.ReactNode),
  isOpen?: boolean,
  onChange?: () => void,
  id?: string,
  className?: string,
  titleClassName?: string,
  bodyClassName?: string,
  isDisabled?: boolean,
  isLocked?: boolean,
};

const Accordion = ({
  title, renderer, text, isOpen: _isOpen, onChange = () => {}, id = nanoid(),
  className = '', titleClassName = '', bodyClassName = '', isDisabled = false, isLocked = false,
}: AccordionProps) => {

  const [isOpen, setOpen] = useState(isDisabled ? false : _isOpen ?? false);

  useEffect(() => { setOpen(_isOpen ?? false); }, [_isOpen]);

  return (
    <div
      id={id}
      className={clsx([
        'accordion dsr-p-2 dsr-rounded-lg dark:dsr-bg-gray-500/20 dsr-bg-gray-500/10',
        'dsr-border dark:dsr-border-neutral-500/70 dsr-border-neutral-500/10',
        className,
      ])}
    >
      <button
        className={clsx([
          'accordion-button dsr-w-full dsr-px-3 dsr-py-2 dsr-font-semibold dsr-flex dsr-rounded-lg dsr-text-lg',
          'dsr-justify-between dsr-text-color dsr-items-center dsr-bg-white/90 dark:dsr-bg-black/20 dsr-shadow-sm',
          'dsr-border dark:dsr-border-neutral-500/70 dsr-border-neutral-500/10',
          (isDisabled || isLocked) && 'dsr-cursor-not-allowed',
          titleClassName,
        ])}
        aria-expanded={isOpen}
        aria-controls={`${id}_content`}
        aria-disabled={isDisabled || isLocked}
        onClick={() => {
          if (isDisabled || isLocked) return;
          setOpen(!isOpen);
          onChange();
        }}
      >
        {title}
        {(!isDisabled) ? (
          <div
            className={clsx([
              'dsr-transition dsr-transform dsr-duration-200',
              isOpen ? 'dsr-rotate-180' : '',
            ])}
          >
            {isLocked ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 18 18" width="20" fill="currentColor">
                <path d="M14.5,8H14V7A5,5,0,0,0,4,7V8H3.5a.5.5,0,0,0-.5.5v8a.5.5,0,0,0,.5.5h11a.5.5,0,0,0,.5-.5v-8A.5.5,0,0,0,14.5,8ZM6,7a3,3,0,0,1,6,0V8H6Zm4,6.111V14.5a.5.5,0,0,1-.5.5h-1a.5.5,0,0,1-.5-.5V13.111a1.5,1.5,0,1,1,2,0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 18 18" width="24" fill="currentColor">
                <path d="M14,10.99a1,1,0,0,1-1.7055.7055l-3.289-3.286-3.289,3.286a1,1,0,0,1-1.437-1.3865l.0245-.0245L8.3,6.2925a1,1,0,0,1,1.4125,0L13.707,10.284A.9945.9945,0,0,1,14,10.99Z" />
              </svg>
            )}
          </div>
        ) : null}
      </button>
      <div
        id={`${id}_content`}
        aria-hidden={!isOpen}
        className={clsx([
          'accordion-content dsr-transition-all dsr-opacity-0 dsr-h-0 dsr-text-color dsr-px-3',
          isOpen ? clsx([bodyClassName, 'dsr-opacity-100 dsr-h-auto dsr-py-3']) : '',
        ])}
      >
        {isOpen && renderer ? renderer() : text}
      </div>
    </div>
  );
};

export default Accordion;