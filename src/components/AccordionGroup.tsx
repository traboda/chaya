import React, { useState } from 'react';
import Accordion from "./Accordion";

type AccordionProps = {
    items: {
        title: string,
        text?: string,
        renderer?: () => {},
        isOpen?: boolean
    }[],
    initialIndex?: number,
    keepExpanded?: boolean
    className?: string,
    accordionClassName?: string,
    titleClassName?: string,
    bodyClassName?: string,
};

const AccordionGroup = ({
   items, initialIndex, keepExpanded = false, className = '', accordionClassName = '', titleClassName = '', bodyClassName = ''
}: AccordionProps) => {
    const [active, setActive] = useState(initialIndex ?? 0);

    return (
        <div className={className}>
            {items.map((item, index) => (
                <Accordion
                    isOpen={!keepExpanded ? active === index : (initialIndex === index || item?.isOpen)}
                    key={index}
                    className={`mb-2 ${accordionClassName}`}
                    titleClassName={titleClassName}
                    bodyClassName={bodyClassName}
                    onChange={() => {
                        if(!keepExpanded){
                            setActive(active === index ? -1 : index)
                        }
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