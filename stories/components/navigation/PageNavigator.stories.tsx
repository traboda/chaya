import { Meta, StoryObj } from '@storybook/react-vite';

import PageNavigator, { PageNavigatorProps } from '../../../src/components/PageNavigator';

const meta: Meta<PageNavigatorProps> = {
  title: 'Components/Navigation/PageNavigator',
  component: PageNavigator,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<PageNavigatorProps>;

export const Primary: Story = {
  args: {
    totalCount: 300,
    page: 3,
    itemsPerPage: 50,
    hideItemsPerPage: true,
  },
};

export const WithoutPages: Story = {
  args: {
    totalCount: 300,
    page: 3,
    itemsPerPage: 50,
    hideItemsPerPage: true,
    showPages: false,
  },
};

export const WithoutEdges: Story = {
  args: {
    totalCount: 300,
    page: 3,
    itemsPerPage: 50,
    hideItemsPerPage: true,
    showEdges: false,
  },
};

export const WithoutControls: Story = {
  args: {
    totalCount: 300,
    page: 3,
    itemsPerPage: 50,
    hideItemsPerPage: true,
    showControls: false,
  },
};
