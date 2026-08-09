import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import CircularProgress, { CircularProgressProps } from '../../../src/components/CircularProgress';

const meta: Meta<CircularProgressProps> = {
  title: 'Components/Feedback/CircularProgress',
  component: CircularProgress,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj<CircularProgressProps>;

export const Primary: Story = {
  args: {
    value: 65,
    size: 'md',
  },
};

export const Sizes: Story = {
  tags: ['unlisted'],
  render: () => (
    <div className="flex items-end gap-6">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <CircularProgress value={70} size={size} />
          <span className="text-xs opacity-60">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Indeterminate: Story = {
  tags: ['unlisted'],
  args: {
    isIndeterminate: true,
    size: 'lg',
  },
};

export const Values: Story = {
  name: 'Different Values',
  tags: ['unlisted'],
  render: () => (
    <div className="flex items-center gap-6">
      {[0, 25, 50, 75, 100].map((value) => (
        <div key={value} className="flex flex-col items-center gap-2">
          <CircularProgress value={value} size="md" />
          <span className="text-xs opacity-60">{value}%</span>
        </div>
      ))}
    </div>
  ),
};
