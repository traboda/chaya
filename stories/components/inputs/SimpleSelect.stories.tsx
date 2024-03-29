import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { Card, SimpleSelect } from '../../../src';
import { SimpleSelectProps } from '../../../src/components/SimpleSelect';

const meta: Meta = {
  title: 'Components/Inputs/Simple Select',
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
  { label: 'Mechanical', value: 'me', icon: 'settings' },
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

export const CustomIcon = Template.bind({});

let value2;

CustomIcon.args = {
  labels: {
    label: 'Customized Selector',
    placeholder: 'Pick your option',
  },
  isRequired: false,
  hideArrow: true,
  leftIcon: {
    icon: 'search',
  },
  rightIcon: 'settings',
  value: value2,
  onChange: (v: any) => value2 = v,
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
  rightIcon: 'search',
  hideArrow: true,
  onFetch: async (query: string) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
    const data = await response.json();
    return data.results.filter((pokemon: any) => pokemon.name.includes(query)).map((pokemon: any) => ({
      label: pokemon.name,
      value: pokemon.name,
      iconRenderer: (
        <img width={28} height={28} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} />
      ),
    }));
  },
};

export const withMultiSelect: Story<SimpleSelectProps<string[]>> = Template.bind({});

withMultiSelect.args = {
  labels: {
    label: 'Category',
    placeholder: 'Select a category',
  },
  variant: 'comma',
  isMulti: true,
  isRequired: true,
  value: ['cs', 'me'],
  options,
};

export const withAsyncMulti: Story<SimpleSelectProps<string[]>> = Template.bind({});


let asyncMultiValue: string[] = ['3', '6'];

withAsyncMulti.args = {
  labels: {
    label: 'Pokemon',
    placeholder: 'Select a pokemon',
    noOptionsFound: 'No pokemon found',
  },
  isAsync: true,
  isRequired: true,
  isMulti: true,
  value: asyncMultiValue,
  onChange: (v: string[]) => asyncMultiValue = v,
  rightIcon: 'search',
  hideArrow: true,
  variant: 'pill',
  onFetch: async (query: string) => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
    const data = await response.json();
    return data.results.filter((pokemon: any) => pokemon.name.includes(query)).map((pokemon: any) => ({
      label: pokemon.name,
      value: pokemon.url.split('/')[6],
      iconRenderer: (
        <img
          width={28}
          height={28}
          className="bg-white rounded"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
        />
      ),
    }));
  },
};


const tags = [ { 'label': 'Web', 'value': 'web', 'isPrivate': false }, { 'label': 'DFIR', 'value': 'dfir', 'isPrivate': false }, { 'label': 'CSRF', 'value': 'csrf', 'isPrivate': false } ];

export const withAsyncMultiTags: Story<SimpleSelectProps<string[]>> = Template.bind({});


let asyncMultiTags: string[] = ['csrf'];

withAsyncMultiTags.args = {
  labels: {
    label: 'Tags',
    placeholder: 'Select a tag',
    noOptionsFound: 'No tags found',
  },
  isCreatable: true,
  isRequired: true,
  isMulti: true,
  hideSelectAll: true,
  value: asyncMultiTags,
  onChange: (v: string[]) => asyncMultiTags = v,
  rightIcon: 'search',
  hideArrow: true,
  variant: 'pill',
  options: tags,
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
      <div className="flex flex-wrap mx-0">
        <div className="w-full md:w-1/2 p-2">
          <Card title="Comma Variant">
            <SimpleSelect {...args} value={value} onChange={setValue} variant="comma" />
          </Card>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <Card title="Chip Variant">
            <SimpleSelect {...args} value={value} onChange={setValue} variant="pill" />
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
  value: ['cs', 'me'],
  options,
};
