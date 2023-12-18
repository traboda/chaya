import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { DropdownFilter, Button, DropdownFilterProps } from '../../../src';

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
