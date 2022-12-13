import React, {useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';
import { link_wrapper } from "../utils/misc";


type DropdownMenuProps = {
    children: React.ReactNode
    items?: {
        title: string,
        iconClassName?: string,
        icon?: () => React.ReactNode,
        className?: string,
        onClick?: () => void,
        link?: string,
        renderer?: () => React.ReactNode,
    }[],
    isOpen?: boolean,
    onClose?: () => void,
    align?: ('left'|'right'),
    id?: string,
    className?: string,
    dropdownButtonClassName?: string,
    dropdownContainerClassName?: string,
    customHeaderRenderer?: () => React.ReactNode
}

const DropDownMenu = styled('div')`
  margin-top: 0.5rem;
  position: absolute;
  width: 200px;
  max-width: 100vh;
  padding: 0.25rem;
  border-radius: 7px;
  background: ${({ theme }) => theme?.background};
  color: ${({ theme }) => theme?.color};
  z-index: 9000;
  overflow: hidden;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;

  a, button {
    display: block;
    padding: 0.5rem;
    color: ${({theme}) => theme.color};
    text-decoration: none !important;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    border-radius: 7px;
    transition: 200ms ease;

    i {
      font-size: 20px;
      margin-right: 1rem;
      opacity: 0.8;
    }

    &:hover, &:focus {
      color: ${({theme}) => theme.secondary};
      outline: none;
      background: hsla(0, 0%, 55%, .2);
    }
  }
`;

const DropdownMenu = ({
  children, items = [], isOpen: _isOpen = false, onClose: _onClose = () => {}, id, className = '', align = 'left',
  dropdownButtonClassName = '', dropdownContainerClassName, customHeaderRenderer = null,
} : DropdownMenuProps) => {

    const [isOpen, setOpen] = useState(_isOpen);
    const buttonRef = useRef();

    useEffect(() => setOpen(_isOpen), [_isOpen]);
    useEffect(() => _onClose(), [isOpen]);

    return (
        <div id={id} className={`dropdown relative ${className}`}>
            <button
                ref={buttonRef}
                className={`dropdown-button ${dropdownButtonClassName}`}
                aria-label="Navigation Dropdown"
                data-is-open={isOpen}
                onClick={() => setOpen(!isOpen)}
            >
                {children}
            </button>
            {isOpen && (
                <DropDownMenu
                    role="navigation"
                    className={`dropdown-container rounded-lg ${align == 'left' ? 'left-0' : 'right-0'} ${dropdownContainerClassName}`}
                    style={{
                        // @ts-ignore
                        top:  buttonRef?.current ? buttonRef?.current?.getBoundingClientRect().height + 2.5 : '45px',
                    }}
                >
                    {customHeaderRenderer ? customHeaderRenderer() : null}
                    <div role="menu" onMouseLeave={() => setOpen(false)}>
                        {items.length > 0 && items.map((n,i) => {
                            const content = n?.renderer ? n.renderer() : (
                                <div>
                                    {n?.iconClassName && <i className={`${n.iconClassName} mr-2`} />}
                                    {typeof n?.icon == "function" && <div className="inline-block mr-2">{n.icon()}</div>}
                                    {n?.title}
                                </div>
                            );
                            return (
                                <div role="menuitem" key={i} className={n?.className}>
                                    {n?.link ? link_wrapper(n.link, <>{content}</>) : <button onClick={n?.onClick}>{content}</button>}
                                </div>
                            );
                        })}
                    </div>
                </DropDownMenu>
            )}
        </div>
    )


};

export default DropdownMenu;