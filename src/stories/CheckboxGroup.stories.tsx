import React, { useEffect, useState } from 'react';
import { addDecorator, Meta, Story } from '@storybook/react';

import { CheckboxGroup } from '../index';

import ThemeContextDecorator from './ThemeContextDecorator';

addDecorator(ThemeContextDecorator);

const meta: Meta = {
  title: 'User Inputs/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => {
  const [value, setValue] = useState(args.value ?? []);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
  // @ts-ignore
      <CheckboxGroup {...args} value={value} onChange={setValue} />
  );
};

export const Default = Template.bind({});

Default.args = {
  value: ['option-2', 'option-3'],
  options: [
    {
      label: 'option 1',
      value: 'option-1',
    },
    {
      label: 'option 2',
      value: 'option-2',
    },
    {
      label: 'option 3',
      value: 'option-3',
    },
    {
      label: 'option 4',
      value: 'option-4',
    },
    {
      label: 'option 5',
      value: 'option-5',
    },
  ],
};

