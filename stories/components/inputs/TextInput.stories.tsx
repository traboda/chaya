import React, { useMemo, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import TextInput, { TextInputProps } from '../../../src/components/TextInput';

const meta: Meta<TextInputProps<string | number>> = {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

export type Story = StoryObj<TextInputProps<string | number>>;

const DefaultTemplate = (args: TextInputProps<string | number>) => {

  const [value, setValue] = useState(args.value || '');

  const render = useMemo(() => (
    <div style={{ width: '300px', maxWidth: '100%' }}>
      <TextInput {...args} value={value} onChange={setValue} />
    </div>
  ), [value]);

  return render;
};


export const Primary: Story = {
  args: {
    label: 'Your Name',
    value: 'Ashwin',
  },
  render: (args) => (
    <DefaultTemplate {...args} />
  ),
};
