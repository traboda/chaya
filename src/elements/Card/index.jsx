import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getFlexClassNames, getMarginClassName, getPaddingClassName, getShadowClassName } from '../../utils/classNames';
import { ThemeContext } from '../../utils/theme';
import { getBorderRadiusStyle } from '../../utils/styles';

const Card = ({
  children, className, style, transparent = false,
  shadow, round, minHeight, bg, color,
  flexCenter = false, flexHC = false, flexHR = false, flexVC = false,
  p = null, px = null, py = null,
  m = null, mx = null, my = null,
  onClick = () => {},
}) => {

  const theme = useContext(ThemeContext);

  return (
    <div
      className={classNames(
        { 'bg-none': transparent },
        getPaddingClassName({ p, px, py }),
        getMarginClassName({ m, mx, my }),
        getFlexClassNames({ flexCenter, flexVC, flexHC, flexHR }),
        getShadowClassName(shadow),
        className
      )}
      onClick={onClick}
      style={{
        borderRadius: getBorderRadiusStyle(round), minHeight,
        background: !transparent && (bg ? bg : theme?.cardBg ? theme.cardBg : theme?.background ? theme.background : null),
        color: (color ? color : (theme?.color ? theme.color : null)),
        ...style
      }}
    >
      {children}
    </div>
  );
};

const props = {
  /**
   * padding for the card
   */
  p: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  /**
   * horizontal padding
   */
  px: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  /**
   * vertical padding
   */
  py: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  /**
   * flex center content of the card
   */
  flexCenter: PropTypes.bool,
  flexHC: PropTypes.bool,
  flexVC: PropTypes.bool,
  flexHR: PropTypes.bool,
  /**
   * margin for the card
   */
  m: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  /**
   * horizontal margin for the card
   */
  mx: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  /**
   * vertical margin for the card
   */
  my: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  /**
   * shadow for the card
   */
  shadow: PropTypes.oneOf([0, 1, 2, 3]),
  /**
   * border radius for the card
   */
  round: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  /**
   * minimum height for the card
   */
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * background for the card
   */
  bg: PropTypes.string,
  /**
   * color for the text in the card
   */
  color: PropTypes.string,
  /**
   * additional custom class names for the card
   */
  className: PropTypes.string,
  /**
   * custom styling for the card
   */
  style: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  /**
   * body of the card
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  /**
   * is the card transparent, on default it has a white background
   */
  transparent: PropTypes.bool,
  /**
   * callback for onClick action
   */
  onClick: PropTypes.func,
};

Card.propTypes = props;

export default Card;
