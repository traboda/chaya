import React from "react";
import styled from "@emotion/styled";
import Color from 'color';
import {useTheme} from "@emotion/react";

export type BadgeProps = {
    variant?: ('solid' | 'outline' | 'minimal'),
    color?: ('primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast' | 'shade'),
    size?: ('xs' | 'sm' | 'md' | 'lg' | 'xl')
    id?: string,
    className?: string,
    style?: React.CSSProperties,
    onClick?: () => void,
    children: React.ReactNode
};

type StyledBadge = {
    attributes: {
        color: string,
        background: string,
        outline: string,
    }
}

const BadgeContainer = styled('span')<StyledBadge>`
    background: ${({ attributes }) => attributes?.background};
    color: ${({ attributes }) => attributes?.color};
    border: ${({ attributes }) => attributes?.outline};
    display: inline-block;
    white-space: nowrap;
    line-height: 1;
    vertical-align: middle;
    position: relative;
    overflow: hidden;
    text-align: center;
    user-select: none;
`;

const Badge = ({
   children, variant = 'minimal', color = 'primary', size = 'sm',
   id, className = '', style, onClick = () => {}
}: BadgeProps) => {

    const theme = useTheme();

    const _color = (() => (
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
    ))();

    const _lighterBg = (() => {
        return Color(_color).fade(color === 'shade' ? 0.5 : 0.85).rgb().string();
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
        let classNames = 'rounded-lg ';
        if(!(className && className.match(/px-\d+|py-\d+|p-\d+/)))
            classNames += `${size === 'xs' ? 'px-1' : size === 'sm' ? 'px-2 py-0' : size === 'md' ? 'px-3 py-1' : size === 'lg' ? 'px-3 py-1' : size === 'xl' ? 'px-5 py-2' : ''} `;
        classNames += `text-${size} `;
        if(className?.length)
            classNames += className;
        return classNames;
    })();

    return (
        <BadgeContainer
            attributes={{
                color: variant ==='solid' || color === 'shade' ? _text_color : _color,
                background: variant === 'outline' ? 'transparent' : variant === 'solid' ? _color : _lighterBg,
                outline: variant === 'outline' ? `1px solid` : 'none',
            }}
            id={id}
            className={_className}
            style={style}
            onClick={onClick}
        >
            {children}
        </BadgeContainer>
    );

}

export default Badge;