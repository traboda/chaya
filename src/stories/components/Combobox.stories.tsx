import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Combobox } from '../../index';
import { ComboboxType } from '../../components/Combobox';

const meta: Meta = {
  title: 'User Inputs/Combobox',
  component: Combobox,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ComboboxType> = args => {
  const [value, setValue] = React.useState(args?.value);
  return (
    <div className="dsr-flex dsr-flex-col dar-justify-center dsr-items-center dsr-p-30">
      <div>
        Option Selected: 
        {' '}
        <strong>{value}</strong>
      </div>
      <Combobox {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Basic = Template.bind({});

let value = 'option1';

Basic.args = {
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ],
};