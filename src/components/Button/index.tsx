import React from 'react';
import styled from '@emotion/styled';
import { colorType, resolveClassName, variantType } from "../../utils/classnames";
import Ripple from "./Ripple";

const emptyFunc = () => {};

type StyledButton = {
    disabled: boolean
    fw?: boolean
    color: colorType,
    variant: variantType
};

const StyledButton = styled('button')<StyledButton>`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;
  border-width: 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: ${({ disabled }) => !disabled ? 'pointer' : 'not-allowed'};
  line-height: 1;
  text-align: center;
  overflow: hidden;
  width: ${({ fw }) => fw ? '100%' : null};
  border-radius: 8px;
  color: ${({ theme }) => theme.color};
  text-decoration: none;
  background: transparent;

  &:hover, &:focus {
    background: ${({ theme, variant }) => variant === 'solid' ? theme.color : null} !important;
    border-color: ${({ theme, variant }) => variant === 'solid' ? theme.color : null} !important;
    color: ${({ theme, variant }) => variant === 'outline' ? theme.color : null} !important;
  }

  &.bg-primary, &.bg-secondary, &.text-contrast { color: ${({ theme }) => theme.color}; }
  
  &.border-primary { border-color: ${({ theme }) => theme.primary}; }
  &.border-secondary { border-color: ${({ theme }) => theme.secondary}; }

  &.text-primary { color: ${({ theme }) => theme.primary}; }
  &.text-secondary { color: ${({ theme }) => theme.secondary}; }

  &.bg-primary, &.hover\\:bg-primary:hover {
    background: ${({ theme }) => theme.primary};
    &:hover { color: ${({ theme }) => theme.primary}; };
  }
  &.bg-secondary, &.hover\\:bg-secondary:hover {
    background: ${({ theme }) => theme.secondary};
    &:hover { color: ${({ theme }) => theme.secondary}; };
  }

  &.bg-contrast, &.hover\\:bg-contrast:hover { background: ${({ theme }) => theme.color}; }
  &.border-contrast { border-color: ${({ theme }) => theme.color}; }
  &.text-contrast-negative, &.hover\\:text-contrast-negative:hover { color: ${({ theme }) => theme.background} !important; }
`;

export type ButtonProps = {
    variant?: variantType
    color?: colorType
    size?: ('xs' | 'sm' | 'md' | 'lg' | 'xl')
    disabled?: boolean
    fw?: boolean
    children?: React.ReactNode
    text?: string
    link?: string
    onClick?: () => void
    onBlur?: () => void
    onFocus?: () => void
    className?: string
    disableRipple?: boolean
    style?: React.CSSProperties,
    type?: ('button' | 'submit' | 'reset')
    label?: string
    title?: string
    target?: ('self' | 'blank' | any)
    rel?: string,
};

const Button = ({
    type, text, label, children,
    link, target, rel,
    disabled = false, title,
    disableRipple = false, fw = false,
    className = '', style, variant = 'solid', color = 'primary',
    onClick = emptyFunc, onFocus = emptyFunc, onBlur = emptyFunc,
}: ButtonProps) => {

    return (
        <StyledButton
            as={link !== null ? 'a' : 'button'}
            aria-label={label}
            type={type}
            disabled={disabled} // @ts-ignore
            href={link}
            title={title}
            target={target}
            rel={rel}
            onClick={e => {
                e.stopPropagation();
                onClick();
            }}
            onBlur={onBlur}
            onFocus={onFocus}
            fw={fw}
            color={color}
            variant={variant}
            className={resolveClassName(variant, color, className)}
            style={style}
        >
            {!disableRipple && <Ripple/>}
            {children || text}
        </StyledButton>
    );

};

export default Button;
