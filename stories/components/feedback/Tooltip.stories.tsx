import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import Tooltip, { TooltipProps } from '../../../src/components/Tooltip';

const meta: Meta<TooltipProps> = {
  title: 'Components/Feedback/Tooltip',
  component: Tooltip,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    children: { control: { disable: true } },
    overlay: { control: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<TooltipProps>;

export const Primary: Story = {
  args: {
    overlay: (
      <div>
        Very Good
      </div>
    ),
    children: (
      <div>
        Hover for Tooltip
      </div>
    ),
  },
};

export const WithArrow: Story = {
  tags: ['unlisted'],
  args: {
    showArrow: true,
    overlay: (
      <div>
        Tooltip points to its trigger
      </div>
    ),
    children: (
      <div>
        Hover for Tooltip with Arrow
      </div>
    ),
  },
};