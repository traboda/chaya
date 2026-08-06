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
  { key: 'dashboard', label: 'Dashboard', icon: 'ri-dashboard-line', link: '#', isActive: true },
  { key: 'projects', label: 'Projects', icon: 'ri-folder-line', link: '#' },
  { key: 'tasks', label: 'Tasks', icon: 'ri-task-line', link: '#' },
  { key: 'calendar', label: 'Calendar', icon: 'ri-calendar-line', link: '#' },
];

const bottomItems = [
  { key: 'settings', label: 'Settings', icon: 'ri-settings-3-line', link: '#' },
  { key: 'help', label: 'Help', icon: 'ri-question-line', link: '#' },
];

export const Primary: Story = {
  render: () => (
    <div style={{ height: '500px' }}>
      <Sidebar
        topNavigationItems={navItems}
        bottomNavigationItems={bottomItems}
        topRenderer={({ isCollapsed }) => (
          <div className="p-3 font-bold text-lg">
            {isCollapsed ? 'A' : 'App'}
          </div>
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
  tags: ['unlisted'],
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
          <div className="p-3 font-bold text-lg">
            {isCollapsed ? 'A' : 'App Name'}
          </div>
        )}
      />
    </div>
  ),
};

export const Collapsed: Story = {
  tags: ['unlisted'],
  render: () => (
    <div style={{ height: '500px' }}>
      <Sidebar
        isCollapsed
        topNavigationItems={navItems}
        bottomNavigationItems={bottomItems}
      />
    </div>
  ),
};
