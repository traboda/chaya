import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import useCurrencyFormatter from '../../src/hooks/useCurrencyFormatter';

const meta: Meta = {
  title: 'Hooks/useCurrencyFormatter',
};

export default meta;

type Story = StoryObj;

const CurrencyDemo = () => {
  const format = useCurrencyFormatter();

  const examples = [
    { amount: 1234, currency: 'INR', label: 'Indian Rupee' },
    { amount: 5678.9, currency: 'USD', label: 'US Dollar' },
    { amount: 42000, currency: 'EUR', label: 'Euro' },
    { amount: 100000, currency: 'JPY', label: 'Japanese Yen' },
    { amount: 8500, currency: 'GBP', label: 'British Pound' },
  ];

  return (
    <div className="flex flex-col gap-2">
      {examples.map(({ amount, currency, label }) => (
        <div key={currency} className="flex items-center justify-between rounded border p-3">
          <span className="opacity-60">
            {label} ({currency})
          </span>
          <span className="font-mono font-semibold">{format(amount, currency)}</span>
        </div>
      ))}
    </div>
  );
};

export const Default: Story = {
  render: () => <CurrencyDemo />,
};
