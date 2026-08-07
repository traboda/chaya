import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import Banner, { BannerProps } from '../../../src/components/Banner';

const meta: Meta<BannerProps> = {
  title: 'Components/Display/Banner',
  component: Banner,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj<BannerProps>;

export const Primary: Story = {
  args: {
    text: 'This is a banner notification for important updates.',
    color: 'primary',
    position: 'inline',
  },
};

export const WithDismissal: Story = {
  tags: ['unlisted'],
  render: () => {
    const [visible, setVisible] = React.useState(true);
    if (!visible) return <button onClick={() => setVisible(true)}>Show Banner</button>;
    return (
      <Banner
        text="You can dismiss this banner."
        color="warning"
        position="inline"
        allowDismissal
        onClose={() => setVisible(false)}
      />
    );
  },
};

export const Colors: Story = {
  name: 'Color Variants',
  tags: ['unlisted'],
  render: () => (
    <div className="flex flex-col gap-3">
      <Banner text="Primary banner" color="primary" position="inline" />
      <Banner text="Secondary banner" color="secondary" position="inline" />
      <Banner text="Success banner" color="success" position="inline" />
      <Banner text="Warning banner" color="warning" position="inline" />
      <Banner text="Danger banner" color="danger" position="inline" />
    </div>
  ),
};

export const WithLearnMore: Story = {
  tags: ['unlisted'],
  args: {
    text: 'A new version is available.',
    color: 'primary',
    position: 'inline',
    learnMore: { link: '#', text: 'Learn more' },
  },
};
