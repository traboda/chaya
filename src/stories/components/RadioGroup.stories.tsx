import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { Card, RadioGroup } from '../../index';
import { RadioGroupType } from '../../components/RadioGroup';

const meta: Meta = {
  title: 'User Inputs/RadioGroup',
  component: RadioGroup,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const options = [
  { label: 'Male', value: 'M' },
  { label: 'Female', value: 'F' },
  { label: 'N/A', value: 'N' },   
];

const Template: Story<RadioGroupType<string>> = args => {
  const [value, setValue] = useState(args.value ?? null);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <RadioGroup {...args} options={args?.options} value={value} onChange={setValue} />
  );
};

export const Default = Template.bind({});

Default.args = {
  label: 'Select Gender',

  value: 'M',
  options,
};

export const Disabled = Template.bind({});

Disabled.args = {
  isDisabled: true,
  label: 'Select Gender',
  options,
};

export const Horizontal = Template.bind({});

Horizontal.args = {
  options,
  alignment: 'horizontal',
};

const RadioExample = (props: any) => {
  const [value, setValue] = useState(props?.options[0].value ?? null);
  return (
    <Card>
      <RadioGroup {...props} value={value} onChange={setValue} />
    </Card>
  );
};

const ColorsTemplate: Story = args => (
  <div className="dsr-flex dsr-flex-wrap dsr-flex-start dsr-mx-0">
    <div className="md:dsr-w-1/3 dsr-p-2">
      <RadioExample options={args?.options} color="default" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <RadioExample options={args?.options} color="primary" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <RadioExample options={args?.options} color="secondary" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <RadioExample options={args?.options} color="danger" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <RadioExample options={args?.options} color="warning" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <RadioExample options={args?.options} color="success" />
    </div>
  </div>
);

export const colors = ColorsTemplate.bind({});
colors.args = { options, value: 'option-2' };


const SizesTemplate: Story = args => (
  <div className="dsr-flex dsr-flex-wrap dsr-flex-start dsr-mx-0">
    <div className="md:dsr-w-1/3 dsr-p-2">
      <RadioExample options={args?.options} size="xs" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <RadioExample options={args?.options} size="sm" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <RadioExample options={args?.options} size="md" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <RadioExample options={args?.options} size="lg" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <RadioExample options={args?.options} size="xl" />
    </div>
  </div>
);

export const sizes = SizesTemplate.bind({});
sizes.args = { options };