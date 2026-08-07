import React, { ReactNode } from 'react';

import mcs from '../utils/merge';

import Icon from './Icon';
import ToolTip from './Tooltip';

export interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  children: ReactNode;
  isRequired?: boolean;
  htmlFor?: string;
  id?: string;
  sidebar?: ReactNode;
  tooltip?: string;
  className?: string;
}

const Label = ({
  children,
  isRequired,
  htmlFor,
  id,
  sidebar,
  tooltip,
  className,
  ...props
}: LabelProps) => {
  return (
    <label
      id={id}
      className={mcs(['mb-1 flex items-center text-sm font-medium opacity-90', className])}
      htmlFor={htmlFor}
      aria-hidden={props?.['aria-hidden'] ?? false}
      {...props}
    >
      <span className="flex items-center gap-1">
        <span>
          {children}
          {isRequired && <span className="ml-1 text-red-500">*</span>}
        </span>
        {tooltip && (
          <ToolTip overlay={tooltip} side="right">
            <Icon icon="info" size={14} />
          </ToolTip>
        )}
      </span>
      <span className="ml-auto">{sidebar}</span>
    </label>
  );
};

export default Label;
