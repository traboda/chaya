import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { Card, SimpleSelect } from '../../../index';
import { SimpleSelectProps } from '../../../components/SimpleSelect';

const meta: Meta = {
  title: 'Inputs/Simple Select',
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

const Template: Story<SimpleSelectProps<any>> = args => {
  const [value, setValue] = useState(args.value);
  return (
    <SimpleSelect {...args} value={value} onChange={setValue} />
  );
};

const options = [
  { label: 'Computer Science', value: 'cs' },
  { label: 'Electronics', value: 'ec' },
  { label: 'Mechanical', value: 'me' },
  { label: 'Civil', value: 'ce' },
  { label: 'Electrical', value: 'ee' },
  { label: 'Chemical', value: 'ch' },
  { label: 'Aerospace', value: 'ae' },
  { label: 'Biotechnology', value: 'bt' },
  { label: 'Metallurgy', value: 'mt' },
  { label: 'Production', value: 'pe' },
  { label: 'Textile', value: 'te' },
  { label: 'Mining', value: 'mn' },
  { label: 'Naval Architecture', value: 'na' },
  { label: 'Petroleum', value: 'petro' },
  { label: 'Plastic', value: 'pl' },
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

export const withAsync: Story<SimpleSelectProps<string>> = Template.bind({});

let asyncValue;

withAsync.args = {
  labels: {
    label: 'Pokemon',
    placeholder: 'Select a pokemon',
    noOptionsFound: 'No pokemon found',
  },
  isAsync: true,
  isRequired: true,
  value: asyncValue, onChange: (v: any) => asyncValue = v,
  onFetch: async (query: string) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
    const data = await response.json();
    return data.results.filter((pokemon: any) => pokemon.name.includes(query)).map((pokemon: any) => ({
      label: pokemon.name,
      value: pokemon.name,
    }));
  },
};

export const withMultiSelect: Story<SimpleSelectProps<string[]>> = Template.bind({});

withMultiSelect.args = {
  labels: {
    label: 'Category',
    placeholder: 'Select a category',
  },
  isMulti: true,
  isRequired: true,
  value: [],
  options,
};

export const withGroups: Story<SimpleSelectProps<string>> = Template.bind({});

let country;

withGroups.args = {
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

const VariantsTemplate: Story<SimpleSelectProps<string[]>> = args => {
  const [value, setValue] = useState(args.value);
  return (
    <Card>
      <div className="dsr-flex dsr-flex-wrap dsr-mx-0">
        <div className="w-full md:dsr-w-1/2 dsr-p-2">
          <Card title="Comma Variant">
            <SimpleSelect {...args} value={value} onChange={setValue} variant="comma" />
          </Card>
        </div>
        <div className="w-full md:dsr-w-1/2 dsr-p-2">
          <Card title="Chip Variant">
            <SimpleSelect {...args} value={value} onChange={setValue} variant="chip" />
          </Card>
        </div>
      </div>
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
  value: [
    options[0].value,
    options[1].value,
  ],
  options,
};
