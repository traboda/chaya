import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Card, Button } from '../../../src';
import { CardProps } from '../../../src/components/Card';

const meta: Meta = {
  title: 'Components/Display/Card',
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

const ChildPlaceholder = ({ className, text = 'Card Content Goes Here' }: { className?: string, text?: string }) => (
  <div className={`dsr-bg-gray-500/40 dsr-w-full dsr-h-[25vh] dsr-border-2 dsr-border-gray-400/80 dsr-flex dsr-justify-center dsr-items-center dsr-border-dashed ${className}`}>
    {text}
  </div>
);

const Template: Story<CardProps> = args => (
  <Card
    title="Card without any children"
    description="This is a card which does not have any children"
    sidebarRenderer={(
      <Button size="sm" className="dsr-w-full dsr-whitespace-nowrap" leftIcon="info">Learn More</Button>
    )}
    {...args}
  />
);

export const Default = Template.bind({});

Default.args = {
  title: 'Hello World',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  children: <ChildPlaceholder />,
};

const DesignTemplate: Story<CardProps> = args => (
  <Card {...args}>
    {args.children}
  </Card>
);

export const ShadedCard = DesignTemplate.bind({});

ShadedCard.args = {
  title: 'Card Design',
  description: 'The following settings can be customized to make the card even more awesome.',
  children: <ChildPlaceholder />,
};

export const OutlinedCard = DesignTemplate.bind({});

OutlinedCard.args = {
  title: 'Card Design',
  variant: 'outline',
  description: 'The following settings can be customized to make the card even more awesome.',
  children: <ChildPlaceholder />,
};

const WithChildCardsTemplate: Story<CardProps> = args => (
  <div>
    <Card title="Parent Card Title" {...args}>
      <ChildPlaceholder text="Parent card content goes here" className="!dsr-h-[10vh] dsr-mb-4" />
      {args.children}
      <Card
        description="Set start time and end time for the CTF, which will determine the duration in which the CTF will be active. This is the time when public challenges will be released to participants, when deployments can be accessed and flags can be submitted."
        sidebarRenderer={<Button size="sm" className="dsr-w-full dsr-whitespace-nowrap" leftIcon="info">Learn More</Button>}
        title="Child Title"
      >
        <ChildPlaceholder text="Child card content goes here" className="!dsr-h-[10vh] dsr-mb-4" />
        <Card className="dsr-mt-4" title="Grand child Title">
          <ChildPlaceholder text="Grand child card content goes here" className="!dsr-h-[10vh] dsr-mb-4" />
        </Card>
      </Card>
    </Card>
    <ChildPlaceholder text="Generic content outside card looks like this" className="!dsr-h-[10vh] dsr-mt-4" />
  </div>

);

export const WithChildren = WithChildCardsTemplate.bind({});