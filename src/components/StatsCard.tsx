'use client';
import React from 'react';

import clsx from 'clsx';

import useCountUp from '../hooks/useCountUp';
import mcs from '../utils/merge';

import Card from './Card';
import Icon, { IconInputType } from './Icon';

export type StatsCardProps = {
  value: number;
  deltaValue?: number;
  change?: 'positive' | 'negative';
  valueType?: 'currency' | 'number';

  labels: {
    deltaLabel?: string;
    title?: string;
    description?: string;
  };

  id?: string;
  className?: string;
  valueClassName?: string;

  icon?: IconInputType;
  duration?: number;
  roundFrom?: number | null;
  bottomRenderer?: () => React.ReactNode;
  sideRenderer?: () => React.ReactNode;
};

const StatsCard = ({
  value,
  deltaValue,
  change,
  valueType = 'number',
  duration = 2000,
  roundFrom,
  bottomRenderer,
  sideRenderer,
  id,
  className,
  valueClassName,
  labels,
  icon,
}: StatsCardProps) => {
  const valueString = useCountUp(0, value, duration, valueType, roundFrom);
  const deltaString =
    typeof deltaValue === 'number'
      ? useCountUp(
          deltaValue < 0 ? Math.round(deltaValue + 2 * deltaValue) : 0,
          deltaValue,
          duration,
          valueType,
          roundFrom
        )
      : '';

  const changeDirection = change
    ? change
    : typeof deltaValue === 'number'
      ? deltaValue < 0
        ? 'negative'
        : 'positive'
      : null;

  return (
    <Card id={id} className={className}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-end">
            {icon && (
              <div className="mr-2 flex rounded">
                <Icon icon={icon} size={36} />
              </div>
            )}
            <div>
              {labels?.title ? (
                <div className="text-lg font-semibold md:text-xl">{labels.title}</div>
              ) : null}
            </div>
          </div>
          {labels?.description ? (
            <p className="text-sm break-all opacity-90">{labels.description}</p>
          ) : null}
          <div className="mt-2 flex flex-col gap-1">
            <div
              className={mcs([
                'text-color flex gap-1 text-2xl font-bold md:text-3xl lg:text-4xl',
                valueClassName,
              ])}
            >
              {valueString}
            </div>
            {typeof deltaValue === 'number' || change ? (
              <div
                className={clsx([
                  'flex items-center text-lg',
                  changeDirection
                    ? changeDirection === 'positive'
                      ? 'text-green-600 dark:text-green-500'
                      : 'text-red-600 dark:text-red-500'
                    : '',
                ])}
              >
                {changeDirection ? (
                  <Icon
                    icon={changeDirection === 'positive' ? 'chevron-up' : 'chevron-down'}
                    size={24}
                  />
                ) : null}
                {typeof deltaValue === 'number' ? (
                  <div className="flex gap-2 font-semibold">{`${deltaString} ${labels.deltaLabel || ''}`}</div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        {typeof sideRenderer === 'function' ? (
          <div className="flex items-center">{sideRenderer()}</div>
        ) : null}
      </div>
      {typeof bottomRenderer === 'function' ? <div className="mt-2">{bottomRenderer()}</div> : null}
    </Card>
  );
};

export default StatsCard;
