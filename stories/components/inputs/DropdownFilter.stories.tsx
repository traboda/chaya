import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import DropdownFilter, { DropdownFilterProps } from '../../../src/components/DropdownFilter';
import Button from '../../../src/components/Button';

const meta: Meta<DropdownFilterProps> = {
  title: 'Components/Inputs/DropdownFilter',
  component: DropdownFilter,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<DropdownFilterProps>;

const DEFAULT_OPTIONS: DropdownFilterProps['options'] = [
  { label: 'ID', value: 'id' },
  { label: 'Name', value: 'name' },
  { label: 'Username', value: 'username' },
  { label: 'Created At', value: 'created_at' },
  { label: 'Updated At', value: 'updated_at' },
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'Website', value: 'website' },
  { label: 'Company', value: 'company' },
  { label: 'A Really Long Field Name That Cant Fit For Sure', value: 'address' },
];

const DefaultChildButton = () => (
  <Button>
    Filter Button
  </Button>
);

const DefaultDropdownFilterTemplate = (args: DropdownFilterProps) => {

  const [selections, setSelections] = useState<string[] | null>([]);

  return (
    <DropdownFilter
      {...args}
      selections={selections}
      setSelections={setSelections}
      children={args.children}
    />
  );

};

export const Primary: Story = {
  args: {
    options: DEFAULT_OPTIONS,
    children: <DefaultChildButton />,
  },
  render: (args) => <DefaultDropdownFilterTemplate {...args} children={args.children} />,
};


const AsyncDropdownFilterTemplate = (args: DropdownFilterProps) => {

  const [selections, setSelections] = useState<string[] | null>([]);

  const fetchCompany = async (keyword: string) => {
    const res = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${keyword}`);
    const data = await res.json();
    return data.map((d: { name: string, logo: string }) => ({ label: d.name, value: d.name, iconURL: d.logo }));
  };

  return (
    <DropdownFilter
      {...args}
      selections={selections}
      setSelections={setSelections}
      isAsync
      options={undefined}
      onFetch={fetchCompany}
      children={args.children}
    />
  );

};

export const Async: Story = {
  args: {
    children: <DefaultChildButton />,
    isAsync: true,
    onFetch: async () => [],
  },
  render: (args) => <AsyncDropdownFilterTemplate {...args} children={args.children} />,
};