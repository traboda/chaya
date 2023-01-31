import React from 'react';
import clsx from 'clsx';

import Count from '../hooks/useCountUp';

import Icon, { IconInputType } from './Icon';

export type StatsProps = {
  title?: string,
  description?: string,
  value: number,
  valuePostfix: number,
  statsIcon?: IconInputType,
  moreInfo?: { link: string, onClick: () => void, label: string },
  change?: 'positive' | 'negative' | null,

};

const Stats = ({
  title, description, value, valuePostfix, statsIcon, moreInfo, change,
}: StatsProps) => {
  const StatsValue = Count(value);
  const StatsValuePostfix = Count(valuePostfix);

  return (
      <div className="dsr-flex dsr-flex-col dsr-gap-3 dsr-rounded-lg dsr-p-6 dsr-bg-white dark:dsr-bg-neutral-800">
          <div className="dsr-flex dsr-items-center">
              <div className="dsr-flex dsr-rounded dsr-p-3 dsr-mr-4 dsr-bg-primary dsr-text-white">
                  {statsIcon ? <Icon icon={statsIcon} size={50} /> : null}
              </div>
              <div>
                  {title && <p className="dsr-block dsr-text-xl dsr-font-medium dsr-text-color">{title}</p>}
                  {description && (
                      <p className="dsr-block dsr-text-md dsr-font-medium dsr-text-gray-400 dsr-break-all">
                          {description}
                      </p>
                  )}
                  <div className="dsr-flex dsr-gap-2 ">
                      {value !== 0 && (
                          <div className="dsr-flex dsr-gap-1 text-color dsr-text-xl dsr-font-medium" >
                              {StatsValue}
                          </div>
                      )}
                      {valuePostfix !== 0 && (
                          <div
                              className={clsx([
                                'dsr-flex dsr-gap-1 dsr-items-center dsr-font-medium ',
                                value === 0 ? 'dsr-text-xl' : 'dsr-text-md',
                                change ? change === 'positive' ? 'dsr-text-green-500' : 'dsr-text-red-500' : '',
                              ])}
                          >
                              {change && (
                                  <Icon
                                      icon={change === 'positive' ? 'chevron-up' : 'chevron-down'}
                                      size={16}
                                  />
                              )}
                              <div className="dsr-flex dsr-gap-1">{StatsValuePostfix}</div>
                          </div>
                      )}
                  </div>
              </div>
          </div>
          <button
              className="dsr-flex dsr-gap-2 dsr-items-center dsr-mb-0 hover:dsr-text-gray-500 active:dsr-text-secondary"
              onClick={moreInfo?.onClick}
          >
              {moreInfo?.label}
              <Icon icon="chevron-down" size={16} />
          </button>
      </div>
  );
};
export default Stats;