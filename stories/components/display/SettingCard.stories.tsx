import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Switch, TextInput } from '../../../src';
import { SettingCardProps } from '../../../src/components/SettingCard';
import { SettingCard } from '../../../src';

const meta: Meta = {
  title: 'Components/Display/SettingCard',
  component: SettingCard,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<SettingCardProps> = args => (
  <div className="dsr-flex dsr-flex-col dar-justify-center dsr-items-center dsr-p-30">
    <SettingCard {...args}>
      {args?.children}
    </SettingCard>
  </div>
);

const SettingSwitch = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  return <Switch value={isEnabled} onChange={() => setIsEnabled(!isEnabled)} />;
};


export const WithSwitch = Template.bind({});

WithSwitch.args = {
  labels: {
    title: 'Enable Notifications',
    description: 'Receive notifications for new messages',
  },
  children: <SettingSwitch />,
};

export const WithTextInput = Template.bind({});

WithTextInput.args = {
  labels: {
    title: 'Username',
    description: 'Your username is used to login to your account',
  },
  children: (
    <TextInput hideLabel label="Username" name="username" value="" />
  ),
};


export const VerticalVariant = Template.bind({});

VerticalVariant.args = {
  labels: {
    title: 'Username',
    description: 'Your username is used to login to your account',
  },
  isVertical: true,
  children: (
    <TextInput hideLabel label="Username" name="username" value="" />
  ),
};


export const WithSubSetting = Template.bind({});


WithSubSetting.args = {
  labels: {
    title: 'Enable Notifications',
    description: 'Receive notifications for new messages',
  },
  children: <SettingSwitch />,
  subSettingRenderer: () => (
    <div>
      <TextInput hideLabel label="Username" name="username" value="" />
    </div>
  ),
};



