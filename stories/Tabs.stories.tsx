import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { Tabs } from "../src";
import ThemeContextDecorator from "../src/themeDecorator";

addDecorator(ThemeContextDecorator);

const meta: Meta = {
    title: 'Content Handlers/Tabs',
    component: Tabs,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => (
    // @ts-ignore
    <Tabs {...args} />
);

export const Default = Template.bind({});

Default.args = {
    items: [
        {
            label: 'Item 1',
            renderer: 'tab 1'
        },
        {
            label: 'Item 2',
            renderer: 'tab 2'
        },
        {
            label: 'Item 3',
            renderer: 'tab 3'
        },
        {
            label: 'Item 4',
            renderer: 'tab 4'
        }
    ]
};

export const Vertical = Template.bind({});

Vertical.args = {
    isVertical: true,
    items: [
        {
            label: 'Item 1',
            renderer: 'tab 1'
        },
        {
            label: 'Item 2',
            renderer: 'tab 2'
        },
        {
            label: 'Item 3',
            renderer: 'tab 3'
        },
        {
            label: 'Item 4',
            renderer: 'tab 4'
        }
    ]
};