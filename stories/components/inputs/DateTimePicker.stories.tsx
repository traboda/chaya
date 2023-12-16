import React from 'react';
import { Meta, Story } from '@storybook/react';

import { DateTimePicker, DateTimePickerProps } from '../../../src';

const meta: Meta = {
  title: 'Components/Inputs/DateTimePicker',
  component: DateTimePicker,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    onSubmit: { action: 'select' },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;


const Template: Story<DateTimePickerProps> = args => (
  <div style={{ width: '280px' }}>
    <DateTimePicker {...args} />
  </div>
);

export const Basic = Template.bind({});

Basic.args = {
  label: 'Start Time',
};
