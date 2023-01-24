import React from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';
import ThemeContextDecorator from './ThemeContextDecorator';
import { Button, PageHeader } from '../index';


addDecorator(ThemeContextDecorator);

const meta: Meta = {
  title: 'Layouts/Page Header',
  component: PageHeader,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => (<PageHeader {...args} />);

export const Default = Template.bind({});

Default.args = {
  title: 'Hello World!',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aut consequuntur dignissimos.',
  breadcrumbItems: [
    {
      title: 'Page 1',
      link: '#/page1',
    },
    {
      title: 'Page 2',
      link: '#/page1/page2',
    },
  ],
};

const CustomTemplate: Story = args => (<PageHeader {...args} />);

export const CustomDesign = CustomTemplate.bind({});

CustomDesign.args = {
  title: 'Edit Profile',
  description: 'Update your profile details.',
  breadcrumbItems: [
    {
      title: 'Profile',
      link: '#/profile',
    },
    {
      title: 'Edit',
      link: '#/profile/edit',
    },
  ],
  className: 'dsr-bg-blue-700 dsr-text-white dsr-rounded-xl',
  headingClassName: 'dsr-border-l-8 dsr-border-green-400 dsr-pl-4',
  customRender: () => (
      <div className='dsr-flex dsr-flex-row dsr-items-center'>
          <div className='dsr-bg-white dsr-rounded dsr-py-1 dsr-cursor-pointer dsr-px-3 dsr-text-blue-900 dsr-font-bold dsr-border-2 dsr-border-blue-900'>Item 1</div>
          -
          <div className='dsr-bg-white dsr-rounded dsr-py-1 dsr-cursor-pointer dsr-px-3 dsr-text-blue-900 dsr-font-bold dsr-border-2 dsr-border-blue-900'>Item 2</div>
          -
          <div className='dsr-bg-white dsr-rounded dsr-py-1 dsr-cursor-pointer dsr-px-3 dsr-text-blue-900 dsr-font-bold dsr-border-2 dsr-border-blue-900'>Item 3</div>
      </div>),
  sidebarRenderer: () => (
      <div>
          <Button>Siderbar Button</Button>
      </div>
  ),
};
