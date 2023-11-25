'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';

import ChevronUp from '../utils/icons/chevron-up';
import Lock from '../utils/icons/lock';

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
            {isLocked ? <Lock /> : <ChevronUp size={24} />}
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