import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { VisualPicker } from '../../../index';
import { VisualPickerProps } from '../../../components/VisualPicker';

const meta: Meta = {
  title: 'Components/Inputs/VisualPicker',
  component: VisualPicker,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<VisualPickerProps<string[]>> = args => {
  const [value, setValue] = useState(args.value ?? '');

  return (
    <div className="dsr-flex dsr-flex-col dar-justify-center dsr-items-center dsr-p-30">
      <VisualPicker {...args} value={value} onChange={setValue} />
    </div>
  );
};

const items = [
  {
    icon: 'home',
    title: 'First Item',
    description: 'This is the description for the first item',
    value: 'item1',
  },
  {
    icon: 'settings',
    title: 'Second Bigger Item Title',
    description: 'This is the description for the second item',
    value: 'item2',
    isDisabled: true,
  },
  {
    icon: 'check',
    title: 'Third Item',
    description: 'This is the description for the third item',
    value: 'item3',
  },
  {
    icon: 'settings',
    title: 'Fourth Item',
    description: 'This is the description for the fourth item',
    value: 'item4',
  },
  {
    icon: 'external-link',
    title: 'Fifth Item',
    description: 'This is the description for the fifth item',
    value: 'item5',
  },
  {
    icon: 'alert-triangle',
    title: 'Sixth Item',
    description: 'This is the description for the sixth item',
    value: 'item6',
  },
];

export const Default = Template.bind({});

Default.args = { items, colMinWidth: 300 };

export const MultiSelect = Template.bind({});

MultiSelect.args = {
  items,
  value: [],
  isMulti: true,
  colMinWidth: 300,
};
