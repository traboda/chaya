import React, { useEffect, useState } from 'react';
import { addDecorator, Meta, Story } from '@storybook/react';

import { Switch } from '../index';

import ThemeContextDecorator from './ThemeContextDecorator';

addDecorator(ThemeContextDecorator);

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
  // @ts-ignore
      <Switch {...args} value={value} onChange={setValue} />
  );
};

export const Default = Template.bind({});

Default.args = {
  value: false,
  label: 'Do you want this?',
  required: true,
};

