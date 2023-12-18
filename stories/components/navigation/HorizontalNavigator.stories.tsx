import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { HorizontalNavigator, HorizontalNavigatorProps, HorizontalNavigatorItemType } from '../../../src';

const meta: Meta<HorizontalNavigatorProps> = {
  title: 'Components/Navigation/HorizontalNavigator',
  component: HorizontalNavigator,
};

export default meta;

type Story = StoryObj<HorizontalNavigatorProps>;

const defaultMenuItems: HorizontalNavigatorItemType[] = [
  {
    key: 'ALL',
    label: 'All',
  },
  {
    key: 'OPENED',
    label: 'Opened',
  },
  {
    key: 'CLICKED',
    label: 'Clicked',
  },
  {
    key: 'BOUNCED',
    label: 'Bounced',
  },
];

const DefaultTemplate = ({ items, activeItem: _active, ...args }: HorizontalNavigatorProps) => {

  const [activeItem, setActiveItem] = React.useState(_active);

  return (
    <HorizontalNavigator
      {...args}
      items={items}
      activeItem={activeItem}
      onClickItem={(key) => setActiveItem(key)}
    />
  );

};

export const Primary: Story = {
  args: {
    items: defaultMenuItems,
    activeItem: 'OPENED',
    onClickItem: () => {},
  },
  render: (args) => <DefaultTemplate {...args} />,
};

export const LineVariant: Story = {
  tags: ['unlisted'],
  storyName: 'Horizontal Navigator Line Variant',
  args: {
    items: defaultMenuItems,
    activeItem: 'OPENED',
    variant: 'line',
  },
  render: (args) => <DefaultTemplate {...args} />,
};
