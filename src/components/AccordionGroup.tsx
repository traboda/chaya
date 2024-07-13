'use client';
import React, { ReactNode, useState } from 'react';
import clsx from 'clsx';

import mcs from '../utils/merge';

import Accordion from './Accordion';

export type AccordionGroupProps = {
  items: {
    title: string | ReactNode,
    text?: string,
    renderer?: (isOpen: boolean, onClose: () => void) => ReactNode,
    isDisabled?: boolean,
    isOpen?: boolean,
    isHidden?: boolean,
    isCompleted?: boolean,
    isLocked?: boolean,
  }[],
  initialIndex?: number,
  activeIndex?: number,
  keepExpanded?: boolean
  id?: string,
  className?: string,
  accordionClassName?: string,
  titleClassName?: string,
  bodyClassName?: string,
  numberItems?: boolean,
};

const AccordionGroup = ({
  items, initialIndex, keepExpanded = false, id, className = '', accordionClassName = '',
  titleClassName = '', bodyClassName = '', numberItems = false, activeIndex,
}: AccordionGroupProps) => {
  const [active, setActive] = useState(initialIndex ?? activeIndex ?? 0);

  return (
    <div id={id} className={className}>
      {items.filter((item) => !item.isHidden).map((item, index) => (
        <Accordion
          id={id ? `${id}_accordion_${index + 1}` : undefined}
          isOpen={!keepExpanded ? active === index : (initialIndex === index || item?.isOpen)}
          key={index}
          className={mcs(['mb-2', accordionClassName])}
          titleClassName={titleClassName}
          bodyClassName={bodyClassName}
          onChange={() => {
            if (!keepExpanded) setActive(active === index ? -1 : index);
          }}
          title={numberItems || item.isCompleted ? (
            <div className="flex items-center gap-2">
              <div
                className={clsx([
                  'p-1 rounded-full h-[36px] w-[36px] border border-neutral-200/50',
                  'flex justify-center text-base items-center',
                  activeIndex === index || item?.isCompleted ? '' : 'border dark:border-neutral-500/80 border-neutral-500/20',
                  activeIndex === index ? 'bg-primary text-primaryTextColor' : item.isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200/80 dark:bg-gray-600/80',
                ])}
              >
                {item.isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 18 18" width="20" fill="currentColor">
                    <path d="M15.656,3.8625l-.7275-.5665a.5.5,0,0,0-.7.0875L7.411,12.1415,4.0875,8.8355a.5.5,0,0,0-.707,0L2.718,9.5a.5.5,0,0,0,0,.707l4.463,4.45a.5.5,0,0,0,.75-.0465L15.7435,4.564A.5.5,0,0,0,15.656,3.8625Z" />
                  </svg>
                ) : `${index + 1}`}
              </div>
              {item.title}
            </div>
          ) : item.title}
          text={item.text}
          isDisabled={item.isDisabled}
          isLocked={item.isLocked}
          children={item.renderer}
        />
      ))}
    </div>
  );
};

export default AccordionGroup;