import React from "react";
import styled from "@emotion/styled";
import Color from 'color';
import {useTheme} from "@emotion/react";

import { ButtonProps } from "./type";
import Ripple from "./Ripple";
import {defaultLinkWrapper} from "../../utils/misc";

type StyledButton = {
    attributes: {
        color: string,
        background: string,
        hoverBg: string,
        outline: string,
    }
}

const StyledButton = styled('button')<StyledButton>`
  background: ${({ attributes }) => attributes?.background};
  color: ${({ attributes }) => attributes?.color};
  border: ${({ attributes }) => attributes?.outline};
  border-radius: 7px;
  position: relative;
  &:disabled {
    opacity: 0.95;
    cursor: not-allowed;
  }
  &:focus, &:hover {
    background: ${({ attributes }) => attributes?.hoverBg};
  }
`;

const Button = ({
    variant = 'solid', color = 'primary', size = 'md',
    children, link, onClick = () => {}, linkWrapper = defaultLinkWrapper,
    className, style, label, disableRipple = false,
    target, type, rel, disabled,
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
                                            Color(theme.background || '#000').lighten(0.2).fade(0.3).rgb().string() :
                                            Color(theme.background || '#FFF').darken(0.15).rgb().fade(0.3).string()
                                    : null
        )
    })();

    const _lightBg = (() => {
        return theme?.isDarkTheme ? Color(_color).fade(0.8).darken(0.15).rgb().string() : Color(_color).fade(0.8).rgb().string() ;
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
                                        Color(theme.background || '#000').lighten(0.3).rgb().string() :
                                        Color(theme.background || '#FFF').darken(0.25).rgb().string()
                                    : null
        )
    })();

    const _className = (() => {
        let classNames = '';
        if(variant !== link)
            classNames += `${size === 'xs' ? 'px-1 py-0' : size === 'sm' ? 'px-2 py-1' : size === 'md' ? 'px-3 py-2' : size === 'lg' ? 'px-4 py-3' : size === 'xl' ? 'px-5 py-4' : ''} `;
        classNames += `text-${size} `;
        if(variant === 'link')
            classNames += `hover:underline `;
        classNames += className;
        return classNames;
    })();

    const renderer = (
        <StyledButton
            attributes={{
                color: variant ==='solid' || color === 'shade' ? _text_color : _color,
                background: variant === 'solid' ? _color : 'transparent',
                outline: variant === 'outline' ? `1px solid` : 'none',
                hoverBg: variant === 'outline' || variant === 'minimal' ? _lightBg : null
            }}
            as={link ? 'a' : 'button'}
            aria-label={label}
            // @ts-ignore
            href={link ? link : null}
            type={type}
            onClick={e => {
                e.stopPropagation();
                onClick(e);
            }}
            disabled={disabled}
            aria-disabled={disabled}
            className={_className}
            style={style}
            target={link ? '_blank' : ''}
            rel={rel}
        >
            {(!disableRipple && !disabled) && <Ripple/>}
            {children}
        </StyledButton>
    );

    return link ? linkWrapper(link, renderer, { target }) : renderer;

}

export { ButtonProps as ButtonProps };
export default Button;