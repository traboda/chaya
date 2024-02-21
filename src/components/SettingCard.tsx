import React from 'react';
import clsx from 'clsx';

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
  <Card id={id} className={clsx(['dsr-p-0 dsr-w-full setting-card', className])}>
    <div
      className={clsx([
        'dsr-flex dsr-h-full dsr-mx-0',
        isVertical ? 'dsr-flex-col dsr-gap-2' : 'dsr-flex-row dsr-flex-wrap',
      ])}
    >
      <div className={clsx(['dsr-w-full', !isVertical && 'md:dsr-w-3/4 dsr-p-1'])}>
        <div
          className={clsx([
            'dsr-text-lg dsr-font-semibold setting-title',
            titleClassName,
          ])}
        >
          {labels?.title}
        </div>
        {labels?.description &&
        typeof labels?.description === 'string' ? (
          <p style={{ width: '600px', maxWidth: '100%' }} className="dsr-mt-0.5 dsr-text-sm dsr-opacity-80">
            {labels?.description}
          </p>
          ) : labels.description}
      </div>
      <div
        className={clsx([
          'dsr-block dsr-w-full',
          !isVertical && 'md:dsr-flex md:dsr-w-1/4 dsr-p-1 dsr-items-start dsr-justify-end',
        ])}
      >
        <div>
          {children}
        </div>
      </div>
    </div>
    {typeof subSettingRenderer == 'function' ? (
      <div className="setting-subsection dsr-mt-3">
        {subSettingRenderer()}
      </div>
    ) : null}
  </Card>
);

export default SettingCard;