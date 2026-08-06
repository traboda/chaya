import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import Icon from '../../../src/components/Icon';

const meta: Meta = {
  title: 'Components/Display/Icon',
  component: Icon,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  args: {
    icon: 'ri-home-line',
    size: 24,
  },
};

export const Sizes: Story = {
  tags: ['unlisted'],
  render: () => (
    <div className="flex items-end gap-4">
      {[14, 18, 24, 32, 48].map(size => (
        <Icon key={size} icon="ri-star-fill" size={size} />
      ))}
    </div>
  ),
};

export const RemixIcons: Story = {
  name: 'Remix Icon Examples',
  tags: ['unlisted'],
  render: () => (
    <div className="flex flex-wrap gap-6 items-center">
      {[
        'ri-home-line', 'ri-settings-3-line', 'ri-user-line', 'ri-search-line',
        'ri-notification-line', 'ri-heart-fill', 'ri-star-fill', 'ri-delete-bin-line',
        'ri-edit-line', 'ri-check-line', 'ri-close-line', 'ri-arrow-right-line',
      ].map(icon => (
        <div key={icon} className="flex flex-col items-center gap-1">
          <Icon icon={icon} size={24} />
          <span className="text-xs opacity-60">{icon.replace('ri-', '').replace('-line', '').replace('-fill', '')}</span>
        </div>
      ))}
    </div>
  ),
};
