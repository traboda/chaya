import React from 'react';

import { Meta, Story } from '@storybook/react';
import { Accordion } from '../src';

const meta: Meta = {
    title: 'Accordion',
    component: Accordion,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => (
    // @ts-ignore
    <Accordion {...args} />
);

export const Default = Template.bind({});

Default.args = {
    titleClassName: 'bg-gray-200 p-3 rounded-xl',
    accordionClassName: 'bg-gray-100 rounded-xl mb-2 p-2',
    bodyClassName: 'p-3',
    items: [
        {
            title: 'Item 1',
            text: 'This is a text'
        },
        {
            title: 'Item 21',
            text: 'This is a text'
        },
        {
            title: 'Item 31',
            text: 'This is a text'
        },
        {
            title: 'Item 41',
            text: 'This is a text'
        }
    ]
};

