import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { TabSwitcher } from "../src";

import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Tab Switcher',
    component: TabSwitcher,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => (
    // @ts-ignore
    <TabSwitcher {...args} />
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