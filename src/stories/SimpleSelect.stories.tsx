import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { Card, SimpleSelect } from '../index';

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

const Template: Story = args => {
  const [value, setValue] = useState(args.value);
  return (
    <Card>
      {/*@ts-ignore*/}
      <SimpleSelect {...args} value={value} onChange={setValue} />
    </Card>
  );
};

const options = [
  { label: 'Cryptography 1', value: 'crypto1' },
  { label: 'Forensics 2', value: 'forensics2' },
  { label: 'Pwn 3', value: 'pwn3' },
  { label: 'Reversing 4', value: 'reversing4' },
  { label: 'Web 5', value: 'web5' },
  { label: 'Cryptography 6', value: 'crypto6' },
  { label: 'Forensics 7', value: 'forensics7' },
  { label: 'Pwn 8', value: 'pwn8' },
  { label: 'Reversing 9', value: 'reversing9' },
  { label: 'Web 10', value: 'web10' },
];

export const Basic = Template.bind({});

let value;

Basic.args = {
  labels: {
    label: 'Category',
    placeholder: 'Select a category',
  },
  isRequired: true,
  value, onChange: (v: any) => value = v,
  options,
};

export const MultiSelect = Template.bind({});

MultiSelect.args = {
  labels: {
    label: 'Category',
    placeholder: 'Select a category',
  },
  isMulti: true,
  isRequired: true,
  value: [],
  options,
};


export const SelectWithGroups: Story = Template;

let country;

SelectWithGroups.args = {
  labels: {
    label: 'Region',
    placeholder: 'Pick a Region',
  },
  isRequired: true,
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

const VariantsTemplate: Story = args => {
  const [value, setValue] = useState(args.value);
  return (
    <Card> 
      {/*@ts-ignore*/}
      <SimpleSelect {...args} value={value} onChange={setValue} variant="comma" />

      <div className="dsr-mt-4"></div>

      {/*@ts-ignore*/}
      <SimpleSelect {...args} value={value} onChange={setValue} variant="chip" />
    </Card>
  );
};

export const Variants = VariantsTemplate.bind({});

Variants.args = {
  labels: {
    label: 'Category',
    placeholder: 'Select a category',
  },
  isMulti: true,
  isRequired: true,
  value: [],
  options,
};
