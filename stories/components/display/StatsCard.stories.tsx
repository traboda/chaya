import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import StatsCard, { StatsCardProps } from '../../../src/components/StatsCard';

const meta: Meta<StatsCardProps> = {
  title: 'Components/Display/StatsCard',
  component: StatsCard,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<StatsCardProps>;

export const Primary: Story = {
  render: () => (
    <StatsCard
      value={1245}
      labels={{ title: 'Total Users' }}
    />
  ),
};

export const WithDelta: Story = {
  render: () => (
    <StatsCard
      value={8420}
      deltaValue={320}
      labels={{ title: 'Revenue', deltaLabel: 'this month' }}
    />
  ),
};

export const NegativeChange: Story = {
  render: () => (
    <StatsCard
      value={342}
      deltaValue={-28}
      labels={{ title: 'Active Sessions', deltaLabel: 'since yesterday' }}
    />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <StatsCard
      value={5672}
      deltaValue={142}
      icon="ri-user-line"
      labels={{ title: 'Subscribers', description: 'Total active subscribers across all plans.' }}
    />
  ),
};

export const WithDescription: Story = {
  render: () => (
    <StatsCard
      value={99}
      labels={{
        title: 'Uptime',
        description: 'Percentage uptime over the last 30 days.',
      }}
      valueClassName="text-green-600"
    />
  ),
};

export const WithSideRenderer: Story = {
  render: () => (
    <StatsCard
      value={3200}
      deltaValue={150}
      labels={{ title: 'Orders', deltaLabel: 'this week' }}
      sideRenderer={() => (
        <div className="text-5xl opacity-20">
          <i className="ri-shopping-cart-line" />
        </div>
      )}
    />
  ),
};

export const WithBottomRenderer: Story = {
  render: () => (
    <StatsCard
      value={78}
      labels={{ title: 'Completion Rate', description: 'Average task completion rate.' }}
      bottomRenderer={() => (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }} />
        </div>
      )}
    />
  ),
};

export const CurrencyValue: Story = {
  render: () => (
    <StatsCard
      value={24500}
      deltaValue={1200}
      valueType="currency"
      icon="ri-money-dollar-circle-line"
      labels={{ title: 'Monthly Revenue', deltaLabel: 'vs last month' }}
    />
  ),
};

export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        value={1245}
        deltaValue={85}
        icon="ri-user-line"
        labels={{ title: 'Users' }}
      />
      <StatsCard
        value={342}
        deltaValue={-12}
        icon="ri-file-list-line"
        labels={{ title: 'Orders' }}
      />
      <StatsCard
        value={9800}
        deltaValue={450}
        valueType="currency"
        icon="ri-money-dollar-circle-line"
        labels={{ title: 'Revenue' }}
      />
    </div>
  ),
};
