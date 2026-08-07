import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import Label, { LabelProps } from '../../../src/components/Label';

const meta: Meta<LabelProps> = {
  title: 'Components/Inputs/Label',
  component: Label,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<LabelProps>;

export const Primary: Story = {
  render: () => <Label>Email Address</Label>,
};

export const Required: Story = {
  render: () => <Label isRequired>Password</Label>,
};

export const WithTooltip: Story = {
  render: () => (
    <Label tooltip="We'll never share your email with anyone else.">
      Email Address
    </Label>
  ),
};

export const WithSidebar: Story = {
  render: () => (
    <Label sidebar={<span className="text-xs opacity-60">Optional</span>}>
      Phone Number
    </Label>
  ),
};

export const WithInput: Story = {
  render: () => (
    <div>
      <Label htmlFor="username" isRequired>Username</Label>
      <input
        id="username"
        type="text"
        className="mt-1 block w-full border dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-transparent dark:text-white dark:placeholder-gray-400"
        placeholder="Enter your username"
      />
    </div>
  ),
};
