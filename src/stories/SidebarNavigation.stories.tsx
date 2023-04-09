import React from 'react';
import { Meta, Story } from '@storybook/react';

import { SidebarNavigation } from '../index';

const meta: Meta = {
  title: 'Layouts/Sidebar Navigation',
  component: SidebarNavigation,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    onSubmit: { action: 'select' },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;


const Template: Story = args => (
  <div style={{ width: '280px' }}>
    <SidebarNavigation key={JSON.stringify(args)} items={args?.items} {...args} />
  </div>
);

export const Basic = Template.bind({});

Basic.args = {
  activeItem: 'third-second',
  items: [
    {
      key: 'DASHBOARD',
      name: 'Dashboard',
      link: '/',
      icon: 'home',
    },
    {
      key: 'CHALLENGES',
      name: 'Challenges',
      link: '/',
      icon: 'home',
    },
    {
      key: 'settings',
      name: 'Settings',
      link: '/',
      icon: 'settings',
      items: [
        {
          key: 'third-first',
          name: 'First',
          link: '/',
          icon: 'home',
        },
        {
          key: 'third-second',
          name: 'Second',
          link: '/',
          icon: 'home',
        },
      ],
    },
    {
      key: 'fourth',
      name: 'Fourth',
      link: '/',
      icon: 'home',
    },
  ],
};
