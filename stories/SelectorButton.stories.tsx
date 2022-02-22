import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { SelectorButton } from '../src';

import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'User Inputs/Selector Button',
    component: SelectorButton,
    argTypes: {
        children: {
            control: {
                type: 'text',
            },
        },
        onSubmit: { action: 'select' },
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

// @ts-ignore
const Template: Story = args => <SelectorButton {...args} />;

export const Basic = Template.bind({});

let value;

Basic.args = {
    labels: {
        label: 'Category',
        placeholder: 'Select a category',
    },
    required: true,
    value, onChange: v => value = v,
    options: [
        { label: 'Delete', value: 'DELETE' },
        { label: 'Publish', value: 'PUBLISH' },
        { label: 'Unpublish', value: 'UNPUBLISH' },
    ]
};
