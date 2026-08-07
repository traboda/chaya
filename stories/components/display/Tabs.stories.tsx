import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import Tabs, { TabsProps } from '../../../src/components/Tabs';

const meta: Meta<TabsProps> = {
  title: 'Components/Display/Tabs',
  component: Tabs,
  parameters: {
    controls: { expanded: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj<TabsProps>;

const defaultItems = [
  {
    key: 'overview',
    label: 'Overview',
    icon: 'ri-home-line',
    renderer: (
      <div className="py-4">
        <p>Overview content goes here.</p>
      </div>
    ),
  },
  {
    key: 'activity',
    label: 'Activity',
    icon: 'ri-pulse-line',
    renderer: (
      <div className="py-4">
        <p>Recent activity and logs.</p>
      </div>
    ),
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: 'ri-settings-3-line',
    renderer: (
      <div className="py-4">
        <p>Configuration and preferences.</p>
      </div>
    ),
  },
  {
    key: 'members',
    label: 'Members',
    icon: 'ri-team-line',
    renderer: (
      <div className="py-4">
        <p>Team members and roles.</p>
      </div>
    ),
  },
  {
    key: 'billing',
    label: 'Billing',
    icon: 'ri-bank-card-line',
    renderer: (
      <div className="py-4">
        <p>Billing and invoices.</p>
      </div>
    ),
  },
];

export const Primary: Story = {
  render: () => <Tabs items={defaultItems} />,
};

export const LineVariant: Story = {
  render: () => <Tabs variant="line" items={defaultItems} />,
};

export const BoxedVariant: Story = {
  render: () => <Tabs variant="boxed" items={defaultItems} />,
};

export const WithBadges: Story = {
  render: () => (
    <Tabs
      variant="line"
      items={[
        {
          key: 'all',
          label: 'All',
          badge: '128',
          renderer: (
            <div className="py-4">
              <p>All items.</p>
            </div>
          ),
        },
        {
          key: 'active',
          label: 'Active',
          badge: '42',
          badgeProps: { color: 'success', variant: 'minimal' },
          renderer: (
            <div className="py-4">
              <p>Active items only.</p>
            </div>
          ),
        },
        {
          key: 'pending',
          label: 'Pending',
          badge: '7',
          badgeProps: { color: 'warning', variant: 'minimal' },
          renderer: (
            <div className="py-4">
              <p>Pending review.</p>
            </div>
          ),
        },
        {
          key: 'archived',
          label: 'Archived',
          badge: '79',
          badgeProps: { color: 'shade', variant: 'minimal' },
          renderer: (
            <div className="py-4">
              <p>Archived items.</p>
            </div>
          ),
        },
      ]}
    />
  ),
};

export const WithSolidBadges: Story = {
  render: () => (
    <Tabs
      variant="pill"
      badgeProps={{ variant: 'solid', size: 'sm' }}
      items={[
        {
          key: 'inbox',
          label: 'Inbox',
          icon: 'ri-inbox-line',
          badge: '12',
          badgeProps: { color: 'danger' },
          renderer: (
            <div className="py-4">
              <p>Unread messages.</p>
            </div>
          ),
        },
        {
          key: 'sent',
          label: 'Sent',
          icon: 'ri-send-plane-line',
          badge: '5',
          badgeProps: { color: 'primary' },
          renderer: (
            <div className="py-4">
              <p>Sent messages.</p>
            </div>
          ),
        },
        {
          key: 'drafts',
          label: 'Drafts',
          icon: 'ri-draft-line',
          badge: '3',
          badgeProps: { color: 'warning' },
          renderer: (
            <div className="py-4">
              <p>Saved drafts.</p>
            </div>
          ),
        },
        {
          key: 'spam',
          label: 'Spam',
          icon: 'ri-spam-line',
          badge: '99+',
          badgeProps: { color: 'shade' },
          renderer: (
            <div className="py-4">
              <p>Spam folder.</p>
            </div>
          ),
        },
      ]}
    />
  ),
};

export const WithOutlineBadges: Story = {
  render: () => (
    <Tabs
      variant="boxed"
      badgeProps={{ variant: 'outline', size: 'xs' }}
      items={[
        {
          key: 'open',
          label: 'Open',
          badge: '14',
          badgeProps: { color: 'success' },
          renderer: (
            <div className="py-4">
              <p>Open issues.</p>
            </div>
          ),
        },
        {
          key: 'in-progress',
          label: 'In Progress',
          badge: '6',
          badgeProps: { color: 'warning' },
          renderer: (
            <div className="py-4">
              <p>Work in progress.</p>
            </div>
          ),
        },
        {
          key: 'closed',
          label: 'Closed',
          badge: '231',
          badgeProps: { color: 'shade' },
          renderer: (
            <div className="py-4">
              <p>Closed issues.</p>
            </div>
          ),
        },
      ]}
    />
  ),
};

export const WithCircularBadges: Story = {
  render: () => (
    <Tabs
      variant="line"
      badgeProps={{ variant: 'solid', size: 'xs', circular: true }}
      items={[
        {
          key: 'notifications',
          label: 'Notifications',
          icon: 'ri-notification-line',
          badge: '3',
          badgeProps: { color: 'danger' },
          renderer: (
            <div className="py-4">
              <p>New notifications.</p>
            </div>
          ),
        },
        {
          key: 'updates',
          label: 'Updates',
          icon: 'ri-refresh-line',
          badge: '1',
          badgeProps: { color: 'primary' },
          renderer: (
            <div className="py-4">
              <p>System updates.</p>
            </div>
          ),
        },
        {
          key: 'alerts',
          label: 'Alerts',
          icon: 'ri-alarm-warning-line',
          badge: '8',
          badgeProps: { color: 'warning' },
          renderer: (
            <div className="py-4">
              <p>Active alerts.</p>
            </div>
          ),
        },
      ]}
    />
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs
      items={defaultItems.map((item) =>
        item.key === 'billing' ? { ...item, isDisabled: true } : item
      )}
    />
  ),
};

export const CenteredTabs: Story = {
  render: () => <Tabs alignCenter items={defaultItems} />,
};
