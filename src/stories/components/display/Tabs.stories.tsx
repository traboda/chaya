import React from 'react';
import { Meta, Story, StoryObj } from '@storybook/react';

import { Tabs } from '../../../index';
import { TabsProps } from '../../../components/Tabs';

const meta: Meta = {
  title: 'Display/Tabs',
  component: Tabs,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<TabsProps> = args => (
  <Tabs {...args} />
);

const items = [
  {
    label: 'Item 1',
    renderer: 'tab 1',
    badge: 3,
  },
  {
    label: 'Item 2',
    renderer: 'tab 2',
    badge: 5,
  },
  {
    label: 'Item 3',
    renderer: 'tab 3',
  },
  {
    label: 'Item 4',
    renderer: 'tab 4',
  },
];

export const Default = Template.bind({});

Default.args = { items };

type StoryType = StoryObj<typeof Tabs>;

export const Mobile: StoryType = {
  name: 'Mobile View',
  args: {
    isVertical: true,
    items,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphoneSE',
    },
  },
};


Default.args = { items };


export const UnderlineVariant = Template.bind({});

UnderlineVariant.args = { items, variant: 'line' };

export const WithBadge = Template.bind({});
 
WithBadge.args = {
  items: items.map((i, index) => {
    return {
      ...i,
      badge: index * index,
    };
  }),
};

export const Vertical = Template.bind({});

Vertical.args = {
  isVertical: true,
  items,
  className: 'font-semibold',
};

export const VerticalUnderlineVariant = Template.bind({});

VerticalUnderlineVariant.args = {
  variant: 'line',
  isVertical: true,
  items,
};

export const WithBadgeVertical = Template.bind({});

WithBadgeVertical.args = {
  isVertical: true,
  ...WithBadge.args,
};