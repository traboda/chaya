import React, { useContext, useState } from 'react';
import Button, { ButtonProps } from './Button';
import DSRContext from '../contexts/DSRContext';
import clsx from 'clsx';
import Icon, { IconInputType } from './Icon';


type Alert = {
  type?: 'success' | 'info' | 'warning' | 'danger' | 'default';
  variant?: 'filled' | 'outline';
  id?: string,
  className?: string,
  title?: string
  description?: string;
  allowDismissal?: boolean,
  onDismiss?: () => void,
  primaryButton?: ButtonProps,
  secondaryButton?: ButtonProps,
  icon?: IconInputType,
};

const getBgByType = (type: string, isDarkTheme?: boolean) => {
  if (isDarkTheme) {
    switch (type) {
      case 'success': return '#025f2b';
      case 'info': return '#024c6a';
      case 'warning': return '#907400';
      case 'danger': return '#7b0707';
      default: return '#333';
    }
  } else {
    switch (type) {
      case 'success': return '#dff0d8';
      case 'info': return '#d9edf7';
      case 'warning': return '#fcf8e3';
      case 'danger': return '#fddede';
      default: return '#eee';
    }
  }
};

const getColorByType = (type: string, isDarkTheme?: boolean) => {
  if (isDarkTheme) {
    switch (type) {
      case 'success': return '#B5FFD9';
      case 'info': return '#90E0EF';
      case 'warning': return '#ffeedb';
      case 'danger': return '#fac8df';
      default: return '#FFF';
    }
  } else {
    switch (type) {
      case 'success': return '#3c763d';
      case 'info': return '#31708f';
      case 'warning': return '#8a6d3b';
      case 'danger': return '#c20101';
      default: return '#111';
    }
  }
};

const Alert = ({
  type = 'default', variant = 'filled', id, className = '', title, description,  allowDismissal = false,
  onDismiss = () => {}, primaryButton, secondaryButton, icon,
}: Alert) => {
  const [hide, setHide] = useState(false);
  const { isDarkTheme } = useContext(DSRContext);
  const computedClassName = clsx([
    description ? 'dsr-py-4' : 'dsr-py-3',
    'dsr-relative dsr-rounded-lg dsr-px-3 dsr-flex dsr-flex-col dsr-gap-2 ',
    className,
  ]);

  return !hide ? (
      <div
          id={id}
          className={computedClassName}
          style={{
            color: getColorByType(type, isDarkTheme),
            borderColor: variant === 'outline' ? getColorByType(type, isDarkTheme ) : undefined,
            borderStyle: variant === 'outline' ? 'solid' : undefined,
            borderWidth: variant === 'outline' ? '1px' : undefined,
            backgroundColor: variant === 'filled' ? getBgByType(type, isDarkTheme) : undefined,
          }}
      >
          {allowDismissal && (
              <div className="dsr-absolute dsr-top-0 dsr-right-0 dsr-pr-3 dsr-pt-2">
                  <button
                      title="dismiss"
                      className="dsr-font-mono dsr-outline-none dsr-font-bold dsr-text-2xl"
                      onClick={() => { setHide(true); onDismiss(); }}
                  >
                      <Icon icon="times" size={16} />
                  </button>
              </div>
          )}
          {title && (
              <h4 className={description ? 'dsr-text-xl dsr-font-semibold' : 'dsr-text-lg'}>
                  {icon ? <Icon icon={icon} /> : null}
                  {title}
              </h4>
          )}
          {description && <p className="dsr-text-lg">{description}</p>}
          {(primaryButton || secondaryButton) && (
          <div className="dsr-flex dsr-items-center">
              {primaryButton &&
              <div className="dsr-mr-2">
                  <Button
                      {...primaryButton}
                      color="primary"
                      className="dsr-text-base"
                  />
              </div>}
              {secondaryButton &&
              <div>
                  <Button
                      {...secondaryButton}
                      color="secondary"
                      className="dsr-text-base"
                  />
              </div>}
          </div>
          )}
      </div>
  ) : <div />;
};

export default Alert;
