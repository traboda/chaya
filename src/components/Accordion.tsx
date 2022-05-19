import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';


const AccordionContainer = styled.div`
  background: ${({ theme }) => theme.isDarkTheme ? 'hsla(0, 0%, 90%, 0.15)' : 'hsla(0, 0%, -20%, 0.05)'};
  width: 100%;
  border-radius: 7px;
  padding: 0.5rem;
  button {
    width: 100%;
    font-weight: 600;
    padding: 0.75rem;
    border-radius: 7px;
    color: ${({ theme }) => theme.secondary};
    background: ${({ theme }) => theme.isDarkTheme ? 'rgba(237, 237, 237, 0.2)' : 'rgba(255, 255, 255, 0.9)' };
  }
  .accordion-body {
    transition: all 200ms ease;
    opacity: 0;
    height: 0;
    color: ${({ theme }) => theme.color};
    &.active {
      opacity: 1;
      height: auto;
    }
  }
`;

type AccordionProps = {
    title: string,
    renderer?: () => React.ReactNode,
    text?: (string|React.ReactNode),
    isOpen?: boolean,
    onChange?: () => void,
    keepExpanded?: boolean
    className?: string,
    titleClassName?: string,
    bodyClassName?: string,
    icons?: {
        opened?: React.ReactElement,
        closed?: React.ReactElement
    }
};

const defaultIcons = {
    opened: <span style={{ transform: 'rotate(-90deg)' }}>⮞</span>,
    closed: <span style={{ transform: 'rotate(90deg)' }}>⮞</span>
};

const Accordion = ({
   title, renderer, text, isOpen: _isOpen, onChange = () => {}, className = '', titleClassName = '', bodyClassName = '', icons: _icons = null,
}: AccordionProps) => {

    const [isOpen, setOpen] = useState(_isOpen ?? false);

    useEffect(() => { setOpen(_isOpen ?? false) }, [_isOpen]);

    const icons = {...defaultIcons, ..._icons};

    return (
        <AccordionContainer className={`accordion ${className}`}>
            <button
                className={`flex text-xl justify-between ${titleClassName}`}
                onClick={() => {
                    setOpen(!isOpen);
                    onChange();
                }}
            >
                {title}
                {isOpen ? icons?.opened : icons?.closed}
            </button>
            <div className={`accordion-body text-lg ${isOpen ? bodyClassName + ' active p-3' : ''}`}>
                {isOpen && renderer ? renderer() : text}
            </div>
        </AccordionContainer>
    );
};

export default Accordion;