// @ts-nocheck
import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Badge } from '../index';

const meta: Meta = {
  title: 'Basic Elements/Badge',
  component: Badge,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => (
    <div className="flex justify-center items-center">
        <Badge {...args}>
            Badge
        </Badge>
    </div>
);

export const Default = Template.bind({});


const Vars: Story = args => (
    <div className="flex flex-col justify-center items-center gap-4 py-4">
        <div className="flex gap-2">
            <Badge {...args} variant="solid" color="primary" />
            <Badge {...args} variant="solid" color="secondary" />
            <Badge {...args} variant="solid" color="success" />
            <Badge {...args} variant="solid" color="warning" />
            <Badge {...args} variant="solid" color="danger" />
            <Badge {...args} variant="solid" color="contrast" />
            <Badge {...args} variant="solid" color="shade" />
        </div>
        <div className="flex gap-2">
            <Badge {...args} variant="outline" color="primary" />
            <Badge {...args} variant="outline" color="secondary" />
            <Badge {...args} variant="outline" color="success" />
            <Badge {...args} variant="outline" color="warning" />
            <Badge {...args} variant="outline" color="danger" />
            <Badge {...args} variant="outline" color="contrast" />
            <Badge {...args} variant="outline" color="shade" />
        </div>

        <div className="flex gap-2">
            <Badge {...args} variant="minimal" color="primary" />
            <Badge {...args} variant="minimal" color="secondary" />
            <Badge {...args} variant="minimal" color="success" />
            <Badge {...args} variant="minimal" color="warning" />
            <Badge {...args} variant="minimal" color="danger" />
            <Badge {...args} variant="minimal" color="contrast" />
            <Badge {...args} variant="minimal" color="shade" />
        </div>

    </div>
);

export const ColorVariants = Vars.bind({});

ColorVariants.args = {
  children: 'Hey',
  size: 'md',
  style: { margin: '5px' },
};

const SizeVars: Story = args => (
    <div className="flex flex-col justify-center items-center gap-4 py-4" style={{ minHeight: '25vh' }}>
        <div>
            <Badge {...args} size="xs" />
            <Badge {...args} size="sm" />
            <Badge {...args} size="md" />
            <Badge {...args} size="lg" />
            <Badge {...args} size="xl" />
        </div>
    </div>
);

export const SizeVariants = SizeVars.bind({});

SizeVariants.args = {
  children: 'New',
  style: { margin: '5px' },
};