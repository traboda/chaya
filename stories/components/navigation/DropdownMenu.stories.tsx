import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import DropdownMenu, { DropdownMenuProps } from '../../../src/components/DropdownMenu';

const meta: Meta<DropdownMenuProps> = {
  title: 'Components/Navigation/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    children: { control: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<DropdownMenuProps>;

export const Primary: Story = {
  args: {
    children: <button type="button">Open Menu</button>,
    options: [
      { link: '#/components', title: 'Components' },
      { link: '#/components/navigation', title: 'Navigation' },
      { link: '#/components/navigation/breadcrumb', title: 'Breadcrumb' },
    ],
  },
  render: (story) => (
    <div className="flex justify-center">
      <DropdownMenu {...story} />
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <div className="flex justify-center">
      <DropdownMenu
        options={[
          {
            title: 'Navigation',
            options: [
              { title: 'Breadcrumb', link: '#' },
              { title: 'Sidebar', link: '#' },
            ],
          },
          {
            title: 'Inputs',
            options: [
              { title: 'TextInput', link: '#' },
              { title: 'Switch', link: '#' },
            ],
          },
        ]}
      >
        <button type="button">Grouped Menu</button>
      </DropdownMenu>
    </div>
  ),
};

export const DynamicPosition: Story = {
  render: () => (
    <div className="flex justify-between" style={{ padding: '100px 0' }}>
      <DropdownMenu
        side="bottom"
        align="start"
        options={[
          { title: 'Option 1', link: '#' },
          { title: 'Option 2', link: '#' },
          { title: 'Option 3', link: '#' },
        ]}
      >
        <button type="button">Bottom Start</button>
      </DropdownMenu>
      <DropdownMenu
        side="top"
        align="end"
        options={[
          { title: 'Option 1', link: '#' },
          { title: 'Option 2', link: '#' },
          { title: 'Option 3', link: '#' },
        ]}
      >
        <button type="button">Top End</button>
      </DropdownMenu>
    </div>
  ),
};
