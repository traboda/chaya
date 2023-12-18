import { Meta, StoryObj } from '@storybook/react';

import { AccordionGroup, AccordionGroupProps } from '../../../src';

const meta: Meta<AccordionGroupProps> = {
  title: 'Components/Display/AccordionGroup',
  component: AccordionGroup,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<AccordionGroupProps>;

const items: AccordionGroupProps['items'] = [
  {
    title: 'What is Chaya UI?',
    text: 'Chaya UI is a React UI library that helps you build accessible and production-ready React components.',
  },
  {
    title: 'Is Chaya UI free?',
    text: 'Yes, Chaya UI is a free and open source library, licensed under the GNU License.',
  },
  {
    title: 'How do I use Chaya UI?',
    text: 'You can install Chaya UI using npm or yarn. Please check the installation instructions on the documentation.',
  },
  {
    title: 'Can I use Chaya UI with TypeScript?',
    text: 'Yes, Chaya UI is written in TypeScript and has full support for it.',
  },
];

export const Primary: Story = {
  args: {
    items,
  },
};

export const KeepExpanded: Story = {
  storyName: 'Keep Expanded',
  tags: ['unlisted'],
  args: {
    items,
    keepExpanded: true,
  },
};

export const NumberedSteps: Story = {
  storyName: 'Numbered Steps',
  args: {
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
  },
};