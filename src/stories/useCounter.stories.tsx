import React, { ChangeEvent, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { useCounter } from '../index';

const meta: Meta = {
  title: 'Hooks/useCounter',
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => {

  const [intervalValue, setIntervalValue] = useState<number>(500);
  const [count, { start, stop, reset }] = useCounter({
    initialValue: args.seconds,
    interval: args.interval,
    isIncrement: args.isIncrement,
  });

  const handleChangeIntervalValue = (event: ChangeEvent<HTMLInputElement>) => {
    setIntervalValue(Number(event.target.value));
  };
  return (
      <div className="dsr-flex dsr-flex-col dsr-justify-center dsr-items-center dsr-bg-gray-100 dsr-py-10" style={{ minHeight: '40vh' }}>
          <div className="dsr-pb-6">
              <p>
                  Count:
                  <span className="dsr-text-3xl dsr-bg-indigo-600 dsr-text-white dsr-p-3 dsr-rounded dsr-font-bold">{count}</span>
              </p>
          </div> 
          <div className="dsr-pb-6">
              <input
                  type="number"
                  value={intervalValue}
                  onChange={handleChangeIntervalValue}
                  className="dsr-border-2 dsr-border-gray-300 dsr-p-2 dsr-rounded"
              />
          </div>
          <div>
              <button className="dsr-bg-green-600 dsr-font-bold dsr-py-0 dsr-px-3 dsr-text-white dsr-rounded dsr-m-2" onClick={start}>start</button>
              <button className="dsr-bg-red-600 dsr-font-bold dsr-py-0 dsr-px-3 dsr-text-white dsr-rounded dsr-m-2" onClick={stop}>stop</button>
              <button className="dsr-bg-blue-600 dsr-font-bold dsr-py-0 dsr-px-3 dsr-text-white dsr-rounded dsr-m-2" onClick={reset}>reset</button>
          </div>
      </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  seconds: 60,
  interval: 1000,
  isIncrement: false,
};