import { Meta, StoryObj } from '@storybook/react';

import Accordion, { AccordionProps } from '../../../src/components/Accordion';

const meta: Meta<AccordionProps> = {
  title: 'Components/Display/Accordion',
  component: Accordion,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<AccordionProps>;

export const Primary: Story = {
  args: {
    title: 'How do you install ChayaUI?',
    text: 'Run `npm install chaya-ui` in your project directory.',
  },
};
