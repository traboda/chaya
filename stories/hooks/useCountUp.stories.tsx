import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import useCountUp from '../../src/hooks/useCountUp';

const meta: Meta = {
  title: 'Hooks/useCountUp',
};

export default meta;

type Story = StoryObj;

const CountUpDemo = ({ min, max, label }: { min: number; max: number; label: string }) => {
  const value = useCountUp(min, max, 2000, 'number');
  return (
    <div className="flex flex-col items-center rounded border p-4">
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm opacity-60">{label}</span>
    </div>
  );
};

const CurrencyCountUpDemo = () => {
  const value = useCountUp(0, 50000, 2000, 'currency');
  return (
    <div className="flex flex-col items-center rounded border p-4">
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm opacity-60">Revenue</span>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-semibold">Animated count up (refreshes on mount)</div>
      <div className="flex gap-4">
        <CountUpDemo min={0} max={1500} label="Users" />
        <CountUpDemo min={0} max={320} label="Orders" />
        <CurrencyCountUpDemo />
      </div>
    </div>
  ),
};
