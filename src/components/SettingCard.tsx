import React from 'react';

import clsx from 'clsx';

import mcs from '../utils/merge';

import Card from './Card';

export type SettingCardProps = {
  id?: string;
  className?: string;
  titleClassName?: string;
  labels: {
    title: string;
    description?: string | React.ReactElement;
  };
  isVertical?: boolean;
  children: React.ReactNode;
  subSettingRenderer?: () => React.ReactNode;
};

const SettingCard = ({
  id,
  className,
  labels,
  titleClassName,
  children,
  subSettingRenderer,
  isVertical = false,
}: SettingCardProps) => (
  <Card id={id} className={mcs(['setting-card w-full p-0', className])}>
    <div
      className={clsx(['mx-0 flex h-full', isVertical ? 'flex-col gap-2' : 'flex-row flex-wrap'])}
    >
      <div className={clsx(['w-full', !isVertical && 'p-1 md:w-3/4'])}>
        <div className={mcs(['setting-title text-lg font-semibold', titleClassName])}>
          {labels?.title}
        </div>
        {labels?.description && typeof labels?.description === 'string' ? (
          <p style={{ width: '600px', maxWidth: '100%' }} className="mt-0.5 text-sm opacity-80">
            {labels?.description}
          </p>
        ) : (
          labels.description
        )}
      </div>
      <div
        className={clsx([
          'block w-full',
          !isVertical && 'items-start justify-end p-1 md:flex md:w-1/4',
        ])}
      >
        <div>{children}</div>
      </div>
    </div>
    {typeof subSettingRenderer == 'function' ? (
      <div className="setting-subsection mt-3">{subSettingRenderer()}</div>
    ) : null}
  </Card>
);

export default SettingCard;
