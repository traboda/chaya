import React from "react";
import styled from "@emotion/styled";
import Color from 'color';
import {useTheme} from "@emotion/react";

import { ButtonProps } from "./type";
import Ripple from "./Ripple";

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
  &:focus, &:hover {
    background: ${({ attributes }) => attributes?.hoverBg};
  }
`;

const Button = ({
    variant = 'solid', color = 'primary', size = 'md',
    children, link, onClick = () => {},
    className, style, label, disableRipple = false,
    type, rel, disabled,
}: ButtonProps) => {

    const theme = useTheme();

    const _color = (() => {
        return (
            color === 'primary' ? theme.primary :
            color === 'secondary' ? theme.secondary :
            color === 'success' ? '#28a745' :
            color === 'danger' ? '#dc3545' :
            color === 'warning' ? '#ffc107' :
            color === 'contrast' ?  theme.color : null
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
            color === 'contrast' ?  theme.background : null
        )
    })();

    const _className = (() => {
       let classNames = '';
       if(variant !== link)
            classNames += `${size === 'xs' ? 'p-0' : size === 'sm' ? 'p-1' : size === 'md' ? 'p-2' : size === 'lg' ? 'p-3' : size === 'xl' ? 'p-4' : ''} `;
       classNames += `text-${size} `
       return classNames;
    })();

    return (
        <StyledButton
            attributes={{
                color: variant ==='solid' ? _text_color : _color,
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
            {!disableRipple && <Ripple/>}
            {children}
        </StyledButton>
    );
}

export default Button;