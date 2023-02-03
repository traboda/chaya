import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Button, ToolTip } from '../index';

const meta: Meta = {
  title: 'Content Handlers/ToolTip',
  component: ToolTip,
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

const Template: Story = args => (
    <div
        className="dsr-fixed dsr-top-1/2 dsr-left-0 dsr-w-full dsr-h-full"
    >
        <div className="dsr-fixed dsr-top-0 dsr-left-0">
            <ToolTip overlay={<div>Shows at the bottom of the button.</div>} {...args}>
                <Button className="text-white">Top Left</Button>
            </ToolTip>
        </div>
        <div className="dsr-fixed dsr-top-0 dsr-right-0">
            <ToolTip
                overlay={<div>Shows at the bottom of the button.</div>}
                {...args}
            >
                <Button className="text-white">Top Right</Button>
            </ToolTip>
        </div>
        <div className="dsr-fixed dsr-bottom-0 dsr-right-0">
            <ToolTip
                overlay={<div>Shows the content at the top of the button.</div>}
                {...args}
            >
                <Button className="text-white">Bottom Right</Button>
            </ToolTip>
        </div>
        <div className="dsr-fixed dsr-bottom-0 dsr-left-0">
            <ToolTip
                overlay={<div>Shows the content at the top of the button.</div>}
                {...args}
            >
                <Button className="text-white">Bottom Left</Button>
            </ToolTip>
        </div>
        <div className="dsr-fixed dsr-top-1/2 dsr-left-1/2">
            <ToolTip
                overlay={<div>Shows content at the top of the button.</div>}
                {...args}
            >
                <Button className="text-white">
                    Center
                </Button>
            </ToolTip>
        </div>

    </div>
);

export const Default = Template.bind({});

Default.args = {};
