import { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarProps } from '../../../src';


const meta: Meta<AvatarProps> = {
  title: 'Components/Display/Avatar',
  component: Avatar,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<AvatarProps>;

export const Primary: Story = {
  args: {
    size: 70,
    alt: 'John Doe',
    src: 'https://i.pravatar.cc/70',
  },
};

export const WithoutAvatar: Story = {
  tags: ['unlisted'],
  args: {
    alt: 'John Doe',
  },
};
