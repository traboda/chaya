import React from 'react';
import { Meta, Story } from '@storybook/react';

import { AccordionGroup } from '../index';

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
      text: 'This is a text',
    },
    {
      title: 'Item 21',
      text: 'This is a text',
    },
    {
      title: 'Item 31',
      text: 'This is a text',
    },
    {
      title: 'Item 41',
      text: 'This is a text',
    },
  ],
};


export const KeepExpanded = Template.bind({});

KeepExpanded.args = {
  keepExpanded: true,
  items: [
    {
      title: 'Item 1',
      text: 'This is a text',
      isOpen: true,
    },
    {
      title: 'Item 21',
      text: 'This is a text',
    },
    {
      title: 'Item 31',
      text: 'This is a text',
      isOpen: true,
    },
    {
      title: 'Item 41',
      text: 'This is a text',
    },
  ],
};