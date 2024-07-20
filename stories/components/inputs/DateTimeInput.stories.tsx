import React, { useMemo, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import DateTimeInput, { DateTimeInputProps } from '../../../src/components/DateTimeInput';

const meta: Meta<DateTimeInputProps> = {
  title: 'Components/Inputs/DateTimeInput',
  component: DateTimeInput,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export type Story = StoryObj<DateTimeInputProps>;

const DefaultTemplate = (args: DateTimeInputProps) => {

  const [value, setValue] = useState<string | null>(args.value || '');

  const render = useMemo(() => (
    <div style={{ width: '300px', maxWidth: '100%' }}>
      <DateTimeInput {...args} value={value} onChange={setValue} />
    </div>
  ), [value]);

  return render;
};


export const Primary: Story = {
  args: {
    label: 'Publish Timestamp',
    value: '2024-07-20T12:09:43Z',
  },
  render: (args) => (
    <DefaultTemplate {...args} />
  ),
};
