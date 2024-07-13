import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Radio, { RadioProps } from '../../../src/components/Radio';

const meta: Meta<RadioProps<string | number>> = {
  title: 'Components/Inputs/Radio',
  component: Radio,
};

export default meta;

export type Story = StoryObj<RadioProps<string | number>>;

const BaseCheckboxTemplate = (args: RadioProps<string | number>) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <Radio
      {...args}
      isSelected={isChecked}
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