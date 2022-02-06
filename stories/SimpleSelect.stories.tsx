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

export const Basic = Template.bind({});

let value;

Basic.args = {
    label: 'Category',
    required: true,
    value, onChange: v => value = v,
    options: [
        { label: 'Cryptography', value: 'crypto' },
        { label: 'Forensics', value: 'forensics' },
        { label: 'Pwn', value: 'pwn' },
        { label: 'Reversing', value: 'reversing' },
        { label: 'Web', value: 'web' },
    ]
};


export const SelectWithGroups: Story = args => {
    return (
        <ThemeContext>
            {/* @ts-ignore */}
            <SimpleSelect {...args} />
        </ThemeContext>
    );
}

let country;

SelectWithGroups.args = {
    label: 'Region',
    required: true,
    value: country, onChange: v => country = v,
    options: [
        {
            group: 'Asia',
            options: [
                { label: 'India', value: 'india'},
                { label: 'China', value: 'china' },
                { label: 'Japan', value: 'japan' },
                { label: 'Korea', value: 'korea' },
            ],
        },
        {
            group: 'Europe',
            options: [
                { label: 'France', value: 'france' },
                { label: 'Germany', value: 'germany' },
                { label: 'Italy', value: 'italy' },
                { label: 'Spain', value: 'spain' },
            ],
        }
    ]
};

