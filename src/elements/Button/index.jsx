import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from '@emotion/styled';

import { getBorderRadiusStyle, getColorByVariant, getTextColorByVariant } from '../../utils/styles';
import { getMarginClassName, getPaddingClassName, getShadowClassName } from '../../utils/classNames';

import Ripple from './ripple';
import { ThemeContext } from '../../utils/theme';

const emptyFunc = () => {};

const StyledButton = styled.button`
    font-weight: bold;
    border: none!important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: ${({ disabled }) => !disabled ? "pointer": "not-allowed"};
    font-size: 1.35rem;
    line-height: 1;
    text-align: center;
    overflow: hidden;
    width: ${({ fw }) => fw ? '100%' : null};
    border-radius: ${({ borderRadius }) => borderRadius ? borderRadius : null};
    background: ${({ transparent, bg }) => !transparent ? bg : 'transparent!important' };
    color: ${({ color }) => color ? color : null };
    text-decoration: none!important;
    &:hover, &:focus {
        outline: none!important;
        text-decoration: none!important;
        background: ${({ color }) => color ? color : null };
        color: ${({ transparent, bg }) => !transparent ? bg : 'transparent!important' };
    }
`;

const Button = ({
  type, text,  label, children,
  link,  target, rel,
  disabled = false, title,
  p = null, px = 3, py = 2,
  m = null, mx = null, my = null,
  transparent, variant = 'primary', shadow, round = 2,
  disableRipple = false, fw = false,
  className, style, inverseColors = false,
  onClick = emptyFunc, onFocus = emptyFunc, onBlur = emptyFunc,
}) => {

  const theme = useContext(ThemeContext);

  return (
    <StyledButton
      as={link != null ? 'a' : 'button'}
      aria-label={label}
      type={type}
      disabled={disabled}
      href={link}
      title={title}
      target={target}
      rel={rel}
      onClick={e => { e.stopPropagation(); onClick(); }}
      onBlur={onBlur}
      onFocus={onFocus}
      fw={fw}
      transparent={transparent}
      bg={inverseColors ? getTextColorByVariant(variant, theme) : getColorByVariant(variant, theme)}
      color={transparent || inverseColors ? getColorByVariant(variant, theme) : getTextColorByVariant(variant, theme)}
      borderRadius={getBorderRadiusStyle(round)}
      className={classNames(
        getPaddingClassName({ p, px, py }),
        getMarginClassName({ m, mx, my }),
        getShadowClassName(shadow),
        className,
      )}
      style={style}
    >
      {!disableRipple && <Ripple />}
      {children || text}
    </StyledButton>
  );

};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'dark', 'light', 'success', 'danger', 'warning' ]),
  shadow: PropTypes.oneOf([0, 1, 2, 3]),
  round: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  p: PropTypes.oneOf([0,1,2,3,4,5]),
  px: PropTypes.oneOf([0,1,2,3,4,5]),
  py: PropTypes.oneOf([0,1,2,3,4,5]),
  m: PropTypes.oneOf([0,1,2,3,4,5]),
  mx: PropTypes.oneOf([0,1,2,3,4,5]),
  my: PropTypes.oneOf([0,1,2,3,4,5]),
  disabled: PropTypes.bool,
  fw: PropTypes.bool,
  children: PropTypes.node,
  text: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
  transparent: PropTypes.bool,
  disableRipple: PropTypes.bool,
  inverseColors: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

export default Button;