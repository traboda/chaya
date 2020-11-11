import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Card = ({
  children, className, style, transparent = false,
  shadow, round, flexCenter, minHeight, bg,
  p = null, px = null, py = null, m = null, mx = null, my = null,
  onClick = () => {},
}) => {

  const borderRadius = (() => {
    switch (round) {
      case 1: return '0.15rem';
      case 2: return '0.25rem';
      case 3: return '0.5rem';
      case 4: return '1rem';
      case 5: return '2rem';
      default: return 0;
    }
  })();

  const shadowClass = (() => {
    switch (shadow) {
      case 0: return 'shadow-none';
      case 1: return 'shadow-sm';
      case 2: return 'shadow';
      case 3: return 'shadow-lg';
      default: return null;
    }
  })();

  return (
    <div
      className={classNames(
        { 'bg-white': !transparent && !bg },
        { 'text-dark': !transparent && !bg },
        { 'bg-none': transparent },
        shadowClass,
        p != null ? `p-${p}` : null,
        px != null ? `px-${px}` : null,
        py != null ? `py-${py}` : null,
        m != null && (mx == null && my == null) ? `m-${m}` : mx != null ? `mx-${mx}` : my != null ? `my-${my}` : null,
        { 'd-flex align-items-center justify-content-center': flexCenter },
        className
      )}
      onClick={onClick}
      style={{ borderRadius, minHeight, background: !transparent && bg, ...style, }}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
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
   * flex center content of the card
   */
  flexCenter: PropTypes.bool,
  /**
   * is the card transparent, on default it has a white background
   */
  transparent: PropTypes.bool,
  /**
   * callback for onClick action
   */
  onClick: PropTypes.func,
};

export default Card;
