import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Checkbox, { CheckboxProps } from '../../../src/components/Checkbox';

const meta: Meta<CheckboxProps<string | number>> = {
  title: 'Components/Inputs/Checkbox',
  component: Checkbox,
};

export default meta;

export type Story = StoryObj<CheckboxProps<string | number>>;

const BaseCheckboxTemplate = (args: CheckboxProps<string | number>) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <Checkbox
      {...args}
      isChecked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
    />
  );
};

export const Primary: Story = {
  args: {
    label: 'Will you like to check this checkbox?',
    value: 'checked',
  },
  render: (args) => <BaseCheckboxTemplate {...args} />,
};