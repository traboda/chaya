import React from 'react';
import { Meta, Story } from '@storybook/react';

import { DropdownMenu } from '../../../index';
import { DropdownMenuProps } from '../../../components/DropdownMenu';

const meta: Meta = {
  title: 'Overlays/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DropdownMenuProps> = args => {
  return (
    <div className="dsr-flex dsr-pt-10 dsr-items-center dsr-flex-col" style={{ minHeight: '50vh' }}>
      <DropdownMenu {...args}>
        <button className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#000' }}>
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
    <div className="relative dsr-flex dsr-pt-10 dsr-items-center dsr-flex-col">
      <div className="dsr-fixed dsr-top-0 dsr-left-0 dsr-m-4">
        <DropdownMenu {...args} align="start">
          <button className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#000' }}>
            open
          </button>
        </DropdownMenu>
      </div>
      <div className="dsr-fixed dsr-top-0 dsr-right-0 dsr-m-4">
        <DropdownMenu {...args} align="end">
          <button className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#000' }}>
            open
          </button>
        </DropdownMenu>
      </div>
      <div className="dsr-fixed dsr-bottom-0 dsr-left-0 dsr-m-4">
        <DropdownMenu {...args} align="start" side="top">
          <button className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#000' }}>
            open
          </button>
        </DropdownMenu>
      </div>
      <div className="dsr-fixed dsr-bottom-0 dsr-right-0 dsr-m-4">
        <DropdownMenu {...args} align="end" side="top">
          <button className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#000' }}>
            open
          </button>
        </DropdownMenu>
      </div>
      <div className="dsr-fixed dsr-top-1/2 dsr-left-1/2 -dsr-translate-x-1/2 -dsr-translate-y-1/2">
        <DropdownMenu {...args} align="start">
          <button className="dsr-text-lg dsr-font-semibold dsr-py-2 dsr-px-3 dsr-rounded-lg" style={{ color: 'white', background: '#000' }}>
            open
          </button>
        </DropdownMenu>
      </div>
    </div>
  );
};

export const DynamicPosition = FiveCorners.bind({});

Default.args = DynamicPosition.args = {
  className: '',
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
      'className': 'dsr-bg-red-600/80 dsr-text-white',
      'link': '#/item/link',
    },
  ],
};
