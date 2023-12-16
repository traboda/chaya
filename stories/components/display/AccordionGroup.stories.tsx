import React from 'react';
import { Meta, Story } from '@storybook/react';

import { AccordionGroup } from '../../../src';
import { AccordionGroupProps } from '../../../src/components/AccordionGroup';

const meta: Meta = {
  title: 'Components/Display/AccordionGroup',
  component: AccordionGroup,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<AccordionGroupProps> = args => (
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

export const NumberedSteps = Template.bind({});

NumberedSteps.args = {
  numberItems: true,
  activeIndex: 2,
  items: [
    {
      title: 'Step 1',
      text: 'This is a text',
      isCompleted: true,
    },
    {
      title: 'Step 2 (Disabled)',
      isDisabled: true,
      isCompleted: true,
      text: 'This is a text',
    },
    {
      title: 'Step 3 (Active)',
      text: 'This is a text',
    },
    {
      title: 'Step 4 (Locked)',
      text: 'This is a text',
      isLocked: true,
    },
  ],
};