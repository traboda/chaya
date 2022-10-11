import React from "react";
import {LinkRelType, LinkTargetType} from "../../utils/misc";

export type ButtonProps = {
    variant?: ('solid' | 'outline' | 'minimal' | 'link'),
    color?: ('primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast' | 'shade'),
    size?: ('xs' | 'sm' | 'md' | 'lg' | 'xl')
    children?: React.ReactNode
    id?: string,
    className?: string,
    style?: React.CSSProperties,
    disableRipple?: boolean

    link?: string
    target?: LinkTargetType,
    rel?: LinkRelType,

    disabled?: boolean,
    onClick?: (e: React.MouseEvent) => void
    type?: ('button' | 'submit' | 'reset')
    onBlur?: () => void
    onFocus?: () => void
    label?: string
    title?: string
};