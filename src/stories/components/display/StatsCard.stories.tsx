import React from 'react';
import { Meta, Story } from '@storybook/react';

import { StatsCard, StatsCardProps } from '../../../index';

const meta: Meta = {
  title: 'Components/Display/StatsCard',
  component: StatsCard,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};
export default meta;

const Template: Story<StatsCardProps> = args => (
  <StatsCard {...args} />
);

export const Default = Template.bind({});

Default.args = {
  value: 2345,
  deltaValue: 20,
  change: 'positive',
  labels: {
    title: 'Users',
    description: 'Total Users',
    deltaLabel: 'since last week',
  },
  icon: {
    icon: 'home',
    className: 'ri-home-line dsr-text-3xl',
  },
  duration: 2000,
};

const MultipleCardsTemplate: Story<StatsCardProps> = args => (
  <div className="dsr-flex dsr-flex-wrap dsr-mx-0">
    <div className="dsr-w-full md:dsr-w-1/3 dsr-p-4">
      <StatsCard
        {...args}
        labels={{
          title: 'Users',
          description: 'Total Users',
          deltaLabel: 'today',
        }}
        value={4834}
        deltaValue={20}
      />
    </div>
    <div className="dsr-w-full md:dsr-w-1/3 dsr-p-4">
      <StatsCard
        {...args}
        labels={{
          title: 'Revenue',
          description: 'Total Revenue',
        }}
        value={5132400}
        deltaValue={-20}
        valueType="currency"
        roundFrom={100000}
      />
    </div>
    <div className="dsr-w-full md:dsr-w-1/3 dsr-p-4">
      <StatsCard
        {...args}
        labels={{
          title: 'Profits',
          deltaLabel: 'since last week',
        }}
        value={132400}
        valueType="currency"
      />
    </div>
  </div>
);

export const MultipleCards = MultipleCardsTemplate.bind({});