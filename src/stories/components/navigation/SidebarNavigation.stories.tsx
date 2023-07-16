import React from 'react';
import { Meta, Story } from '@storybook/react';

import { SidebarNavigation } from '../../../index';
import { SidebarNavigationProps } from '../../../components/SidebarNavigation';

const meta: Meta = {
  title: 'Components/Navigation/SidebarNavigation',
  component: SidebarNavigation,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    onSubmit: { action: 'select' },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;


const Template: Story<SidebarNavigationProps> = args => {

  const [activeItem, setActiveItem] = React.useState(args?.activeItem);

  return (
    <div style={{ width: '280px' }}>
      <SidebarNavigation
        key={JSON.stringify(args)}
        {...args}
        items={args?.items.map((item: any) => ({
          ...item,
          onClick: () => setActiveItem(item.key),
          items: item?.items ? (item.items?.map((subItem: any) => ({
            ...subItem,
            onClick: () => setActiveItem(subItem.key),
          }))) : undefined,
        }))}
        activeItem={activeItem}
      />
    </div>
  );
};

const Items = [
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

export const Basic = Template.bind({});


Basic.args = {
  activeItem: 'third-second',
  items: Items,
};


export const LineVariant = Template.bind({});


LineVariant.args = {
  activeItem: 'third-second',
  variant: 'line',
  items: Items,
};