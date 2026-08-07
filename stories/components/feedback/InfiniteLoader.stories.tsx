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
  render: () => (
    <InfiniteLoader
      canLoadMore
      isLoading={false}
      onLoadMore={() => {}}
    />
  ),
};

export const Loading: Story = {
  render: () => (
    <InfiniteLoader
      canLoadMore
      isLoading
      onLoadMore={() => {}}
    />
  ),
};

export const EndOfList: Story = {
  render: () => (
    <InfiniteLoader
      canLoadMore={false}
      isLoading={false}
      showEndOfListMessage
    />
  ),
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
        <div className="text-center py-4 opacity-60">
          <i className="ri-loader-4-line text-2xl animate-spin inline-block" />
          <p className="mt-2 text-sm">Fetching more results...</p>
        </div>
      )}
    />
  ),
};
