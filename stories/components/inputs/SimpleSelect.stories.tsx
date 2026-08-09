import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import SimpleSelect from '../../../src/components/SimpleSelect';

const meta: Meta = {
  title: 'Components/Inputs/SimpleSelect',
  component: SimpleSelect,
  parameters: { controls: { expanded: true } },
};

export default meta;

type Story = StoryObj;

const fruitOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Dragon Fruit', value: 'dragonfruit' },
  { label: 'Elderberry', value: 'elderberry' },
];

export const Primary: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div className="w-80">
        <SimpleSelect
          name="fruit"
          labels={{ label: 'Select a fruit' }}
          options={fruitOptions}
          value={value}
          onChange={(v) => setValue(v as string)}
        />
      </div>
    );
  },
};

export const MultiSelect: Story = {
  tags: ['unlisted'],
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div className="w-80">
        <SimpleSelect
          name="fruits"
          labels={{ label: 'Select fruits' }}
          options={fruitOptions}
          value={value}
          onChange={(v) => setValue(v as string[])}
          isMulti
        />
      </div>
    );
  },
};

export const PillVariant: Story = {
  tags: ['unlisted'],
  render: () => {
    const [value, setValue] = React.useState<string[]>(['apple', 'cherry']);
    return (
      <div className="w-80">
        <SimpleSelect
          name="fruits"
          labels={{ label: 'Select fruits' }}
          options={fruitOptions}
          value={value}
          onChange={(v) => setValue(v as string[])}
          isMulti
          variant="pill"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  tags: ['unlisted'],
  render: () => (
    <div className="w-80">
      <SimpleSelect
        name="fruit"
        labels={{ label: 'Select a fruit' }}
        options={fruitOptions}
        value="apple"
        onChange={() => {}}
        isDisabled
      />
    </div>
  ),
};

export const CustomIcon: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div className="w-80">
        <SimpleSelect
          name="fruit"
          labels={{ label: 'Select a fruit' }}
          options={fruitOptions}
          value={value}
          onChange={(v) => setValue(v as string)}
          leftIcon="search"
        />
      </div>
    );
  },
};

export const WithAsync: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div className="w-80">
        <SimpleSelect
          name="fruit"
          labels={{ label: 'Search fruits' }}
          value={value}
          onChange={(v) => setValue(v as string)}
          isAsync
          onFetch={async (keyword) => {
            await new Promise((r) => setTimeout(r, 500));
            return fruitOptions.filter((o) =>
              o.label.toLowerCase().includes(keyword.toLowerCase())
            );
          }}
        />
      </div>
    );
  },
};

export const WithAsyncMulti: Story = {
  name: 'With Async Multi Select',
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div className="w-80">
        <SimpleSelect
          name="fruits"
          labels={{ label: 'Search & select fruits' }}
          value={value}
          onChange={(v) => setValue(v as string[])}
          isMulti
          isAsync
          onFetch={async (keyword) => {
            await new Promise((r) => setTimeout(r, 500));
            return fruitOptions.filter((o) =>
              o.label.toLowerCase().includes(keyword.toLowerCase())
            );
          }}
        />
      </div>
    );
  },
};

export const WithAsyncMultiTags: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([]);
    return (
      <div className="w-80">
        <SimpleSelect
          name="fruits"
          labels={{ label: 'Search & select fruits' }}
          value={value}
          onChange={(v) => setValue(v as string[])}
          isMulti
          isAsync
          variant="pill"
          onFetch={async (keyword) => {
            await new Promise((r) => setTimeout(r, 500));
            return fruitOptions.filter((o) =>
              o.label.toLowerCase().includes(keyword.toLowerCase())
            );
          }}
        />
      </div>
    );
  },
};

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <div className="w-80">
        <SimpleSelect
          name="food"
          labels={{ label: 'Select a food' }}
          options={[
            {
              group: 'Fruits',
              options: [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
              ],
            },
            {
              group: 'Vegetables',
              options: [
                { label: 'Carrot', value: 'carrot' },
                { label: 'Broccoli', value: 'broccoli' },
              ],
            },
          ]}
          value={value}
          onChange={(v) => setValue(v as string)}
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [value1, setValue1] = React.useState<string[]>(['apple']);
    const [value2, setValue2] = React.useState<string[]>(['apple']);
    return (
      <div className="flex w-80 flex-col gap-4">
        <SimpleSelect
          name="comma"
          labels={{ label: 'Comma Variant' }}
          options={fruitOptions}
          value={value1}
          onChange={(v) => setValue1(v as string[])}
          isMulti
          variant="comma"
        />
        <SimpleSelect
          name="pill"
          labels={{ label: 'Pill Variant' }}
          options={fruitOptions}
          value={value2}
          onChange={(v) => setValue2(v as string[])}
          isMulti
          variant="pill"
        />
      </div>
    );
  },
};
