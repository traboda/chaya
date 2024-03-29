import React from 'react';
import clsx from 'clsx';

import mcs from '../utils/merge';

import Card from './Card';

export type SettingCardProps = {
  id?: string,
  className?: string,
  titleClassName?: string,
  labels: {
    title: string,
    description?: (string | React.ReactElement),
  },
  isVertical?: boolean,
  children: React.ReactNode,
  subSettingRenderer?: () => React.ReactNode,
};


const SettingCard = ({
  id, className, labels, titleClassName, children, subSettingRenderer, isVertical = false,
}: SettingCardProps) => (
  <Card id={id} className={mcs(['p-0 w-full setting-card', className])}>
    <div
      className={clsx([
        'flex h-full mx-0',
        isVertical ? 'flex-col gap-2' : 'flex-row flex-wrap',
      ])}
    >
      <div className={clsx(['w-full', !isVertical && 'md:w-3/4 p-1'])}>
        <div
          className={mcs([
            'text-lg font-semibold setting-title',
            titleClassName,
          ])}
        >
          {labels?.title}
        </div>
        {labels?.description &&
        typeof labels?.description === 'string' ? (
          <p style={{ width: '600px', maxWidth: '100%' }} className="mt-0.5 text-sm opacity-80">
            {labels?.description}
          </p>
          ) : labels.description}
      </div>
      <div
        className={clsx([
          'block w-full',
          !isVertical && 'md:flex md:w-1/4 p-1 items-start justify-end',
        ])}
      >
        <div>
          {children}
        </div>
      </div>
    </div>
    {typeof subSettingRenderer == 'function' ? (
      <div className="setting-subsection mt-3">
        {subSettingRenderer()}
      </div>
    ) : null}
  </Card>
);

export default SettingCard;