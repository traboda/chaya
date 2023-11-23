'use client';
import React from 'react';
import clsx from 'clsx';

import useCountUp from '../hooks/useCountUp';

import Icon, { IconInputType } from './Icon';
import Card from './Card';

export type StatsCardProps = {
  value: number,
  deltaValue?: number,
  change?: 'positive' | 'negative',
  valueType?: 'currency' | 'number',

  labels: {
    deltaLabel?: string,
    title?: string,
    description?: string,
  }

  id?: string,
  className?: string,
  valueClassName?: string,

  icon?: IconInputType,
  duration?: number,
  roundFrom?: number | null,
  bottomRenderer?: () => React.ReactNode,
  sideRenderer?: () => React.ReactNode,
};

const StatsCard = ({
  value, deltaValue, change, valueType = 'number',
  duration = 2000, roundFrom, bottomRenderer, sideRenderer,
  id, className, valueClassName, labels, icon,
}: StatsCardProps) => {
  const valueString = useCountUp(0, value, duration, valueType, roundFrom);
  const deltaString = (typeof deltaValue === 'number') ? useCountUp(deltaValue < 0 ? Math.round(deltaValue + (2 * deltaValue)) : 0, deltaValue, duration, valueType, roundFrom) : '';

  const changeDirection = change ? change : (typeof deltaValue === 'number') ? deltaValue < 0 ? 'negative' : 'positive' : null;

  return (
    <Card id={id} className={className}>
      <div className="dsr-flex dsr-justify-between dsr-items-center">
        <div>
          <div className="dsr-flex dsr-items-end">
            {icon && (
              <div className="dsr-flex dsr-rounded dsr-mr-2">
                <Icon icon={icon} size={36} />
              </div>
            )}
            <div>
              {labels?.title ? (
                <div className="dsr-text-lg md:dsr-text-xl dsr-font-semibold">
                  {labels.title}
                </div>
              ) : null}
            </div>
          </div>
          {labels?.description ? (
            <p className="dsr-opacity-90 dsr-text-sm dsr-break-all">
              {labels.description}
            </p>
          ) : null}
          <div className="dsr-flex dsr-flex-col dsr-gap-1 dsr-mt-2">
            <div
              className={clsx([
                'dsr-flex dsr-gap-1 text-color dsr-text-2xl md:dsr-text-3xl lg:dsr-text-4xl dsr-font-bold', valueClassName,
              ])}
            >
              {valueString}
            </div>
            {(typeof deltaValue === 'number' || change) ? (
              <div
                className={clsx([
                  'dsr-flex dsr-items-center dsr-text-lg',
                  changeDirection ? changeDirection === 'positive' ? 'dsr-text-green-600 dark:dsr-text-green-500' : 'dsr-text-red-600 dark:dsr-text-red-500' : '',
                ])}
              >
                {changeDirection ? (
                  <Icon
                    icon={changeDirection === 'positive' ? 'chevron-up' : 'chevron-down'}
                    size={24}
                  />
                ) : null}
                {(typeof deltaValue === 'number') ? (
                  <div className="dsr-flex dsr-gap-2 dsr-font-semibold">{`${deltaString} ${labels.deltaLabel || ''}`}</div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        {typeof sideRenderer === 'function' ? (
          <div className="dsr-flex dsr-items-center">
            {sideRenderer()}
          </div>
        ) : null}
      </div>
      {typeof bottomRenderer === 'function' ? (
        <div className="dsr-mt-2">
          {bottomRenderer()}
        </div>
      ) : null}
    </Card>
  );
};

export default StatsCard;
