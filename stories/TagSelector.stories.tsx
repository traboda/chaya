import React from 'react';

import {addDecorator, Meta, Story} from '@storybook/react';
import { TagSelector } from "../src";

import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'User Inputs/Tag Selector',
    component: TagSelector,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => (
    // @ts-ignore
    <TagSelector {...args} />
);

export const Default = Template.bind({});

Default.args = {
    options: [
        {
            label: 'Item 1',
            value: 'tab 1'
        },
        {
            label: 'Item 2',
            value: 'tab 2'
        },
        {
            label: 'Item 3',
            value: 'tab 3'
        },
        {
            label: 'Item 4',
            value: 'tab 4'
        }
    ]
};