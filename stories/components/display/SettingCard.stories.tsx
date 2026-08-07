import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import SettingCard, { SettingCardProps } from '../../../src/components/SettingCard';

const meta: Meta<SettingCardProps> = {
  title: 'Components/Display/SettingCard',
  component: SettingCard,
  parameters: {
    controls: { expanded: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj<SettingCardProps>;

export const Primary: Story = {
  render: () => (
    <SettingCard
      labels={{
        title: 'Email Notifications',
        description: 'Receive email notifications when someone mentions you or assigns you a task.',
      }}
    >
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" defaultChecked />
        <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
      </label>
    </SettingCard>
  ),
};

export const WithButton: Story = {
  render: () => (
    <SettingCard
      labels={{
        title: 'Two-Factor Authentication',
        description: 'Add an extra layer of security to your account by requiring a verification code.',
      }}
    >
      <button className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Enable
      </button>
    </SettingCard>
  ),
};

export const VerticalLayout: Story = {
  render: () => (
    <SettingCard
      isVertical
      labels={{
        title: 'Profile Bio',
        description: 'Write a short bio to tell others about yourself.',
      }}
    >
      <textarea
        className="w-full border dark:border-gray-600 rounded-lg p-2 text-sm bg-transparent dark:text-white dark:placeholder-gray-400"
        rows={3}
        placeholder="Tell us about yourself..."
        defaultValue="Software engineer passionate about building great products."
      />
    </SettingCard>
  ),
};

export const WithSubSettings: Story = {
  render: () => (
    <SettingCard
      labels={{
        title: 'Language & Region',
        description: 'Set your preferred language and regional format.',
      }}
      subSettingRenderer={() => (
        <div className="border-t pt-3 mt-1 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Date Format</span>
            <span className="text-sm opacity-70">DD/MM/YYYY</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Timezone</span>
            <span className="text-sm opacity-70">UTC+5:30</span>
          </div>
        </div>
      )}
    >
      <select className="border dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-transparent dark:text-white">
        <option>English</option>
        <option>Spanish</option>
        <option>French</option>
      </select>
    </SettingCard>
  ),
};

export const SettingsPage: Story = {
  render: () => (
    <div className="space-y-4 max-w-3xl">
      <SettingCard
        labels={{
          title: 'Display Name',
          description: 'Your public display name visible to other users.',
        }}
      >
        <input
          type="text"
          className="border dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-transparent dark:text-white dark:placeholder-gray-400"
          defaultValue="John Doe"
        />
      </SettingCard>
      <SettingCard
        labels={{
          title: 'Email Notifications',
          description: 'Get notified about important updates.',
        }}
      >
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
        </label>
      </SettingCard>
      <SettingCard
        labels={{
          title: 'Delete Account',
          description: 'Permanently delete your account and all associated data. This action cannot be undone.',
        }}
      >
        <button className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete
        </button>
      </SettingCard>
    </div>
  ),
};
