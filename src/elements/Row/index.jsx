import React from 'react';
import shortid from 'shortid';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Col from '../Col';
import { getMarginClassName, getPaddingClassName } from '../../utils/classNames';

const Row = ({
   children, cols, colProp, className, style,
   p = 0, px, py,
   m = null, mx = 0, mt = null, mb = null, my = null
}) => {

  return (
    <div
      className={classNames(
        'row',
        getPaddingClassName({ p, px, py }),
        getMarginClassName({ m, mx, my, mt, mb }),
        my != null ? `my-${my}` : null,
        mt != null ? `mt-${mt}` : null,
        mb != null ? `mb-${mb}` : null,
        className
      )}
      style={style}
    >
      {cols && cols.length && cols.length > 0
        ? cols
          .filter(c => !(c == null || !c))
          .map(c => (
            <Col key={shortid.generate()} {...colProp}>
              {c}
            </Col>
          ))
        : children}
    </div>
  );
};

Row.propTypes = {
  p: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  px: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  py: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  m: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  mx: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  mb: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  mt: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  my: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  className: PropTypes.string,
  cols: PropTypes.arrayOf(PropTypes.node),
  colProp: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Row;
