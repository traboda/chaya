import React, { ChangeEvent, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { useCounter } from '../src';

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
    <div className="flex flex-col justify-center items-center py-10" style={{ minHeight: '40vh' }}>
      <div className="pb-6">
        <p>
          Count:
          <span className="text-3xl bg-indigo-600 text-white p-3 rounded font-bold">{count}</span>
        </p>
      </div> 
      <div className="pb-6">
        <input
          type="number"
          value={intervalValue}
          onChange={handleChangeIntervalValue}
          className="border-2 border-gray-300 p-2 rounded"
        />
      </div>
      <div>
        <button className="bg-green-600 font-bold py-0 px-3 text-white rounded m-2" onClick={start}>start</button>
        <button className="bg-red-600 font-bold py-0 px-3 text-white rounded m-2" onClick={stop}>stop</button>
        <button className="bg-blue-600 font-bold py-0 px-3 text-white rounded m-2" onClick={reset}>reset</button>
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