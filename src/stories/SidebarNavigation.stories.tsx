import React from 'react';
import { addDecorator, Meta, Story } from '@storybook/react';

import { SidebarNavigation } from '../index';

import ThemeContextDecorator from './ThemeContextDecorator';

addDecorator(ThemeContextDecorator);

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
        {/*// @ts-ignore*/}
        <SidebarNavigation {...args} />
    </div>
);

export const Basic = Template.bind({});

Basic.args = {
  activeItem: 'third-second',
  items: [
    {
      key: 'first',
      name: 'First',
      link: '/',
      icon: 'home',
    },
    {
      key: 'second',
      name: 'Second',
      link: '/',
      icon: 'home',
    },
    {
      key: 'third',
      name: 'Third',
      link: '/',
      icon: 'home',
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
