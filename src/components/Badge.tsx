import React from "react";
import styled from "@emotion/styled";
import Color from 'color';
import {useTheme} from "@emotion/react";

type BadgeProps = {
    variant?: ('solid' | 'outline' | 'minimal'),
    color?: ('primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'contrast' | 'shade'),
    size?: ('xs' | 'sm' | 'md' | 'lg' | 'xl')
    className?: string,
    borderRadius?: string,
    style?: React.CSSProperties,
    text?: string
};

type StyledBadge = {
    attributes: {
        color: string,
        background: string,
        borderRadius: string,
        outline: string,
    }
}

const BadgeContainer = styled('span')<StyledBadge>`
  div {
    background: ${({ attributes }) => attributes?.background};
    color: ${({ attributes }) => attributes?.color};
    border: ${({ attributes }) => attributes?.outline};
    border-radius: ${({ attributes }) => attributes?.borderRadius};
    display: inline-block;
    white-space: nowrap;
    vertical-align: middle;
    position: relative;
    overflow: hidden;
    text-align: center;
  }
`;

const Badge = ({
                   variant = 'minimal', color = 'primary', size = 'sm',
                   className = '', style, text = 'New', borderRadius = '3px'
               }: BadgeProps) => {

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
        let classNames = '';

        if(!(className && className.match(/px-\d+|py-\d+|p-\d+/)))
            classNames += `${size === 'xs' ? 'px-1 py-0' : size === 'sm' ? 'px-2 py-1' : size === 'md' ? 'px-3 py-2' : size === 'lg' ? 'px-4 py-3' : size === 'xl' ? 'px-5 py-4' : ''} `;
        classNames += `text-${size} `;
        classNames += className;
        return classNames;
    })();

    return (
        <BadgeContainer
            attributes={{
                color: variant ==='solid' || color === 'shade' ? _text_color : _color,
                background: variant === 'outline' ? 'transparent' : variant === 'solid' ? _color : _lighterBg,
                outline: variant === 'outline' ? `1px solid` : 'none',
                borderRadius: borderRadius
            }}
        >
            <div
                className={_className}
                style={style}
            >
                {text}
            </div>
        </BadgeContainer>
    );

}

export default Badge;