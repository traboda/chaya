import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import Avatar, { AvatarProps } from '../../../src/components/Avatar';

const meta: Meta<AvatarProps> = {
  title: 'Components/Display/Avatar',
  component: Avatar,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj<AvatarProps>;

export const Primary: Story = {
  args: {
    alt: 'John Doe',
    src: 'https://i.pravatar.cc/150?u=johndoe',
    size: 64,
  },
};

export const Fallback: Story = {
  name: 'Fallback (No Image)',
  tags: ['unlisted'],
  args: {
    alt: 'Jane Smith',
    src: null,
    size: 64,
  },
};

export const Sizes: Story = {
  tags: ['unlisted'],
  render: () => (
    <div className="flex items-end gap-4">
      {[24, 32, 48, 64, 96].map((size) => (
        <Avatar key={size} alt="User" src={`https://i.pravatar.cc/150?u=size${size}`} size={size} />
      ))}
    </div>
  ),
};
