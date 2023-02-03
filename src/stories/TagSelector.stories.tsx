import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { TagSelector } from '../index';

const meta: Meta = {
  title: 'User Inputs/Tag Selector',
  component: TagSelector,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => {
  const [value, setValue] = useState<string | string[]>(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
  // @ts-ignore
      <TagSelector {...args} value={value} onChange={setValue} />
  );
};

export const Default = Template.bind({});

const options = [
  {
    label: 'Item 1',
    value: 'tab 1',
  },
  {
    label: 'Item 2',
    value: 'tab 2',
  },
  {
    label: 'Item 3',
    value: 'tab 3',
  },
  {
    label: 'Item 4',
    value: 'tab 4',
  },
];

Default.args = {
  value: 'tab 2',
  options,
};

export const MultipleTags = Template.bind({});

MultipleTags.args = {
  value: ['tab 2', 'tab 4'],
  multiple: true,
  options,
};