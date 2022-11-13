import React from "react";
import styled from "@emotion/styled";
import Color from 'color';
import {useTheme} from "@emotion/react";

import { ButtonProps } from "./type";
import Ripple from "./Ripple";
import { link_wrapper } from "../../utils/misc";

type StyledButton = {
    attributes: {
        color: string,
        background: string,
        hoverBg: string,
        outline: string,
    }
}

const ButtonContainer = styled('span')<StyledButton>`
  a, button {
    background: ${({ attributes }) => attributes?.background};
    color: ${({ attributes }) => attributes?.color};
    border: ${({ attributes }) => attributes?.outline};
    border-radius: 7px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    text-align: center;
    &:disabled {
      opacity: 0.95;
      cursor: not-allowed;
    }
    &:focus, &:hover {
      background: ${({ attributes }) => attributes?.hoverBg};
    }
  }
`;

const Button = ({
    variant = 'solid', color = 'primary', size = 'md',
    children, link, onClick = () => {},
    className = '', style, label, disableRipple = false,
    target, type, rel, disabled, id,
}: ButtonProps) => {

    const theme = useTheme();

    const _color = (() => {
        return (
            color === 'primary' ? theme.primary :
                color === 'secondary' ? theme.secondary :
                    color === 'success' ? '#28a745' :
                        color === 'danger' ? '#dc3545' :
                            color === 'warning' ? '#ffc107' :
                                color === 'contrast' ?  theme.color :
                                    color === 'shade' ?
                                        theme?.isDarkTheme ?
                                            Color(theme.background || '#000').negate().fade(0.85).rgb().string() :
                                            Color(theme.background || '#FFF').darken(0.2).rgb().fade(0.35).string()
                                    : null
        )
    })();

    const _lighterBg = (() => {
        return Color(_color).fade(color === 'shade' ? 0.5 : 0.85).rgb().string();
    })();

    const _lighterHoverBg = (() => {
        return Color(_color).fade(color === 'shade' ? 0.2 : 0.75).rgb().string();
    })();

    const _darkerBg = (() => {
        return theme?.isDarkTheme ? Color(_color).darken(0.25).rgb().string() : Color(_color).darken(0.25).rgb().string() ;
    })();

    const _text_color = (() => {
        return (
            color === 'primary' ? theme.primaryTextColor :
                color === 'secondary' ? theme.secondaryTextColor :
                    color === 'success' ? 'white' :
                        color === 'danger' ? 'white' :
                            color === 'warning' ? 'black' :
                                color === 'contrast' ?  theme.background :
                                    color === 'shade' ?  theme?.isDarkTheme ?
                                        Color(theme.background || '#000').negate().fade(0.1).rgb().string() :
                                        Color(theme.background || '#FFF').darken(0.6).rgb().string()
                                    : null
        )
    })();

    const _className = (() => {
        let classNames = 'font-semibold ';

        if(variant !== link && !(className && className.match(/px-\d+|py-\d+|p-\d+/)))
            classNames += `${size === 'xs' ? 'px-1 py-0' : size === 'sm' ? 'px-2 py-1' : size === 'md' ? 'px-3 py-2' : size === 'lg' ? 'px-4 py-3' : size === 'xl' ? 'px-5 py-4' : ''} `;
        classNames += `text-${size} `;
        if(variant === 'link' && link)
            classNames += `hover:underline `;
        classNames += className;
        return classNames;
    })();

    const renderer = () => (
        <React.Fragment>
            {(!disableRipple && !disabled) && <Ripple/>}
            {children}
        </React.Fragment>
    )

    const buttonRenderer = () => (
        <button
            id={id}
            aria-label={label}
            type={type}
            onClick={e => {
                e.stopPropagation();
                onClick(e);
            }}
            disabled={disabled}
            aria-disabled={disabled}
            className={_className}
            style={style}
        >
            {(!disableRipple && !disabled) && <Ripple/>}
            {children}
        </button>
    );

    return (
        <ButtonContainer
            attributes={{
                color: variant ==='solid' || color === 'shade' ? _text_color : _color,
                background: variant === 'link' || variant === 'outline' ? 'transparent' : variant === 'solid' ? _color : _lighterBg,
                outline: (variant === 'outline' || variant === 'minimal') ? `1px solid` : 'none',
                hoverBg: variant === 'link' ? null : variant === 'solid' ? _darkerBg : _lighterHoverBg
            }}
        >
            {link ? link_wrapper(link, renderer(), { target, rel, id, className: _className, style, label }) : buttonRenderer()}
        </ButtonContainer>
    );

}

export { ButtonProps as ButtonProps };
export default Button;