import React from 'react';
import { Meta, Story, addDecorator } from '@storybook/react';

import { Card, Button } from '../index';

import ThemeContextDecorator from './ThemeContextDecorator';

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
  className: 'dsr-m-10',
};

const DesignTemplate: Story = args => (
    // @ts-ignore
    <Card {...args}>
        {args.children}
        <Button className="dsr-mt-10" color="primary">Press here</Button>
    </Card>
);

export const ShadedCard = DesignTemplate.bind({});

ShadedCard.args = {
  title: 'Card Design',
  description: 'The following settings can be customized to make the card even more awesome.',
  className: 'dsr-px-20 dsr-py-12 dsr-m-10',
};

export const OutlinedCard = DesignTemplate.bind({});

OutlinedCard.args = {
  title: 'Card Design',
  variant: 'outline',
  description: 'The following settings can be customized to make the card even more awesome.',
  className: 'dsr-px-20 dsr-py-12 dsr-m-10',
};