import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import ProgressBar, { ProgressBarProps } from '../../../src/components/ProgressBar';

const meta: Meta<ProgressBarProps> = {
  title: 'Components/Feedback/ProgressBar',
  component: ProgressBar,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<ProgressBarProps>;

export const Primary: Story = {
  name: 'Story',
  args: {
    value: 65,
  },
};
