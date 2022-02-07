import React from 'react';

import {addDecorator, Meta, Story} from '@storybook/react';
import { ToolTip } from '../src';

import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
      {story()}
    </ThemeContext>
));

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
    <div className="flex justify-center items-center" style={{ minHeight: '25vh' }}>
      <ToolTip
          children={<div className="text-white">Hover Here</div>}
          overlay={<div>Tool Tip</div>}
          {...args}
      />
    </div>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
