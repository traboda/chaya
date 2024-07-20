import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

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
    children: (
      <button type="button">
        Open Menu
      </button>
    ),
    options: [
      { link:'#/components', title:'Components' },
      { link:'#/components/navigation', title:'Navigation' },
      { link:'#/components/navigation/breadcrumb', title:'Breadcrumb' },
    ],
  },
  render: (story) => (
    <div className="flex justify-center">
      <DropdownMenu {...story} />
    </div>
  ),
};
