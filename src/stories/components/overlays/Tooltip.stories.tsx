import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Button, Tooltip } from '../../../index';
import { TooltipProps } from '../../../components/Tooltip';

const meta: Meta = {
  title: 'Overlays/Tooltip',
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
    className="dsr-fixed dsr-top-1/2 dsr-left-0 dsr-w-full dsr-h-full"
  >
    <div className="dsr-fixed dsr-top-0 dsr-left-0">
      <Tooltip {...args} overlay={<div>Shows at the bottom of the button.</div>} >
        <Button className="text-white">Top Left</Button>
      </Tooltip>
    </div>
    <div className="dsr-fixed dsr-top-0 dsr-right-0">
      <Tooltip
        {...args}
        overlay={<div>Shows at the bottom of the button.</div>}
      >
        <Button className="text-white">Top Right</Button>
      </Tooltip>
    </div>
    <div className="dsr-fixed dsr-bottom-0 dsr-right-0">
      <Tooltip
        {...args}
        overlay={<div>Shows the content at the top of the button.</div>}

      >
        <Button className="text-white">Bottom Right</Button>
      </Tooltip>
    </div>
    <div className="dsr-fixed dsr-bottom-0 dsr-left-0">
      <Tooltip
        {...args}
        overlay={<div>Shows the content at the top of the button.</div>}

      >
        <Button className="text-white">Bottom Left</Button>
      </Tooltip>
    </div>
    <div className="dsr-fixed dsr-top-1/2 dsr-left-1/2">
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
