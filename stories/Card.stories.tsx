import React from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';
import { Card } from '../src';
import Button from "../src/components/Button";
import ThemeContextDecorator from "../src/themeDecorator";

addDecorator(ThemeContextDecorator);

const meta: Meta = {
    title: 'Basic Elements/Card',
    component: Card,
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

const Template: Story = args => (
    // @ts-ignore
    <Card {...args}>
        {args.children}
        <Card>
            <h1>Child Card</h1>
            <Card>
                <h1>Grand Child Card</h1>
            </Card>
        </Card>
    </Card>
);

export const Default = Template.bind({});

Default.args = {
    title: 'Hello World',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    className: 'm-10'
}

const DesignTemplate: Story = args => (
    // @ts-ignore
    <Card {...args}>
        {args.children}
        <Button className="mt-10" color="primary">Press here</Button>
    </Card>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Example_Design = DesignTemplate.bind({});

Example_Design.args = {
    title: 'Card Design',
    description: 'The following settings can be customized to make the card even more awesome.',
    className: 'bg-red-300 px-20 py-12 m-10',
    iconClassName: 'fas fa-address-card h-30 w-30'
};