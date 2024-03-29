import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Button, Tooltip } from '../../../src';
import { TooltipProps } from '../../../src/components/Tooltip';

const meta: Meta = {
  title: 'Components/Overlays/Tooltip',
  component: Tooltip,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    backgrounds: {},
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<TooltipProps> = args => (
  <div
    className="fixed top-1/2 left-0 w-full h-full"
  >
    <div className="fixed top-0 left-0">
      <Tooltip {...args} overlay={<div>Shows at the bottom of the button.</div>} >
        <Button className="text-white">Top Left</Button>
      </Tooltip>
    </div>
    <div className="fixed top-0 right-0">
      <Tooltip
        {...args}
        overlay={<div>Shows at the bottom of the button.</div>}
      >
        <Button className="text-white">Top Right</Button>
      </Tooltip>
    </div>
    <div className="fixed bottom-0 right-0">
      <Tooltip
        {...args}
        overlay={<div>Shows the content at the top of the button.</div>}

      >
        <Button className="text-white">Bottom Right</Button>
      </Tooltip>
    </div>
    <div className="fixed bottom-0 left-0">
      <Tooltip
        {...args}
        overlay={<div>Shows the content at the top of the button.</div>}

      >
        <Button className="text-white">Bottom Left</Button>
      </Tooltip>
    </div>
    <div className="fixed top-1/2 left-1/2">
      <Tooltip
        {...args}
        overlay={<div>Shows content at the top of the button.</div>}
      >
        <Button className="text-white">
          Center
        </Button>
      </Tooltip>
    </div>

  </div>
);

export const Default = Template.bind({});

Default.args = {};
