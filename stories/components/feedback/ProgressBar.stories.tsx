import { Meta, StoryObj } from '@storybook/react-vite';

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

export const Striped: Story = {
  args: {
    value: 70,
    isStriped: true,
  },
};

export const Loading: Story = {
  args: {
    value: 45,
    isLoading: true,
  },
};
