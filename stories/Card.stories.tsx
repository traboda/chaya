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

export const Shaded_Card = DesignTemplate.bind({});

Shaded_Card.args = {
    title: 'Card Design',
    description: 'The following settings can be customized to make the card even more awesome.',
    className: 'bg-red-300 px-20 py-12 m-10',
};

export const Bordered_Card = DesignTemplate.bind({});

Bordered_Card.args = {
    title: 'Card Design',
    variant: 'outline',
    description: 'The following settings can be customized to make the card even more awesome.',
    className: 'bg-red-300 px-20 py-12 m-10',
};