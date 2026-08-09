import { Meta, StoryObj } from '@storybook/react-vite';

import AccordionGroup, { AccordionGroupProps } from '../../../src/components/AccordionGroup';

const meta: Meta<AccordionGroupProps> = {
  title: 'Components/Display/AccordionGroup',
  component: AccordionGroup,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<AccordionGroupProps>;

export const Primary: Story = {
  args: {
    items: [
      {
        title: 'What is Chaya?',
        text: 'Chaya is a React component library built with Tailwind CSS.',
      },
      {
        title: 'How do I install it?',
        text: 'Run `npm install chaya-ui` in your project directory.',
      },
      {
        title: 'How do I use it?',
        text: 'Wrap your application with `<ChayaProvider />` in your root component.',
      },
    ],
  },
};

export const NumberedSteps: Story = {
  args: {
    numberItems: true,
    activeIndex: 1,
    items: [
      {
        isCompleted: true,
        title: 'Install Chaya Package',
        text: 'Run `npm install chaya-ui` in your project directory.',
      },
      {
        title: 'Wrap with ChayaProvider',
        text: 'Wrap your application with `<ChayaProvider />` in your root component.',
      },
      {
        isLocked: true,
        title: 'Update Tailwind Config',
        text: 'Add `@import "chaya-ui";` to your `tailwind.config.js` file.',
      },
    ],
  },
};
