import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { SelectorButton } from '../src';
import ThemeContextDecorator from "../src/themeDecorator";

addDecorator(ThemeContextDecorator);

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


const Template: Story = args => (
    <div style={{ width: '220px' }}>
        {/*// @ts-ignore*/}
        <SelectorButton {...args} />
    </div>
);

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
