import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import Dropdown, { DropdownProps } from '../../../src/components/Dropdown';

const meta: Meta<DropdownProps> = {
  title: 'Components/Display/Dropdown',
  component: Dropdown,
  parameters: {
    controls: { expanded: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj<DropdownProps>;

const DropdownTemplate = ({
  align,
  side,
}: {
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      align={align}
      side={side}
      buttonRenderer={
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          Toggle Dropdown
        </button>
      }
    >
      <div className="min-w-[200px] p-2">
        <div className="cursor-pointer rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          Profile
        </div>
        <div className="cursor-pointer rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          Settings
        </div>
        <div className="cursor-pointer rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          Logout
        </div>
      </div>
    </Dropdown>
  );
};

export const Primary: Story = {
  render: () => <DropdownTemplate />,
};

export const AlignStart: Story = {
  render: () => <DropdownTemplate align="start" />,
};

export const AlignEnd: Story = {
  render: () => <DropdownTemplate align="end" />,
};

export const SideTop: Story = {
  render: () => (
    <div className="mt-48">
      <DropdownTemplate side="top" />
    </div>
  ),
};

export const FillTriggerWidth: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <div className="w-64">
        <Dropdown
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          fillTriggerWidth
          buttonRenderer={
            <button
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              Full Width Dropdown
            </button>
          }
        >
          <div className="p-2">
            <div className="cursor-pointer rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Option A
            </div>
            <div className="cursor-pointer rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Option B
            </div>
          </div>
        </Dropdown>
      </div>
    );
  },
};
