import React, { useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import {
  VerticalNavigator,
  VerticalNavigatorProps,
  VerticalNavigatorItemType,
} from '../../../src';

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
        key: 'THIRD_FIRST',
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
    key: 'FOURTH',
    label: 'Fourth',
    icon: 'home',
  },
];

const DefaultTemplate = ({ items, activeItem: _active, ...args }: VerticalNavigatorProps) => {

  const [activeItem, setActiveItem] = React.useState(_active);

  useEffect(() => {
    setActiveItem(_active);
  }, [_active]);

  return (
    <VerticalNavigator
      {...args}
      items={items}
      activeItem={activeItem}
      onClickItem={(key) => setActiveItem(key)}
      variant={args.variant}
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
    items: defaultMenuItems,
    activeItem: 'third-second',
    onClickItem: () => {},
    variant: 'line',
  },
  render: (args) => <DefaultTemplate {...args} />,
};

const colorVariants: {
  color: VerticalNavigatorProps['color'],
  label: string,
  activeItem: VerticalNavigatorProps['activeItem'],
}[] = [
  { color: 'primary', label: 'Primary', activeItem: 'DASHBOARD' },
  { color: 'secondary', label: 'Secondary', activeItem: 'CHALLENGES' },
  { color: 'warning', label: 'Warning', activeItem: 'THIRD_FIRST' },
  { color: 'danger', label: 'Danger', activeItem: 'FOURTH' },
  { color: 'success', label: 'Success', activeItem: 'CHALLENGES' },
  { color: 'contrast', label: 'Contrast', activeItem: 'DASHBOARD' },
  { color: 'shade', label: 'Shade', activeItem: 'THIRD_FIRST' },
  { color: 'black', label: 'Black', activeItem: 'FOURTH' },
  { color: 'white', label: 'White', activeItem: 'DASHBOARD' },
];

const NavigatorVariants = ({ variant }: { variant: VerticalNavigatorProps['variant'] }) => (
  <div
    className="dsr-flex dsr-flex-wrap dsr-mx-0 dsr-items-start dsr-justify-center dsr-border-dashed dsr-border"
    style={{ padding: '5vh 2.5vw', borderColor: 'rgba(200, 200, 200, 0.8)', background: 'rgba(200, 200, 200, 0.15)' }}
  >
    {colorVariants.map(({ color, label, activeItem }) => (
      <div className="dsr-w-1/3 dsr-text-left dsr-p-4">
        <div className="dsr-p-3 dsr-opacity-80 dsr-text-sm">{label}</div>
        <div
          className="dsr-border-2 dsr-border-dashed dsr-p-2"
          style={{
            background: 'rgba(200, 200, 200, 0.2)',
          }}
        >
          <DefaultTemplate items={defaultMenuItems} color={color} activeItem={activeItem} variant={variant} />
        </div>
      </div>
    ))}
  </div>
);

export const NavigatorPillColors: Story = {
  tags: ['unlisted'],
  storyName: 'Vertical Navigator Pill Colors',
  render: () => <NavigatorVariants variant="pill" />,
};

export const NavigatorLineColors: Story = {
  tags: ['unlisted'],
  storyName: 'Vertical Navigator Line Colors',
  render: () => <NavigatorVariants variant="line" />,
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
