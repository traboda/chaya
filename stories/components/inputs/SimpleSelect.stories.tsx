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
