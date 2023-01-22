import React from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';

import { Avatar } from '../index';
import ThemeContextDecorator from './ThemeContextDecorator';

addDecorator(ThemeContextDecorator);

const meta: Meta = {
  title: 'Basic Elements/Avatar',
  component: Avatar,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => (
    <div className="dsr-flex dsr-flex-col dar-justify-center dsr-items-center dsr-bg-gray-100 dsr-p-30" style={{ minHeight: '35vh' }}>
        {/*// @ts-ignore*/}
        <Avatar {...args} />
    </div>
);

export const UsernameOnly = Template.bind({
  args: {
    size: '70',
    alt: 'Lorem Ipsum',
  },
});

UsernameOnly.args = {
  size: '70',
  alt: 'Lorem Ipsum',
};

export const withProfileImage = Template.bind({});

withProfileImage.args = {
  size: 70,
  alt: 'Lorem Ipsum',
  src: 'https://images.unsplash.com/photo-1443926818681-717d074a57af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
};
