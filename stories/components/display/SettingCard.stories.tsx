import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import SettingCard, { SettingCardProps } from '../../../src/components/SettingCard';
import Switch from '../../../src/components/Switch';
import TextInput from '../../../src/components/TextInput';

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
      <label className="inline-flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" defaultChecked />
        <div className="peer relative h-6 w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full" />
      </label>
    </SettingCard>
  ),
};

export const WithSwitch: Story = {
  render: () => {
    const [value, setValue] = useState(true);
    return (
      <SettingCard
        labels={{
          title: 'Email Notifications',
          description: 'Receive email notifications when someone mentions you.',
        }}
      >
        <Switch value={value} onChange={setValue} />
      </SettingCard>
    );
  },
};

export const WithTextInput: Story = {
  render: () => {
    const [value, setValue] = useState('John Doe');
    return (
      <SettingCard
        labels={{
          title: 'Display Name',
          description: 'Your public display name visible to other users.',
        }}
      >
        <TextInput label="Name" name="name" value={value} onChange={setValue} hideLabel />
      </SettingCard>
    );
  },
};

export const WithButton: Story = {
  render: () => (
    <SettingCard
      labels={{
        title: 'Two-Factor Authentication',
        description:
          'Add an extra layer of security to your account by requiring a verification code.',
      }}
    >
      <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
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
        className="w-full rounded-lg border bg-transparent p-2 text-sm dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
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
        <div className="mt-1 space-y-3 border-t pt-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Date Format</span>
            <span className="text-sm opacity-70">DD/MM/YYYY</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Timezone</span>
            <span className="text-sm opacity-70">UTC+5:30</span>
          </div>
        </div>
      )}
    >
      <select className="rounded-lg border bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:text-white">
        <option>English</option>
        <option>Spanish</option>
        <option>French</option>
      </select>
    </SettingCard>
  ),
};

export const SettingsPage: Story = {
  render: () => (
    <div className="max-w-3xl space-y-4">
      <SettingCard
        labels={{
          title: 'Display Name',
          description: 'Your public display name visible to other users.',
        }}
      >
        <input
          type="text"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
          defaultValue="John Doe"
        />
      </SettingCard>
      <SettingCard
        labels={{
          title: 'Email Notifications',
          description: 'Get notified about important updates.',
        }}
      >
        <label className="inline-flex cursor-pointer items-center">
          <input type="checkbox" className="peer sr-only" defaultChecked />
          <div className="peer relative h-6 w-11 rounded-full bg-gray-300 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full" />
        </label>
      </SettingCard>
      <SettingCard
        labels={{
          title: 'Delete Account',
          description:
            'Permanently delete your account and all associated data. This action cannot be undone.',
        }}
      >
        <button className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">
          Delete
        </button>
      </SettingCard>
    </div>
  ),
};
