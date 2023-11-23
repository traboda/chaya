import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Sidebar, SidebarProps, SidebarNavigationItemType } from '../../../index';

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
      <div style={{ width: '280px' }}>
        <Sidebar
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

const TOP_MENU_ITEMS: SidebarNavigationItemType[] = [
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
    label: 'All Kind of Orders',
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

const BOTTOM_MENU_ITEMS: SidebarNavigationItemType[] = [
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
  bottomNavigationItems: BOTTOM_MENU_ITEMS,
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
