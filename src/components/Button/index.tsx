import React, { useContext } from 'react';
import Color from 'color';
import tailwindColors from 'tailwindcss/colors';
import buttonStyle from './button.module.scss';

import { ButtonProps } from './type';
import Ripple from './Ripple';
import { LinkWrapper } from '../../utils/misc';
import DSRContext from '../../contexts/DSRContext';
import clsx from 'clsx';

// const ButtonContainer = styled('span')<StyledButton>`
//   a, button {
//     background: ${({ attributes }) => attributes?.background};
//     color: ${({ attributes }) => attributes?.color};
//     border: ${({ attributes }) => attributes?.outline};
//     border-radius: 7px;
//     display: inline-block;
//     position: relative;
//     overflow: hidden;
//     text-align: center;
//     &:disabled {
//       opacity: 0.95;
//       cursor: not-allowed;
//     }
//     &:focus, &:hover {
//       background: ${({ attributes }) => attributes?.hoverBg};
//     }
//   }
// `;

const paddings = {
  xs: 'dsr-px-1 dsr-py-0',
  sm: 'dsr-px-2 dsr-py-1',
  md: 'dsr-px-3 dsr-py-2',
  lg: 'dsr-px-4 dsr-py-3',
  xl: 'dsr-px-5 dsr-py-4',
};

const Button = ({
  variant = 'solid', color = 'primary', size = 'md',
  children, link, onClick = () => {},
  className = '', style, label, disableRipple = false,
  target, type, rel, disabled, id,
}: ButtonProps) => {
  const { theme } = useContext(DSRContext);
  const background = Color(theme?.background);

  const colors = {
    primary: theme?.primary,
    secondary: theme?.secondary,
    success: tailwindColors.green['500'],
    danger: tailwindColors.red['500'],
    warning: tailwindColors.yellow['500'],
    contrast: background.negate().toString(),
    shade: background.isDark() ? background.lighten(0.2).toString() : background.darken(0.2).toString(),
  };

  const activeColor = colors[color];
  const backgroundColors = {
    solid: activeColor,
    outline: 'rgba(0, 0, 0, 0)',
    minimal: Color(activeColor).fade(0.75).toString(),
    link: 'rgba(0, 0, 0, 0)',
  };
  const backgroundColor = backgroundColors[variant];
  console.log(backgroundColor);
  const textColor = variant === 'solid' ? (Color(activeColor).isDark() ? '#fff' : '#333') : activeColor;
  const hoverColor = Color(activeColor).darken(0.1).toString();

  const renderer = () => (
      <React.Fragment>
          {(!disableRipple && !disabled) && <Ripple />}
          {children}
      </React.Fragment>
  );

  const buttonRenderer = () => (
      <button
          id={id}
          aria-label={label}
          type={type}
          onClick={e => {
            e.stopPropagation();
            onClick(e);
          }}
          disabled={disabled}
          aria-disabled={disabled}
          className={clsx([
            className,
            paddings[size],
            buttonStyle.button,
            'dsr-rounded-lg dsr-inline-block dsr-relative dsr-overflow-hidden dsr-text-center',
          ])}
          style={{
            background: backgroundColor,
            color: textColor,
            ...style,
          }}
      >
          {(!disableRipple && !disabled) && <Ripple />}
          {children}
      </button>
  );

  return (
      <div className={variant === 'minimal' ? 'dsr-bg-white dsr-rounded-lg' : ''}>
          {link ? LinkWrapper(link, renderer(), { target, rel, id, className, style, label }) : buttonRenderer()}
      </div>
  );

};

export { ButtonProps as ButtonProps };
export default Button;