'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import mcs from '../../utils/merge';

import { AccordionProps } from './Accordion.types';

const Accordion = ({
  title, children, isOpen: _isOpen, onChange = () => {}, id,
  isDisabled = false, isLocked = false, className = '', titleClassName = '', bodyClassName = '',
}: AccordionProps) => {

  const [isOpen, setOpen] = useState(isDisabled ? false : _isOpen ?? false);

  useEffect(() => { setOpen(_isOpen ?? false); }, [_isOpen]);

  return (
    <div
      id={id}
      className={mcs([
        'accordion p-2 rounded-lg dark:bg-gray-500/20 bg-gray-500/10',
        'border dark:border-neutral-500/70 border-neutral-500/10',
        className,
      ])}
    >
      <button
        className={mcs([
          'accordion-button w-full px-3 py-2 font-semibold flex rounded-lg text-lg',
          'justify-between text-color items-center bg-white/90 dark:bg-black/20 shadow-sm',
          'border dark:border-neutral-500/70 border-neutral-500/10',
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
        {(!isDisabled) ? (
          <div
            className={clsx([
              'transition transform duration-200',
              isOpen ? 'rotate-180' : '',
            ])}
          >
            {isLocked ? <i className="ri-lock-2-line" /> : <i className="ri-arrow-up-s-line" />}
          </div>
        ) : null}
      </button>
      <div
        id={`${id}_content`}
        aria-hidden={!isOpen}
        className={clsx([
          'accordion-content transition-all opacity-0 h-0 text-color px-3',
          isOpen ? mcs(['opacity-100 h-auto py-3', bodyClassName]) : '',
        ])}
      >
        {typeof children === 'function' ? children(isOpen, () => setOpen(false)) : children}
      </div>
    </div>
  );
};

export default Accordion;