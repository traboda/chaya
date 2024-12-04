import { Meta, StoryObj } from '@storybook/react';

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
    numberItems: true,
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
