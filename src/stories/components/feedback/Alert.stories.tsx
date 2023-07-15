import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Alert } from '../../../index';
import { AlertProps } from '../../../components/Alert';

const meta: Meta = {
  title: 'Feedback/Alert',
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

const TypesTemplate: Story<AlertProps> = args => (
  <div>
    <Alert
      {...args}
      title="Just letting you know that this is a default alert."
      className="dsr-my-2"
    />
    <Alert
      {...args}
      title="Your purchase is successful. Thank you for your purchase!"
      type="success"
      className="dsr-my-2"
    />
    <Alert
      {...args}
      title="Your subscription is about to expire. Please recharge to continue using our services."
      type="danger"
      className="dsr-my-2"
    />
    <Alert
      {...args}
      title="We have detected an unusual activity in your account. Review your account activity."
      type="warning"
      className="dsr-my-2"
    />
    <Alert
      {...args}
      title="We have launched a new region to deploy your application - Mumbai. Please check the documentation for more details."
      type="info"
      className="dsr-my-2"
    />
  </div>
);

TypesTemplate.args = {};
export const FilledTypes = TypesTemplate.bind({});

const OutlineTypesTemplate: Story<AlertProps> = args => (
  <div>
    <Alert
      {...args}
      variant="outline"
      title="Just letting you know that this is a default alert."
      className="dsr-my-2"
    />
    <Alert
      {...args}
      variant="outline"
      title="Your purchase is successful. Thank you for your purchase!"
      type="success"
      className="dsr-my-2"
    />
    <Alert
      {...args}
      variant="outline"
      title="Your subscription is about to expire. Please recharge to continue using our services."
      type="danger"
      className="dsr-my-2"
    />
    <Alert
      {...args}
      variant="outline"
      title="We have detected an unusual activity in your account. Review your account activity."
      type="warning"
      className="dsr-my-2"
    />
    <Alert
      {...args}
      variant="outline"
      title="We have launched a new region to deploy your application - Mumbai. Please check the documentation for more details."
      type="info"
      className="dsr-my-2"
    />
  </div>
);

OutlineTypesTemplate.args = {};

export const OutlinedTypes = OutlineTypesTemplate.bind({});

export const WithButton = Template.bind({});

WithButton.args = {
  title: 'Your account is about to expire. Renew your subscription now!',
  variant: 'filled',
  type: 'danger',
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
