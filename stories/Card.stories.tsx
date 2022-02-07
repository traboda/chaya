import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { Card } from '../src';

import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

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

export const Default = Template.bind({});

Default.args = {
    title: 'Contest Settings',
    description: 'The following settings can be customized to make the contest even more awesome.'
};
