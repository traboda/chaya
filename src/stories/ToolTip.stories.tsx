import React from 'react';
import { addDecorator, Meta, Story } from '@storybook/react';

import { Button, ToolTip } from '../index';

import ThemeContextDecorator from './ThemeContextDecorator';

addDecorator(ThemeContextDecorator);

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
        style={{ background: 'url(https://source.unsplash.com/random/1920x1080) center / cover no-repeat' }}
    >
        <div className="dsr-fixed dsr-top-0 dsr-left-0">
            <ToolTip overlay={<div>abcdefg</div>} {...args}>
                <Button className="text-white">Hover Top-Left</Button>
            </ToolTip>
        </div>
        <div className="dsr-fixed dsr-top-0 dsr-right-0">
            <ToolTip
                overlay={<div>abcdefg</div>}
                {...args}
            >
                <button className="text-white">Hover Here</button>
            </ToolTip>
        </div>
        <div className="dsr-fixed dsr-bottom-0 dsr-right-0">
            <ToolTip
                overlay={<div>abcdefg</div>}
                {...args}
            >
                <button>Hover Here</button>
            </ToolTip>
        </div>
        <div className="dsr-fixed dsr-bottom-0 dsr-left-0">
            <ToolTip
                children={<div className="text-white">Hover Here</div>}
                overlay={<div>Tool Tip</div>}
                {...args}
            />
        </div>
        <div className="dsr-fixed dsr-top-3/4 dsr-left-1/2">
            <ToolTip
                children={<div className="text-white">Hover Here</div>}
                overlay={<div>Tool Tip</div>}
                {...args}
            />
        </div>

    </div>
);

export const Default = Template.bind({});

Default.args = {};
