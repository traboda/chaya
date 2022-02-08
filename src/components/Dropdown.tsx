import React from 'react';
import styled from '@emotion/styled';
import { defaultLinkWrapper } from "../utils/misc";

type DropdownMenuProps = {
    items?: {
        title: string,
        iconClassName?: string,
        className?: string,
        onClick?: () => void,
        link?: string,
        renderer?: () => React.ReactNode,
    }[]
    isOpen?: boolean,
    onClose?: () => void,
    className?: string,
    linkWrapper: (link: string, component: React.ReactNode) => React.ReactNode,
}

const DropDownMenu = styled('div')`
  margin-top: 0.5rem;
  border-radius: 7px;
  padding: 5px;
  background: #f6f6f6;

  a, button {
    display: block;
    padding: 0.5rem 1rem;
    color: ${({theme}) => theme.color};
    font-family: 'Rajdhani', sans-serif;
    font-size: calc(1.35rem + 0.25vw);
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

const DropdownMenu = ({ className, items = [], isOpen, onClose, showOnHover, linkWrapper = defaultLinkWrapper }:DropdownMenuProps) => isOpen ? (
    <DropDownMenu role="navigation" className={className}>
        <div role="menu" onMouseLeave={() => showOnHover && onClose()}>
            { items.length>0 && items.map((n,i) => {
                const content = (
                    <div>
                        {n?.iconClassName && <i className={n.iconClassName} />}
                        {n?.title}
                    </div>
                );
                return (
                    <div role="menuitem" key={i} className={n?.className}>
                        { n?.link ?
                            linkWrapper(n.link,content) :
                                n?.renderer ?
                                    <button>{n.renderer()}</button> :
                                        <button onClick={n?.onClick}>{content}</button>
                        }
                    </div>
                );
            })}
        </div>
    </DropDownMenu>) : <div />;

export default DropdownMenu;