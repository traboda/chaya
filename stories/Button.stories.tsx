import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { Button } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
      {story()}
    </ThemeContext>
));

const meta: Meta = {
  title: 'Button',
  component: Button,
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

const Template: Story = args => <Button px={5} py={3} {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Hello World!'
};

