import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import InfiniteLoader from '../../../src/components/InfiniteLoader';

const meta: Meta = {
  title: 'Components/Feedback/InfiniteLoader',
  component: InfiniteLoader,
  parameters: {
    controls: { expanded: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  render: () => <InfiniteLoader canLoadMore isLoading={false} onLoadMore={() => {}} />,
};

export const Loading: Story = {
  render: () => <InfiniteLoader canLoadMore isLoading onLoadMore={() => {}} />,
};

export const EndOfList: Story = {
  render: () => <InfiniteLoader canLoadMore={false} isLoading={false} showEndOfListMessage />,
};

export const CustomEndMessage: Story = {
  render: () => (
    <InfiniteLoader
      canLoadMore={false}
      isLoading={false}
      showEndOfListMessage
      labels={{ endOfList: 'No more items to display.' }}
    />
  ),
};

export const CustomRenderer: Story = {
  render: () => (
    <InfiniteLoader
      canLoadMore
      isLoading
      renderer={() => (
        <div className="py-4 text-center opacity-60">
          <i className="ri-loader-4-line inline-block animate-spin text-2xl" />
          <p className="mt-2 text-sm">Fetching more results...</p>
        </div>
      )}
    />
  ),
};
