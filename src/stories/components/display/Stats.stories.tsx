import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Stats } from '../../../index';
import { StatsProps } from '../../../components/Stats';

const meta: Meta = {
  title: 'Components/Display/Stats',
  component: Stats,
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

const Template: Story<StatsProps> = args => (
  <Stats {...args} />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Stats',
  value: 2345,
  valuePostfix: 789,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  change: 'positive',
  statsIcon: 'home',
  moreInfo: {
    onClick: () => {},
    label: 'view more',
    link: '/',
    isActive: false,
  },
  duration: 2000,
};
