import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { VisualPicker } from '../index';

const meta: Meta = {
  title: 'User Inputs/Visual Picker',
  component: VisualPicker,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <div className="dsr-flex dsr-flex-col dar-justify-center dsr-items-center dsr-p-30">
      {/*// @ts-ignore*/}
      <VisualPicker {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  items: [
    {
      label: 'Item 1',
      value: 'item1',
    },
    {
      label: 'Item 2',
      value: 'item2',
      isDisabled: true,
    },
    {
      label: 'Item 3',
      value: 'item3',
    },
  ],
};