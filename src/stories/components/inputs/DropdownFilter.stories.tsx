import React from 'react';
import { Meta, Story } from '@storybook/react';

import { DropdownFilter, Button } from '../../../index';
import { DropdownFilterProps } from '../../../components/DropdownFilter';

const meta: Meta = {
  title: 'Components/Inputs/DropdownFilter',
  component: DropdownFilter,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DropdownFilterProps> = args => {

  const [selections, setSelections] = React.useState(args?.selections);

  return (
    <div className="dsr-flex dsr-flex-col dar-justify-center dsr-items-center dsr-p-30">
      <DropdownFilter {...args} selections={selections} setSelections={setSelections}>
        <Button>
          Filter
        </Button>
      </DropdownFilter>
    </div>
  );
};

export const BasicUsage = Template.bind({});

BasicUsage.args = {
  selections: [
    'id', 'name',
  ],
  options: [
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
  ],
};

