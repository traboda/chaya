import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { Alert } from '../index';
import ThemeContextDecorator from './ThemeContextDecorator';
addDecorator(ThemeContextDecorator);


const meta: Meta = {
  title: 'Content Handlers/Alert',
  component: Alert,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => <Alert {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Your account is about to expire. Renew your subscription now!',
  variant: 'filled',
  type: 'default',
};


export const WithButton = Template.bind({});

WithButton.args = {
  title: 'Your account is about to expire. Renew your subscription now!',
  variant: 'filled',
  type: 'warning',
  allowDismissal: true,
  primaryButton: {
    children: 'Renew',
    onClick: () => {
      alert('Renew clicked');
    },
  },
  secondaryButton: {
    children: 'Cancel',
    onClick: () => {
      alert('Cancel clicked');
    },
  },
};
