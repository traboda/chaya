import React, { useMemo, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

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

  const render = useMemo(
    () => (
      <div style={{ width: '300px', maxWidth: '100%' }}>
        <TextInput {...args} value={value} onChange={setValue} />
      </div>
    ),
    [value]
  );

  return render;
};

export const Primary: Story = {
  args: {
    label: 'Your Name',
    value: 'Ashwin',
  },
  render: (args) => <DefaultTemplate {...args} />,
};

export const WithPostfix: Story = {
  args: {
    label: 'Website',
    value: 'example',
    postfixRenderer: <span className="px-2 text-sm opacity-60">.com</span>,
  },
  render: (args) => <DefaultTemplate {...args} />,
};

export const InvalidInputs: Story = {
  args: {
    label: 'Email Address',
    value: 'invalid-email',
    isInvalid: true,
    errorText: 'Please enter a valid email address.',
  },
  render: (args) => <DefaultTemplate {...args} />,
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4" style={{ width: '300px' }}>
      <DefaultTemplate label="Search" value="" leftIcon="search" name="search" />
      <DefaultTemplate label="Email" value="" leftIcon="mail" rightIcon="check" name="email" />
    </div>
  ),
};
