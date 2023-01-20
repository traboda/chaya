import React, { ReactNode, useState } from 'react';
import Accordion from './Accordion';
import clsx from 'clsx';

type AccordionProps = {
  items: {
    title: string,
    text?: string,
    renderer?: () => ReactNode,
    isOpen?: boolean
  }[],
  initialIndex?: number,
  keepExpanded?: boolean
  id?: string,
  className?: string,
  accordionClassName?: string,
  titleClassName?: string,
  bodyClassName?: string,
};

const AccordionGroup = ({
  items, initialIndex, keepExpanded = false, id, className = '', accordionClassName = '',
  titleClassName = '', bodyClassName = '',
}: AccordionProps) => {
  const [active, setActive] = useState(initialIndex ?? 0);

  return (
      <div id={id} className={className}>
          {items.map((item, index) => (
              <Accordion
                  id={id ? `${id}_accordion_${index + 1}` : undefined}
                  isOpen={!keepExpanded ? active === index : (initialIndex === index || item?.isOpen)}
                  key={index}
                  className={clsx(['dsr-mb-2', accordionClassName])}
                  titleClassName={titleClassName}
                  bodyClassName={bodyClassName}
                  onChange={() => {
                    if (!keepExpanded) setActive(active === index ? -1 : index);
                  }}
                  title={item.title}
                  text={item.text}
                  renderer={item.renderer}
              />
          ))}
      </div>
  );
};

export default AccordionGroup;