import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styled from '@emotion/styled';
import { Theme, useTheme } from '@emotion/react';

import { getBorderRadiusStyle, getColorByVariant, getTextColorByVariant } from '../utils/styles';
import { getMarginClassName, getPaddingClassName, getShadowClassName } from '../utils/classnames';

type RippleContainer = {
    duration?: number,
    color?: string,
}

const RippleContainer = styled('div')<RippleContainer>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    opacity: 0.75;
    background-color: ${props => props.color};
    animation-name: ripple;
    animation-duration: ${props => props.duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;

const useDebouncedRippleCleanUp = (rippleCount: number, duration: number, cleanUpFunction: () => void) => {
    useEffect(() => {
        let bounce: any = null;
        if (rippleCount > 0) {
            clearTimeout(bounce);

            bounce = setTimeout(() => {
                cleanUpFunction();
                clearTimeout(bounce);
            }, duration * 4);
        }

        return () => clearTimeout(bounce);
    }, [rippleCount, duration, cleanUpFunction]);
};

type RippleState = {
    x: number,
    y: number,
    size: number
}

const Ripple = ({duration = 1000, color = '#fff'}) => {
    const [rippleArray, setRippleArray] = useState<RippleState[]>([]);

    useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
        setRippleArray([]);
    });

    const addRipple = (event: any) => {
        const rippleContainer = event.currentTarget.getBoundingClientRect();
        const size =
            rippleContainer.width > rippleContainer.height
                ? rippleContainer.width
                : rippleContainer.height;
        const x = event.pageX - rippleContainer.x - size / 2;
        const y = event.pageY - rippleContainer.y - size / 2;
        const newRipple = {x, y, size};
        setRippleArray([...rippleArray, newRipple]);
    };

    return (
        <RippleContainer duration={duration} color={color} onMouseDown={addRipple}>
            {rippleArray.length > 0 &&
            rippleArray.map((ripple, index) => {
                return (
                    <span
                        key={'span' + index}
                        style={{
                            top: ripple.y, left: ripple.x,
                            width: ripple.size, height: ripple.size
                        }}
                    />
                );
            })}
        </RippleContainer>
    );
};

const emptyFunc = () => {
};

type StyledButton = {
    disabled: boolean
    fw?: boolean
    borderRadius?: (string | number)
    transparent?: boolean
    bg?: string,
    color?: string
};

const StyledButton = styled('button')<StyledButton>`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;
  border: none !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: ${({disabled}) => !disabled ? 'pointer' : 'not-allowed'};
  line-height: 1;
  text-align: center;
  overflow: hidden;
  width: ${({fw}) => fw ? '100%' : null};
  border-radius: ${({borderRadius}) => borderRadius ? borderRadius : null};
  background: ${({transparent, bg}) => !transparent ? bg : 'transparent!important'};
  color: ${({ color }) => color ? color : null};
  text-decoration: none !important;

  &:hover, &:focus {
    outline: none !important;
    text-decoration: none !important;
  }

  &:hover {
    background: ${({color}) => color ? color : null};
    color: ${({transparent, bg}) => !transparent ? bg : 'transparent!important'};
  }
`;

export type ButtonProps = {
    variant?: ('primary' | 'secondary' | 'dark' | 'light' | 'success' | 'danger' | 'warning')
    shadow?: (0 | 1 | 2 | 3)
    round?: (0 | 1 | 2 | 3 | 4 | 5)
    p?: (0 | 1 | 2 | 3 | 4 | 5 | null)
    px?: (0 | 1 | 2 | 3 | 4 | 5 | 6 | null)
    py?: (0 | 1 | 2 | 3 | 4 | 5 | 6 | null)
    m?: (0 | 1 | 2 | 3 | 4 | 5 | null)
    mx?: (0 | 1 | 2 | 3 | 4 | 5 | null)
    my?: (0 | 1 | 2 | 3 | 4 | 5 | null)
    disabled?: boolean
    fw?: boolean
    children?: (React.ReactNode | React.ReactElement)
    text?: string
    link?: string
    onClick?: () => void
    onBlur?: () => void
    onFocus?: () => void
    className?: string
    transparent?: boolean
    disableRipple?: boolean
    inverseColors?: boolean
    style?: React.CSSProperties,
    type?: ('button' | 'submit')
    label?: string
    title?: string
    target?: ('self' | 'blank' | any)
    rel?: string,
    bg?: string
};


const Button = ({
    type, text, label, children,
    link, target, rel, bg,
    disabled = false, title,
    p = null, px = 3, py = 2,
    m = null, mx = null, my = null,
    transparent, variant = 'primary', shadow, round = 3,
    disableRipple = false, fw = false,
    className, style, inverseColors = false,
    onClick = emptyFunc, onFocus = emptyFunc, onBlur = emptyFunc,
}: ButtonProps) => {

    const theme: Theme = useTheme();

    return (
        <StyledButton
            // @ts-ignore
            as={link != null ? 'a' : 'button'}
            aria-label={label}
            type={type}
            disabled={disabled}
            // @ts-ignore
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
            transparent={transparent}
            bg={bg ? bg : inverseColors ? getTextColorByVariant(variant, theme) : getColorByVariant(variant, theme)}
            color={transparent || inverseColors ? getColorByVariant(variant, theme) : getTextColorByVariant(variant, theme)}
            borderRadius={getBorderRadiusStyle(round)}
            className={classNames(
                getPaddingClassName({p, px, py}),
                getMarginClassName({m, mx, my}),
                getShadowClassName(shadow),
                `text-lg ${className}`,
            )}
            style={style}
        >
            {!disableRipple && <Ripple/>}
            {children || text}
        </StyledButton>
    );

};

export default Button;
