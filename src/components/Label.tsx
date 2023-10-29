'use client';

import React, { ReactNode } from 'react';
import clsx from 'clsx';

import ToolTip from './Tooltip';
import Icon from './Icon';

export type LabelProps = {
  children: ReactNode,
  isRequired?: boolean,
  htmlFor?: string,
  id?: string,
  sidebar?: ReactNode,
  tooltip?: string,
  className?: string
};

const Label = ({ children, isRequired, htmlFor, id, sidebar, tooltip, className }: LabelProps) => {
  return (
    <label
      id={id}
      className={clsx(['dsr-tracking-wide dsr-text-sm dsr-font-semibold dsr-opacity-70 dsr-flex dsr-items-center dsr-mb-1', className])}
      htmlFor={htmlFor}
      aria-hidden={false}
    >
      <span className="dsr-flex dsr-items-center dsr-gap-1">
        <span>
          {children}
          {isRequired && <span className="dsr-ml-1 dsr-text-red-500 dsr-text-sm">*</span>}
        </span>
        {tooltip && (
          <ToolTip overlay={tooltip} side="right">
            <Icon icon="info" size={14} />
          </ToolTip>
        )}
      </span>
      <span className="dsr-ml-auto">{sidebar}</span>
    </label>
  );
};

export default Label;