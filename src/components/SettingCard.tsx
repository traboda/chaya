'use client';

import React from 'react';
import clsx from 'clsx';

import Card from './Card';

export type SettingCardProps = {
  labels: {
    title: string,
    description?: (string | React.ReactElement),
  },
  children: React.ReactNode,
  className?: string,
  titleClassName?: string,
  id?: string,
  subSettingRenderer?: () => React.ReactNode,
};


const SettingCard = ({
  labels, children, id, className, subSettingRenderer, titleClassName,
}: SettingCardProps) => (
  <Card id={id} className={clsx(['dsr-p-2 dsr-w-full', className])}>
    <div className="dsr-flex dsr-flex-wrap dsr-h-full dsr-mx-0">
      <div className="dsr-w-full md:dsr-w-3/4 dsr-p-1">
        <div
          className={clsx([
            labels?.description ? 'dsr-text-xl dsr-font-semibold' : 'dsr-text-lg',
            titleClassName,
          ])}
        >
          {labels?.title}
        </div>
        {labels?.description &&
        typeof labels?.description === 'string' ? (
          <p style={{ width: '600px', maxWidth: '100%' }} className="dsr-mt-1 dsr-text-sm dsr-opacity-80">
            {labels?.description}
          </p>
          ) : labels.description}
      </div>
      <div className="dsr-block dsr-w-full md:dsr-w-1/4 md:dsr-flex dsr-mt-2 dsr-items-start dsr-justify-end">
        <div>
          {children}
        </div>
      </div>
    </div>
    {typeof subSettingRenderer == 'function' && subSettingRenderer()}
  </Card>
);

export default SettingCard;