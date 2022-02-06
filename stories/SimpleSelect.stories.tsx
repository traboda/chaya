import React from 'react';

import { Meta, Story } from '@storybook/react';
import { SimpleSelect } from '../src';
import ThemeContext from "../src/ThemeProvider";

const meta: Meta = {
    title: 'SimpleSelect',
    component: SimpleSelect,
    argTypes: {
        children: {
            control: {
                type: 'text',
            },
        },
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => {
    return (
        <ThemeContext>
            {/* @ts-ignore */}
            <SimpleSelect {...args} />
        </ThemeContext>
    );
}

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

let value;

Default.args = {
    label: 'Options for you',
    required: true,
    value, onChange: v => value = v,
    options: [
        { label: 'First option', value: 'first' },
        { label: 'Second option', value: 'second' }
    ]
};
