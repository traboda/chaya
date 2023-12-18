import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { VerticalNavigator, VerticalNavigatorProps, VerticalNavigatorItemType } from '../../../src';

const meta: Meta<VerticalNavigatorProps> = {
  title: 'Components/Navigation/VerticalNavigator',
  component: VerticalNavigator,
};

export default meta;

type Story = StoryObj<VerticalNavigatorProps>;

const defaultMenuItems: VerticalNavigatorItemType[] = [
  {
    key: 'DASHBOARD',
    label: 'Dashboard',
    icon: 'home',
  },
  {
    key: 'CHALLENGES',
    label: 'Challenges',
    icon: 'home',
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: 'settings',
    items: [
      {
        key: 'third-first',
        label: 'First',
        icon: 'home',
      },
      {
        key: 'third-second',
        label: 'Second',
        icon: 'home',
      },
    ],
  },
  {
    key: 'fourth',
    label: 'Fourth',
    icon: 'home',
  },
];

const DefaultTemplate = ({ items, activeItem: _active, ...args }: VerticalNavigatorProps) => {

  const [activeItem, setActiveItem] = React.useState(_active);

  return (
    <VerticalNavigator
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
    activeItem: 'third-second',
    onClickItem: () => {},
  },
  render: (args) => <DefaultTemplate {...args} />,
};

export const LineVariant: Story = {
  tags: ['unlisted'],
  storyName: 'Vertical Navigator Line Variant',
  args: {
    variant: 'line',
    items: defaultMenuItems,
    activeItem: 'third-second',
    onClickItem: () => {},
  },
  render: (args) => <DefaultTemplate {...args} />,
};

export const CollapsedVariant: Story = {
  tags: ['unlisted'],
  storyName: 'Vertical Navigator Collapsed Variant',
  args: {
    isCollapsed: true,
    items: defaultMenuItems,
    activeItem: 'CHALLENGES',
    onClickItem: () => {},
  },
  render: (args) => <DefaultTemplate {...args} />,
};

export const CollapsedLineVariant: Story = {
  tags: ['unlisted'],
  storyName: 'Vertical Navigator Collapsed Line Variant',
  args: {
    variant: 'line',
    isCollapsed: true,
    items: defaultMenuItems,
    activeItem: 'CHALLENGES',
    onClickItem: () => {},
  },
  render: (args) => <DefaultTemplate {...args} />,
};
