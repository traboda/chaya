import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import useCountDown from '../../src/hooks/useCountDown';

const meta: Meta = {
  title: 'Hooks/useCountDown',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const targetDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const [countdown] = useCountDown({ date: targetDate });

    return (
      <div className="flex flex-col gap-4">
        <div className="text-lg font-semibold">Countdown to 24 hours from now</div>
        <div className="flex gap-4">
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours },
            { label: 'Minutes', value: countdown.minutes },
            { label: 'Seconds', value: countdown.seconds },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center rounded border p-4">
              <span className="text-3xl font-bold">{value}</span>
              <span className="text-sm opacity-60">{label}</span>
            </div>
          ))}
        </div>
        <div className="text-sm opacity-60">
          {countdown.completed ? 'Countdown completed!' : `Total: ${countdown.total}ms remaining`}
        </div>
      </div>
    );
  },
};
