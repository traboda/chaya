import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import useNumberFormatter from '../../src/hooks/useNumberFormatter';

const meta: Meta = {
  title: 'Hooks/useNumberFormatter',
};

export default meta;

type Story = StoryObj;

const NumberFormatterDemo = () => {
  const format = useNumberFormatter();
  const formatCompact = useNumberFormatter(10000);

  const numbers = [42, 1234, 56789, 1234567, 9876543210];

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-2 font-semibold">
        <span>Number</span>
        <span>Standard</span>
        <span>Compact (from 10K)</span>
      </div>
      {numbers.map((n) => (
        <div key={n} className="grid grid-cols-3 gap-2 rounded border p-3">
          <span className="font-mono opacity-60">{n}</span>
          <span className="font-mono">{format(n)}</span>
          <span className="font-mono">{formatCompact(n)}</span>
        </div>
      ))}
    </div>
  );
};

export const Default: Story = {
  render: () => <NumberFormatterDemo />,
};
