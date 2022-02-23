import React from "react";

export type ButtonProps = {
    variant?: ('solid' | 'outline' | 'minimal' | 'link'),
    color?: ('primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast'),
    size?: ('xs' | 'sm' | 'md' | 'lg' | 'xl')
    children?: React.ReactNode
    className?: string,
    style?: React.CSSProperties

    link?: string
    onClick?: (e: React.MouseEvent) => void

    disabled?: boolean
    fw?: boolean


    onBlur?: () => void
    onFocus?: () => void
    disableRipple?: boolean
    type?: ('button' | 'submit' | 'reset')
    label?: string
    title?: string
    target?: ('self' | 'blank' | any)
    rel?: string,
};