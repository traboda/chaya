import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import SkeletonItem, { SkeletonItemProps } from '../../../src/components/SkeletonItem';

const meta: Meta<SkeletonItemProps> = {
  title: 'Components/Feedback/SkeletonItem',
  component: SkeletonItem,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<SkeletonItemProps>;

export const Primary: Story = {
  render: () => <SkeletonItem w="200px" h="20px" />,
};

export const Circular: Story = {
  render: () => <SkeletonItem w="48px" h="48px" circular />,
};

export const PulseVariant: Story = {
  render: () => <SkeletonItem w="200px" h="20px" variant="pulse" />,
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3">
      <SkeletonItem w="100px" h="12px" />
      <SkeletonItem w="200px" h="16px" />
      <SkeletonItem w="300px" h="20px" />
      <SkeletonItem w="100%" h="24px" />
    </div>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="border rounded-lg p-4 max-w-sm space-y-3">
      <div className="flex items-center gap-3">
        <SkeletonItem w="40px" h="40px" circular />
        <div className="space-y-2 flex-1">
          <SkeletonItem w="60%" h="14px" />
          <SkeletonItem w="40%" h="12px" />
        </div>
      </div>
      <SkeletonItem w="100%" h="120px" />
      <SkeletonItem w="100%" h="14px" />
      <SkeletonItem w="80%" h="14px" />
    </div>
  ),
};
