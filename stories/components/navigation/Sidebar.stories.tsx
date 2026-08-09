import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import Sidebar from '../../../src/components/Sidebar';

const meta: Meta = {
  title: 'Components/Navigation/Sidebar',
  component: Sidebar,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj;

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', link: '#', isActive: true },
  { key: 'projects', label: 'Projects', icon: 'folder', link: '#' },
  { key: 'tasks', label: 'Tasks', icon: 'task', link: '#' },
  { key: 'calendar', label: 'Calendar', icon: 'calendar', link: '#' },
];

const bottomItems = [
  { key: 'settings', label: 'Settings', icon: 'settings-3', link: '#' },
  { key: 'help', label: 'Help', icon: 'question', link: '#' },
];

export const Primary: Story = {
  render: () => (
    <div style={{ height: '500px' }}>
      <Sidebar
        topNavigationItems={navItems}
        bottomNavigationItems={bottomItems}
        topRenderer={({ isCollapsed }) => (
          <div className="p-3 text-lg font-bold">{isCollapsed ? 'A' : 'App'}</div>
        )}
        userProfile={{
          name: 'John Doe',
        }}
      />
    </div>
  ),
};

export const WithGroups: Story = {
  name: 'With Navigation Groups',

  render: () => (
    <div style={{ height: '500px' }}>
      <Sidebar
        navigationGroups={[
          {
            title: 'Main',
            items: navItems,
          },
          {
            title: 'Settings',
            items: bottomItems,
          },
        ]}
        topRenderer={({ isCollapsed }) => (
          <div className="p-3 text-lg font-bold">{isCollapsed ? 'A' : 'App Name'}</div>
        )}
      />
    </div>
  ),
};

export const Line: Story = {
  render: () => (
    <div style={{ height: '500px' }}>
      <Sidebar
        topNavigationItems={navItems}
        bottomNavigationItems={bottomItems}
        navigationProps={{ variant: 'line' }}
        topRenderer={({ isCollapsed }) => (
          <div className="p-3 text-lg font-bold">{isCollapsed ? 'A' : 'App'}</div>
        )}
      />
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div style={{ height: '500px' }}>
      <Sidebar isCollapsed topNavigationItems={navItems} bottomNavigationItems={bottomItems} />
    </div>
  ),
};

export const CollapsedLineVariant: Story = {
  render: () => (
    <div style={{ height: '500px' }}>
      <Sidebar
        isCollapsed
        topNavigationItems={navItems}
        bottomNavigationItems={bottomItems}
        navigationProps={{ variant: 'line' }}
      />
    </div>
  ),
};
