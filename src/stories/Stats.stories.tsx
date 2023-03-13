import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Stats } from '../index';

const meta: Meta = {
  title: 'Content Handlers/Stats',
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

const Template: Story = args => (
    // @ts-ignore
    <Stats {...args}>
        {args.children}
    </Stats>
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
    title: 'More Info',
    onClick: () => {},
    label: 'view more',
    link: '/',
  },
  duration: 35,
};
