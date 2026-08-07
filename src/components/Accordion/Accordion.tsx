'use client';
import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import mcs from '../../utils/merge';

import { AccordionProps } from './Accordion.types';

const Accordion = ({
  title,
  children,
  isOpen: _isOpen,
  onChange = () => {},
  id,
  isDisabled = false,
  isLocked = false,
  className = '',
  titleClassName = '',
  bodyClassName = '',
}: AccordionProps) => {
  const [isOpen, setOpen] = useState(isDisabled ? false : (_isOpen ?? false));

  useEffect(() => {
    setOpen(_isOpen ?? false);
  }, [_isOpen]);

  return (
    <div
      id={id}
      className={mcs([
        'accordion bg-gray-500/8 rounded-lg p-2 dark:bg-gray-500/15',
        'border border-neutral-300 dark:border-neutral-600/70',
        className,
      ])}
    >
      <button
        className={mcs([
          'accordion-button flex w-full rounded-lg px-3 py-2 text-lg font-semibold',
          'items-center justify-between bg-white/90 text-color shadow-sm dark:bg-white/5',
          'border border-neutral-300 dark:border-neutral-600/70',
          titleClassName,
          (isDisabled || isLocked) && 'cursor-not-allowed',
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
        {!isDisabled ? (
          <div className={clsx(['transform transition duration-200', isOpen ? 'rotate-180' : ''])}>
            {isLocked ? <i className="ri-lock-2-line" /> : <i className="ri-arrow-up-s-line" />}
          </div>
        ) : null}
      </button>
      <div
        id={`${id}_content`}
        aria-hidden={!isOpen}
        className={clsx([
          'accordion-content h-0 px-3 text-color opacity-0 transition-all',
          isOpen ? mcs(['h-auto py-3 opacity-100', bodyClassName]) : '',
        ])}
      >
        {typeof children === 'function' ? children(isOpen, () => setOpen(false)) : children}
      </div>
    </div>
  );
};

export default Accordion;
