import React from 'react';

import { Meta, Story } from '@storybook/react';
import { ToolTip } from '../src';

const meta: Meta = {
  title: 'ToolTip',
  component: ToolTip,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => (
    <ToolTip
        children={<div style={{ color: 'white' }}>Hover Here</div>}
        overlay={<div>Tool Tip</div>}
        {...args}
    />
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
