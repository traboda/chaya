import React, {useState} from "react";
import styled from "@emotion/styled";
import Button, { ButtonProps } from "./Button";

type Alert = {
  type?: "success" | "info" | "warning" | "danger" | "default";
  variant?: "filled" | "outline";
  className?: string,
  title?: string
  description?: string;
  iconClassName?: string,
  allowDismissal?: boolean,
  onDismiss?: () => void,
  primaryButton?: ButtonProps,
  secondaryButton?: ButtonProps,
  icons?: {
    title?: React.ReactElement,
    close?: React.ReactElement
  }
};

type AlertContainer = {
    type: "success" | "info" | "warning" | "danger" | "default";
    variant: "filled" | "outline";
}

const get_bg_by_type = (type, isDark) => {
    if(isDark) {
        switch (type) {
            case 'success': return '#025f2b';
            case 'info': return '#024c6a';
            case 'warning': return '#907400';
            case 'danger': return '#7b0707';
            default: return '#333';
        }
    } else {
        switch (type) {
            case 'success': return '#dff0d8';
            case 'info': return '#d9edf7';
            case 'warning': return '#fcf8e3';
            case 'danger': return '#fddede';
            default: return '#eee';
        }
    }
}

const get_color_by_type = (type, isDark) => {
    if(isDark) {
        switch (type) {
            case 'success': return '#B5FFD9';
            case 'info': return '#90E0EF';
            case 'warning': return '#ffeedb';
            case 'danger': return '#fac8df';
            default: return '#FFF';
        }
    } else {
        switch (type) {
            case 'success': return '#3c763d';
            case 'info': return '#31708f';
            case 'warning': return '#8a6d3b';
            case 'danger': return '#c20101';
            default: return '#111';
        }
    }
}

const AlertContainer = styled('div')<AlertContainer>`
  color: ${({ theme, type }) => get_color_by_type(type, theme.isDarkTheme)};
  border-color:  ${({ theme, type, variant }) => variant === "outline" ? get_color_by_type(type, theme.isDarkTheme) : null};
  border-style: ${({ variant }) => variant === "outline" ? `solid` : null};
  border-width: ${({ variant }) => variant === "outline" ? '1px' : null};
  background-color: ${({ theme, type, variant }) => variant === "filled" ? get_bg_by_type(type, theme.isDarkTheme) : null};
`;

const defaultIcons = {
    close: <>x</>,
    title: <i />
}


const Alert = ({
    type = 'default', variant = 'filled', className = '', title, description, iconClassName, allowDismissal = false, onDismiss = () => {},
    primaryButton, secondaryButton, icons: _icons = null,
}: Alert) => {

    const icons = {...defaultIcons, ..._icons};
    const [hide, setHide] = useState(false);

    return !hide ? (
        <AlertContainer type={type} variant = {variant} className={`${description ? 'px-3 py-4' : 'px-3 py-2'} relative rounded-lg ${className}`}>
            {allowDismissal && (
                <div className="absolute top-0 right-0 pr-3">
                    <button
                        title="dismiss"
                        className="font-mono outline-none font-bold text-2xl"
                        onClick={() => { setHide(true); onDismiss() }}
                    >
                        x
                    </button>
                </div>
            )}
            {title &&
            <h4 className={`${description ? 'text-xl font-semibold' : 'text-lg'}`}>
                {icons?.title}
                {iconClassName && <i className={iconClassName} />}
                {title}
            </h4>}
            {description && <p className="text-lg mt-2">{description}</p>}
            {(primaryButton || secondaryButton) && (
                <div className="flex items-center py-2">
                    {primaryButton &&
                    <div className="mr-2">
                        <Button
                            {...primaryButton}
                            color="primary"
                            className="text-base"
                        />
                    </div>}
                    {secondaryButton &&
                    <div>
                        <Button
                            {...secondaryButton}
                            color="secondary"
                            className="text-base"
                        />
                    </div>}
                </div>
            )}
        </AlertContainer>
    ) : <div />;
}

export default Alert;