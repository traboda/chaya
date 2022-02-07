import React from 'react';

import { Meta, Story } from '@storybook/react';
import { Card } from '../src';

const meta: Meta = {
  title: 'Card',
  component: Card,
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
    <Card {...args}>
      <h1>Hello World</h1>
    </Card>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
    title: 'Contest Settings',
    description: 'The following settings can be customized to make the contest even more awesome.'
};
