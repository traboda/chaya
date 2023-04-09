import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { Switch } from '../index';

const meta: Meta = {
  title: 'User Inputs/Switch',
  component: Switch,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => {
  const [value, setValue] = useState(args.value ?? false);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <Switch {...args} value={value} onChange={setValue} />
  );
};

export const Default = Template.bind({});

Default.args = {
  value: false,
  label: 'Do you want this?',
  isRequired: true,
};

export const Disabled = Template.bind({});

Disabled.args = {
  value: true,
  label: 'You cant change this. Want to try it?',
  isDisabled: true,
};

const SwitchBox = (props: any) => {
  const [value, setValue] = useState(props?.value ?? true);
  return (
    <Switch {...props} value={value} onChange={setValue} />
  );
};

const SwitchVariants: Story = args => (
  <div className="dsr-flex dsr-flex-wrap dsr-mx-0">
    <div className="dsr-w-1/3 p-2">
      <SwitchBox {...args} variant="success" />
    </div>
    <div className="dsr-w-1/3 dsr-p-2">
      <SwitchBox {...args} variant="warning" />
    </div>
    <div className="dsr-w-1/3 dsr-p-2">
      <SwitchBox {...args} variant="danger" />
    </div>
    <div className="dsr-w-1/3 dsr-p-2">
      <SwitchBox {...args} variant="primary" />
    </div>
    <div className="dsr-w-1/3 dsr-p-2">
      <SwitchBox {...args} variant="secondary" />
    </div>
    <div className="dsr-w-1/3 dsr-p-2">
      <SwitchBox {...args} variant="transparent" />
    </div>
  </div>
);

export const Variants = SwitchVariants.bind({});

Variants.args = {
  value: true,
  label: 'Do you want this?',
};


