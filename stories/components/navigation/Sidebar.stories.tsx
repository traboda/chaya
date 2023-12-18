import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Sidebar, SidebarProps, VerticalNavigatorItemType } from '../../../src';

const meta: Meta = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    controls: { expanded: true },
  },
};

const Template: Story<SidebarProps> = args => {

  const [activeItem, setActiveItem] = React.useState(args?.navigationProps?.activeItem);

  return (
    <div className="dsr-flex dsr-flex-wrap dsr-mx-0">
      <div style={{ width: '280px' }} className="dsr-h-screen -dsr-m-4">
        <Sidebar
          className="dsr-h-full"
          key={JSON.stringify(args)}
          {...args}
          navigationProps={{
            ...args?.navigationProps,
            activeItem,
          }}
          topNavigationItems={[
            ...(args?.topNavigationItems ?? []).map((item: any) => ({
              ...item,
              onClick: () => setActiveItem(item.key),
              items: item?.items ? (item.items?.map((subItem: any) => ({
                ...subItem,
                onClick: () => setActiveItem(subItem.key),
              }))) : undefined,
            })),
          ]}
        />
      </div>
      <div className="dsr-w-auto">
        <ul className="dsr-list-none">
          {args.topNavigationItems?.map((item: any) => (
            <li key={item.key}>
              <button
                className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-4 dsr-block w-full dsr-text-left"
                onClick={() => setActiveItem(item.key)}
              >
                {item.label}
              </button>
              {item?.items?.map((subItem: any) => (
                <button
                  key={subItem.key}
                  className="dsr-text-sm dsr-font-semibold dsr-py-2 dsr-px-4 dsr-block w-full dsr-text-left"
                  onClick={() => setActiveItem(subItem.key)}
                >
                  {subItem.label}
                </button>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

};

const TOP_MENU_ITEMS: VerticalNavigatorItemType[] = [
  {
    key: 'DASHBOARD',
    label: 'Dashboard',
    icon: 'dashboard-line',
  },
  {
    key: 'Products',
    label: 'Products',
    icon: 'box-3-line',
  },
  {
    key: 'Orders',
    label: 'Orders',
    icon: 'stack-line',
  },
  {
    key: 'Analytics',
    label: 'Analytics',
    icon: 'stack-line',
    items: [
      {
        key: 'order-analytics',
        label: 'Order Analytics',
        icon: 'stack-line',
      },
      {
        key: 'product-analytics',
        label: 'Product Analytics',
        icon: 'stack-line',
      },
      {
        key: 'user-analytics',
        label: 'User Analytics',
        icon: 'stack-line',
      },
    ],
  },
  {
    key: 'Settings',
    label: 'Settings',
    icon: 'settings-line',
  },
];

const BOTTOM_MENU_ITEMS: VerticalNavigatorItemType[] = [
  {
    key: 'Upgrade',
    label: 'Upgrade',
    icon: 'bard-line',
  },
  {
    key: 'Help',
    label: 'Help',
    icon: 'questionnaire-line',
  },
  {
    key: 'Logout',
    label: 'Logout',
    icon: 'logout-box-line',
  },
];

export const Basic = Template.bind({});

Basic.args = {
  topNavigationItems: TOP_MENU_ITEMS,
  bottomNavigationItems: BOTTOM_MENU_ITEMS.filter((i) => i.key !== 'Logout'),
  navigationProps: {
    activeItem: 'user-analytics',
  },
  logoutButton: {
    link: '#',
    icon: 'logout-box-r-line text-3xl',
  },
  userProfile: {
    name: 'John Doe',
    avatar: {
      alt: 'John Doe',
    },
  },
  topRenderer: ({ isCollapsed }) => (
    <div className="dsr-text-4xl dsr-text-center dsr-font-semibold">
      {isCollapsed ? 'L' : 'Logo'}
    </div>
  ),
};

export const WithGroupedItems = Template.bind({});

WithGroupedItems.args = {
  topNavigationItems: TOP_MENU_ITEMS,
  bottomNavigationItems: BOTTOM_MENU_ITEMS.filter((i) => i.key !== 'Logout'),
  navigationGroups: [
    {
      title: 'Products',
      items: [
        {
          key: 'product-1',
          label: 'Product 1',
          icon: 'stack-line',
        },
        {
          key: 'product-2',
          label: 'Product 2',
          icon: 'stack-line',
        },
        {
          key: 'product-3',
          label: 'Product 3',
          icon: 'stack-line',
        },
      ],
    },
    {
      title: 'Orders',
      items: [
        {
          key: 'order-1',
          label: 'Order 1',
          icon: 'stack-line',
        },
        {
          key: 'order-2',
          label: 'Order 2',
          icon: 'stack-line',
        },
        {
          key: 'order-3',
          label: 'Order 3',
          icon: 'stack-line',
        },
      ],
    },
    {
      title: 'Analytics',
      items: [
        {
          key: 'order-analytics',
          label: 'Order Analytics',
          icon: 'stack-line',
        },
        {
          key: 'product-analytics',
          label: 'Product Analytics',
          icon: 'stack-line',
        },
        {
          key: 'g-user-analytics',
          label: 'User Analytics',
          icon: 'stack-line',
          items: [
            {
              key: 'user-analytics-1',
              label: 'User Analytics 1',
              icon: 'stack-line',
            },
            {
              key: 'user-analytics-2',
              label: 'User Analytics 2',
              icon: 'stack-line',
            },
            {
              key: 'user-analytics-3',
              label: 'User Analytics 3',
              icon: 'stack-line',
            },
          ],
        },
      ],
    },
  ],
  userProfile: {
    name: 'John Doe',
    avatar: {
      alt: 'John Doe',
    },
  },
  logoutButton: {
    link: '#',
    icon: 'logout-box-r-line text-3xl',
  },
  navigationProps: {
    activeItem: 'user-analytics',
  },
  topRenderer: ({ isCollapsed }) => (
    <div className="dsr-text-4xl dsr-text-center dsr-font-semibold">
      {isCollapsed ? 'L' : 'Logo'}
    </div>
  ),
};


export const Line = Template.bind({});

Line.args = {
  topNavigationItems: TOP_MENU_ITEMS,
  bottomNavigationItems: BOTTOM_MENU_ITEMS,
  navigationProps: {
    variant: 'line',
    activeItem: 'Settings',
  },
  topRenderer: ({ isCollapsed }) => (
    <div className="dsr-text-4xl dsr-text-center dsr-font-semibold">
      {isCollapsed ? 'L' : 'Logo'}
    </div>
  ),
};

export const Collapsed = Template.bind({});

Collapsed.args = {
  topNavigationItems: TOP_MENU_ITEMS,
  bottomNavigationItems: BOTTOM_MENU_ITEMS,
  isCollapsed: true,
};

export const CollapsedLineVariant = Template.bind({});

CollapsedLineVariant.args = {
  topNavigationItems: TOP_MENU_ITEMS,
  bottomNavigationItems: BOTTOM_MENU_ITEMS,
  isCollapsed: true,
  navigationProps: {
    variant: 'line',
    activeItem: 'Products',
  },
};



export default meta;
