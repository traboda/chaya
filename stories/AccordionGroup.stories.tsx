import React from 'react';

import { Meta, Story } from '@storybook/react';
import {AccordionGroup, Card} from '../src';
import ThemeContext from "../src/ThemeProvider";

const meta: Meta = {
    title: 'Content Handlers/Accordion Group',
    component: AccordionGroup,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => (
    // @ts-ignore
    <AccordionGroup {...args} />
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
    ]
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
    ]
};

const DarkVars: Story = args => (
    <ThemeContext isDarkTheme>
        <div style={{ padding: '1rem', background: '#333' }}>
            {/*// @ts-ignore*/}
            <AccordionGroup {...args} />
        </div>
    </ThemeContext>
);

export const DarkThemeVariants = DarkVars.bind({});


DarkThemeVariants.args = {
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