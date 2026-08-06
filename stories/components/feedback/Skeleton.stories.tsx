import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import SkeletonItem from '../../../src/components/SkeletonItem';

const meta: Meta = {
  title: 'Components/Feedback/Skeleton',
  component: SkeletonItem,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  args: {
    w: '200px',
    h: '20px',
  },
};

export const Variants: Story = {
  name: 'Wave vs Pulse',
  tags: ['unlisted'],
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm mb-2 opacity-60">Wave</p>
        <SkeletonItem variant="wave" w="100%" h="20px" />
      </div>
      <div>
        <p className="text-sm mb-2 opacity-60">Pulse</p>
        <SkeletonItem variant="pulse" w="100%" h="20px" />
      </div>
    </div>
  ),
};

export const CardSkeleton: Story = {
  name: 'Card Loading Skeleton',
  tags: ['unlisted'],
  render: () => (
    <div className="flex gap-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex flex-col gap-3 p-4 rounded-lg border border-gray-200 dark:border-neutral-700 w-64">
          <SkeletonItem w="100%" h="120px" />
          <SkeletonItem w="80%" h="16px" />
          <SkeletonItem w="60%" h="14px" />
          <div className="flex gap-2 items-center">
            <SkeletonItem circular w="32px" h="32px" />
            <SkeletonItem w="100px" h="14px" />
          </div>
        </div>
      ))}
    </div>
  ),
};
