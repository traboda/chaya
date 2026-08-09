import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import useCounter from '../../src/hooks/useCounter';

const meta: Meta = {
  title: 'Hooks/useCounter',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [count, { start, stop, reset }] = useCounter({
      initialValue: 0,
      interval: 1000,
      isIncrement: true,
    });

    return (
      <div className="flex flex-col gap-4">
        <div className="text-center text-5xl font-bold">{count}</div>
        <div className="flex justify-center gap-2">
          <button
            onClick={start}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Start
          </button>
          <button
            onClick={stop}
            className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
          >
            Stop
          </button>
          <button
            onClick={reset}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>
    );
  },
};
