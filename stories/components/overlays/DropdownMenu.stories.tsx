import React from 'react';
import { Meta, Story } from '@storybook/react';

import { DropdownMenu } from '../../../src';
import { DropdownMenuProps } from '../../../src/components/DropdownMenu';

const meta: Meta = {
  title: 'Components/Overlays/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DropdownMenuProps> = args => {
  return (
    <div className="flex pt-10 items-center flex-col" style={{ minHeight: '50vh' }}>
      <DropdownMenu {...args}>
        <button className="text-lg font-semibold py-2 px-3 rounded-lg" style={{ color: 'white', background: '#000' }}>
          open
        </button>
      </DropdownMenu>
    </div>
  );
};

export const Default = Template.bind({});
export const withGroups = Template.bind({});

withGroups.args = {
  options: [
    {
      options: [
        {
          title: 'View',
          icon: 'external-link',
          onClick: () => console.log('open viewer'),
        },
        {
          title: 'Edit',
          onClick: () => console.log('open editor'),
        },
      ],
    },
    {
      title: 'Advanced',
      icon: 'external-link',
      options: [
        {
          title: 'Item 2',
          onClick: () => console.log('clicked'),
        },
      ],
    },
    {
      title: 'Delete',
      onClick: () => console.log('delete'),
    },
  ],
};

const FiveCorners: Story<DropdownMenuProps> = args => {
  return (
    <div className="relative flex pt-10 items-center flex-col">
      <div className="fixed top-0 left-0 m-4">
        <DropdownMenu {...args} align="start">
          <button className="text-lg font-semibold py-2 px-3 rounded-lg" style={{ color: 'white', background: '#000' }}>
            open
          </button>
        </DropdownMenu>
      </div>
      <div className="fixed top-0 right-0 m-4">
        <DropdownMenu {...args} align="end">
          <button className="text-lg font-semibold py-2 px-3 rounded-lg" style={{ color: 'white', background: '#000' }}>
            open
          </button>
        </DropdownMenu>
      </div>
      <div className="fixed bottom-0 left-0 m-4">
        <DropdownMenu {...args} align="start" side="top">
          <button className="text-lg font-semibold py-2 px-3 rounded-lg" style={{ color: 'white', background: '#000' }}>
            open
          </button>
        </DropdownMenu>
      </div>
      <div className="fixed bottom-0 right-0 m-4">
        <DropdownMenu {...args} align="end" side="top">
          <button className="text-lg font-semibold py-2 px-3 rounded-lg" style={{ color: 'white', background: '#000' }}>
            open
          </button>
        </DropdownMenu>
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <DropdownMenu {...args} align="start">
          <button className="text-lg font-semibold py-2 px-3 rounded-lg" style={{ color: 'white', background: '#000' }}>
            open
          </button>
        </DropdownMenu>
      </div>
    </div>
  );
};

export const DynamicPosition = FiveCorners.bind({});

Default.args = DynamicPosition.args = {
  options: [
    {
      'icon': 'home',
      'title': 'Item 1 with click',
      onClick: () => {
        console.log('clicked');
      },
    },
    {
      'icon': 'settings',
      'title': 'Item 2 with link',
      'link': '#/item/link',
    },
    {
      'title': 'Item 3 with renderer',
      renderer: () => (
        <div>
          Custom renderer based component
        </div>
      ),
    },
    {
      'icon': 'bin',
      'title': 'Item 4 custom styling',
      'className': 'bg-red-600/80 text-white',
      'link': '#/item/link',
    },
  ],
};
