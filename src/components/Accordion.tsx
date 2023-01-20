import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import DSRContext from '../contexts/DSRContext';
import { nanoid } from 'nanoid';

type AccordionProps = {
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

  const { iconSet, isDarkTheme } = useContext(DSRContext);

  return (
      <div
          id={id}
          className={clsx([
            'dsr-p-3 dsr-rounded-lg',
            className,
          ])}
          style={{ background: isDarkTheme ? 'hsla(0, 0%, 90%, 0.15)' : 'hsla(0, 0%, 0%, 0.05)' }}
      >
          <button
              className={clsx([
                'dsr-w-full dsr-p-3 dsr-font-semibold dsr-flex dsr-rounded-lg dsr-text-xl',
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
              {isOpen ? iconSet?.chevronUp?.({ width: 18, height: 18 }) : iconSet?.chevronDown?.({ width: 18, height: 18 })}
          </button>

          <div
              id={`${id}_content`}
              aria-hidden={!isOpen}
              className={clsx([
                'dsr-text-lg dsr-transition-all dsr-opacity-0 dsr-h-0 dsr-text-color dsr-px-3',
                isOpen ? clsx([bodyClassName, 'dsr-opacity-100 dsr-h-auto dsr-py-3']) : '',
              ])}
          >
              {isOpen && renderer ? renderer() : text}
          </div>
      </div>
  );
};

export default Accordion;