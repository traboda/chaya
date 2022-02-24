import React from "react";
import {LinkWrapperFunction} from "../../contexts/LinkWrapperContext";

export type ButtonProps = {
    variant?: ('solid' | 'outline' | 'minimal' | 'link'),
    color?: ('primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast' | 'shade'),
    size?: ('xs' | 'sm' | 'md' | 'lg' | 'xl')
    children?: React.ReactNode
    className?: string,
    style?: React.CSSProperties

    link?: string
    onClick?: (e: React.MouseEvent) => void

    disabled?: boolean,
    linkWrapper?: LinkWrapperFunction,

    onBlur?: () => void
    onFocus?: () => void
    disableRipple?: boolean
    type?: ('button' | 'submit' | 'reset')
    label?: string
    title?: string
    target?: ('self' | 'blank' | any),
    rel?: string,
};