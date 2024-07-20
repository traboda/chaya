import { Meta, StoryObj } from '@storybook/react';

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
