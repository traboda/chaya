import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import Spinner from '../../../src/components/Spinner';

const meta: Meta = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  args: {
    size: 'md',
  },
};

export const Sizes: Story = {
  tags: ['unlisted'],
  render: () => (
    <div className="flex items-end gap-6">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Spinner size={size} />
          <span className="text-xs opacity-60">{size}</span>
        </div>
      ))}
    </div>
  ),
};
