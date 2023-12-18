import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import {
  HorizontalNavigator,
  HorizontalNavigatorProps,
  HorizontalNavigatorItemType,
} from '../../../src';

const meta: Meta<HorizontalNavigatorProps> = {
  title: 'Components/Navigation/HorizontalNavigator',
  component: HorizontalNavigator,
};

export default meta;

type Story = StoryObj<HorizontalNavigatorProps>;

const defaultMenuItems: HorizontalNavigatorItemType[] = [
  { key: 'ALL', label: 'All' },
  { key: 'OPENED', label: 'Opened' },
  { key: 'CLICKED', label: 'Clicked' },
  { key: 'BOUNCED', label: 'Bounced' },
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

const colorVariants: {
  color: HorizontalNavigatorProps['color'],
  label: string,
  activeItem: HorizontalNavigatorProps['activeItem'],
}[] = [
  { color: 'primary', label: 'Primary', activeItem: 'ALL' },
  { color: 'secondary', label: 'Secondary', activeItem: 'OPENED' },
  { color: 'warning', label: 'Warning', activeItem: 'CLICKED' },
  { color: 'danger', label: 'Danger', activeItem: 'BOUNCED' },
  { color: 'success', label: 'Success', activeItem: 'ALL' },
  { color: 'contrast', label: 'Contrast', activeItem: 'OPENED' },
  { color: 'shade', label: 'Shade', activeItem: 'CLICKED' },
  { color: 'black', label: 'Black', activeItem: 'BOUNCED' },
  { color: 'white', label: 'White', activeItem: 'ALL' },
];

const NavigatorVariants = ({ variant }: { variant: HorizontalNavigatorProps['variant'] }) => (
  <table
    className="dsr-flex dsr-flex-col dsr-items-start dsr-border-dashed dsr-border dsr-gap-2"
    style={{ padding: '5vh 5vw', borderColor: 'rgba(200, 200, 200, 0.8)', background: 'rgba(200, 200, 200, 0.15)' }}
  >
    {colorVariants.map(({ color, label, activeItem }) => (
      <tr className="dsr-flex dsr-flex-wrap dsr-mx-0 dsr-w-full">
        <td style={{ width: '30%' }} className="dsr-p-3 dsr-opacity-80 dsr-flex dsr-justify-end dsr-text-sm">{label}</td>
        <td style={{ width: '70%' }}>
          <DefaultTemplate items={defaultMenuItems} color={color} activeItem={activeItem} variant={variant} />
        </td>
      </tr>
    ))}
  </table>
);

export const PillColors: Story = {
  storyName: 'Pill Navigator Colors',
  tags: ['unlisted'],
  render: () => <NavigatorVariants variant="pill" />,
};

export const LineColors: Story = {
  storyName: 'Line Navigator Colors',
  tags: ['unlisted'],
  render: () => <NavigatorVariants variant="line" />,
};


const MENU_WITH_DISABLED_ITEMS: HorizontalNavigatorItemType[] = [
  {
    key: 'ALL',
    label: 'All',
  },
  {
    key: 'OPENED',
    label: 'Opened',
  },
  {
    key: 'DISABLED',
    label: 'Disabled',
    isDisabled: true,
  },
  {
    key: 'BOUNCED',
    label: 'Bounced',
  },
  {
    key: 'DISABLED_AGAIN',
    label: 'Disabled Again',
    isDisabled: true,
  },
];

export const DisabledItems: Story = {
  tags: ['unlisted'],
  storyName: 'Horizontal Navigator Disabled Items',
  args: {
    items: MENU_WITH_DISABLED_ITEMS,
    activeItem: 'OPENED',
  },
  render: (args) => <DefaultTemplate {...args} />,
};

export const DisabledLineItems: Story = {
  tags: ['unlisted'],
  storyName: 'Horizontal Line Navigator Disabled Items',
  args: {
    items: MENU_WITH_DISABLED_ITEMS,
    activeItem: 'OPENED',
    variant: 'line',
  },
  render: (args) => <DefaultTemplate {...args} />,
};

