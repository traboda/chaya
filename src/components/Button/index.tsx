import React from 'react';
// import Color from 'color';
// import tailwindColors from 'tailwindcss/colors';

import { ButtonProps } from './type';
import Ripple from './Ripple';
import { LinkWrapper } from '../../utils/misc';
// import DSRContext from '../../contexts/DSRContext';
import clsx from 'clsx';

// type StyledButton = {
//   attributes: {
//     color: string,
//     background: string,
//     hoverBg: string,
//     outline: string,
//   }
// };

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

const Button = ({
  // variant = 'solid', color = 'primary', size = 'md',
  children, link, onClick = () => {},
  className = '', style, label, disableRipple = false,
  target, type, rel, disabled, id,
}: ButtonProps) => {
  // const { theme } = useContext(DSRContext);
  // const background = Color(theme?.background);

  // const colors = {
  //   primary: theme?.primary,
  //   secondary: theme?.secondary,
  //   success: tailwindColors.green['500'],
  //   danger: tailwindColors.red['500'],
  //   warning: tailwindColors.yellow['500'],
  //   contrast: background.negate().toString(),
  //   shade: background.isDark() ? background.lighten(0.2).toString() : background.darken(0.2).toString(),
  // };

  // const activeColor = colors[color];

  // const hoverColor = Color(activeColor).darken(0.1).toString();

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
            'dsr-p-4',
          ])}
          style={style}
      >
          {(!disableRipple && !disabled) && <Ripple />}
          {children}
      </button>
  );

  return (
      <div >
          {link ? LinkWrapper(link, renderer(), { target, rel, id, className, style, label }) : buttonRenderer()}
      </div>
  );

};

export { ButtonProps as ButtonProps };
export default Button;