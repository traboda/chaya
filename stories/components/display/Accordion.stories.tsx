import { Meta, StoryObj } from '@storybook/react-vite';

import Accordion from '../../../src/components/Accordion/Accordion';
import { AccordionProps } from '../../../src/components/Accordion/Accordion.types';

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
    children: 'Run `npm install chaya-ui` in your project directory.',
  },
};
