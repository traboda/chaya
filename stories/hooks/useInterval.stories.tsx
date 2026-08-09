import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import useInterval from '../../src/hooks/useInterval';

const meta: Meta = {
  title: 'Hooks/useInterval',
};

export default meta;

type Story = StoryObj;

const IntervalDemo = () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState<number | null>(1000);

  useInterval(() => setCount((c) => c + 1), delay);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center text-5xl font-bold">{count}</div>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setDelay(1000)}
          className="rounded border px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          1s interval
        </button>
        <button
          onClick={() => setDelay(500)}
          className="rounded border px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          500ms interval
        </button>
        <button
          onClick={() => setDelay(null)}
          className="rounded border px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Stop
        </button>
      </div>
      <div className="text-center text-sm opacity-60">
        Interval: {delay !== null ? `${delay}ms` : 'stopped'}
      </div>
    </div>
  );
};

export const Default: Story = {
  render: () => <IntervalDemo />,
};
