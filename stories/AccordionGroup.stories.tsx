import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { AccordionGroup } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Accordion Group',
    component: AccordionGroup,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => (
    <div className="flex justify-center items-center bg-gray-200 w-full" style={{ minHeight: '95vh' }}>
        <AccordionGroup {...args} />
    </div>
);

export const Default = Template.bind({});

Default.args = {
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
    ],
    className: "w-72"
};


export const KeepExpanded = Template.bind({});

KeepExpanded.args = {
    keepExpanded: true,
    items: [
        {
            title: 'Item 1',
            text: 'This is a text',
            isOpen: true
        },
        {
            title: 'Item 21',
            text: 'This is a text'
        },
        {
            title: 'Item 31',
            text: 'This is a text',
            isOpen: true
        },
        {
            title: 'Item 41',
            text: 'This is a text'
        }
    ],
    className: 'md:w-3/4 sm:w-full lg:w-1/2',
    accordionClassName: 'bg-red-300'
};

export const Custmoized = Template.bind({});

Custmoized.args = {
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
    ],
    className: 'md:w-3/4 sm:w-full lg:w-1/2',
    titleClassName: 'text-red-400 bg-indigo-200',
    accordionClassName: 'bg-blue-800',
    bodyClassName: 'text-white'
};