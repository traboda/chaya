import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import CheckboxGroup, { CheckboxGroupProps } from '../../../src/components/CheckboxGroup';


const meta: Meta<CheckboxGroupProps<string>> = {
  title: 'Components/Inputs/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    controls: { expanded: true },
  },
};
export default meta;

type Story<Type> = StoryObj<CheckboxGroupProps<Type>>;


const options = [
  { label: 'Emirates', value: 'emirates' },
  { label: 'Qantas', value: 'qantas' },
  { label: 'Qatar Airways', value: 'qatar-airways' },
  { label: 'Singapore Airlines', value: 'singapore-airlines' },
  { label: 'Cathay Pacific', value: 'cathay-pacific' },
  { label: 'Virgin Atlantic', value: 'virgin-atlantic' },
];

const StoryTemplate = (args: Partial<CheckboxGroupProps<string>>) => {
  const [value, setValue] = useState(args.value ?? null);

  useEffect(() => {
    setValue(args.value || null);
  }, [args.value]);

  return (
    <CheckboxGroup {...args} options={args?.options || options} value={value ?? []} onChange={setValue} />
  );
};

export const Primary: Story<string> = {
  args: {
    options,
    label: 'Which airlines do you like?',
  },
  render: (args) => <StoryTemplate {...args} />,
};

export const HorizontalPrimary: Story<string> = {
  tags: ['unlisted'],
  args: {
    options,
    label: 'Which airlines do you like?',
    alignment: 'horizontal',
  },
  render: (args) => <StoryTemplate {...args} />,
};

export const Disabled: Story<string> = {
  tags: ['unlisted'],
  args: {
    options,
    label: 'Which airlines do you like?',
    isDisabled: true,
  },
  render: (args) => <StoryTemplate {...args} />,
};

export const OptionDisabled: Story<string> = {
  tags: ['unlisted'],
  args: {
    options: options.map(option => ({ ...option, isDisabled: option.value === 'emirates' })),
    label: 'Which airlines do you dislike?',
  },
  render: (args) => <StoryTemplate {...args} />,
};