import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Flex = ({ children, p = 0, center = false, wrap = false, hc = false, vc = false, hr = false, className }) => {
  const paddingClass = `p-${p}`;

  return (
    <div
      className={classNames(
        'd-flex',
        { 'justify-content-center': (center || hc) && !hr },
        { 'align-items-center': center || vc },
        { 'justify-content-end': hr },
        paddingClass,
        className
      )}
    >
      {wrap ? <div>{children}</div> : children}
    </div>
  );
};

Flex.propTypes = {
  p: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  center: PropTypes.bool,
  wrap: PropTypes.bool,
  vc: PropTypes.bool,
  hc: PropTypes.bool,
  hr: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Flex;
