import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { VisualPicker } from '../../../src';
import { VisualPickerProps } from '../../../src/components/VisualPicker';

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
    <div className="flex flex-col dar-justify-center items-center p-30">
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
    title: 'Second Bigger Item Title',
    description: 'This is the description for the second item',
    value: 'item2',
    isDisabled: true,
  },
  {
    title: 'Third Item',
    description: 'This is the description for the third item',
    value: 'item3',
  },
  {
    title: 'Fourth Item',
    description: 'This is the description for the third item',
    value: 'item4',
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

export const VerticalSelect = Template.bind({});

VerticalSelect.args = {
  items,
  value: [],
  isVertical: true,
  colMinWidth: 300,
};


export const VerticalMultiSelect = Template.bind({});

VerticalMultiSelect.args = {
  items,
  value: [],
  isMulti: true,
  isVertical: true,
  colMinWidth: 300,
};
