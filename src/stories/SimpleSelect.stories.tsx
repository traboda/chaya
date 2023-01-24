import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';

import { SimpleSelect } from '../index';

import ThemeContextDecorator from './ThemeContextDecorator';
addDecorator(ThemeContextDecorator);

const meta: Meta = {
  title: 'User Inputs/Simple Select',
  component: SimpleSelect,
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

// @ts-ignore
const Template: Story = args => <SimpleSelect {...args} />;

export const Basic = Template.bind({});

let value;

Basic.args = {
  labels: {
    label: 'Category',
    placeholder: 'Select a category',
  },
  required: true,
  value, onChange: (v: any) => value = v,
  options: [
    { label: 'Cryptography', value: 'crypto' },
    { label: 'Forensics', value: 'forensics' },
    { label: 'Pwn', value: 'pwn' },
    { label: 'Reversing', value: 'reversing' },
    { label: 'Web', value: 'web' },
  ],
};


export const SelectWithGroups: Story = Template;

let country;

SelectWithGroups.args = {
  labels: {
    label: 'Region',
    placeholder: 'Pick a Region',
  },
  required: true,
  value: country, onChange: (v: any) => country = v,
  options: [
    {
      group: 'Asia',
      options: [
        { label: 'India', value: 'india' },
        { label: 'China', value: 'china' },
        { label: 'Japan', value: 'japan' },
        { label: 'Korea', value: 'korea' },
      ],
    },
    {
      group: 'Europe',
      options: [
        { label: 'France', value: 'france' },
        { label: 'Germany', value: 'germany' },
        { label: 'Italy', value: 'italy' },
        { label: 'Spain', value: 'spain' },
      ],
    },
  ],
};

