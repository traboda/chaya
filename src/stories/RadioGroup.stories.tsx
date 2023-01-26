import React, { useEffect, useState } from 'react';
import { addDecorator, Meta, Story } from '@storybook/react';

import RadioGroup from '../components/Radio/RadioGroup';

import ThemeContextDecorator from './ThemeContextDecorator';

addDecorator(ThemeContextDecorator);

const meta: Meta = {
  title: 'User Inputs/RadioGroup',
  component: RadioGroup,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => {
  const [value, setValue] = useState(args.value ?? null);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
      // @ts-ignore
      <RadioGroup {...args} value={value} onChange={setValue} />
  );
};

export const Default = Template.bind({});

Default.args = {
  value: {
    label: 'option 2',
    value: 'option-2',
  },
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

