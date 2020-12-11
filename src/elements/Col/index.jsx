import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { getFlexClassNames, getPaddingClassName } from '../../utils/classNames';

const Col = ({
   s = null, sm = null, md = null, lg = null, xl = null,
   p = null, px = null, py = null,
   order = null, orderMD = null,
   flexCenter = false, flexVC = false, flexHC = false, flexHR = false,
   children, className, style,
 }) => (
  <div
    className={classNames(
      s != null ? `col-${s}` : null,
      sm != null ? `col-sm-${sm}` : null,
      md != null ? `col-md-${md}` : null,
      lg != null ? `col-lg-${lg}` : null,
      xl != null ? `col-lg-${xl}` : null,
      { col: s == null && sm == null && md == null && lg == null && xl == null },
      order != null ? `order-${order}` : null,
      orderMD != null ? `order-${orderMD}` : null,
      getPaddingClassName({ p, px, py }),
      getFlexClassNames({ flexCenter, flexVC, flexHC, flexHR }),
      className
    )}
    style={style}
  >
    {children}
  </div>
);

Col.propTypes = {
  s: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  sm: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  md: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  lg: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  xl: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  p: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  px: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  py: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  order: PropTypes.number,
  orderMD: PropTypes.number,
  flexCenter: PropTypes.bool,
  flexHC: PropTypes.bool,
  flexVC: PropTypes.bool,
  flexHR: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Col;
