import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { CheckboxGroup, Card } from '../index';

const meta: Meta = {
  title: 'User Inputs/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const defaultValue = ['option-2', 'option-3'];

const options = [
  {
    label: 'option 1',
    value: 'option-1',
  },
  {
    label: 'option 2',
    value: 'option-2',
  },
  {
    label: 'option 3',
    value: 'option-3',
  },
  {
    label: 'option 4',
    value: 'option-4',
  },
  {
    label: 'option 5',
    value: 'option-5',
  },
];

const Template: Story = args => {
  const [value, setValue] = useState(args.value ?? []);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <CheckboxGroup {...args} options={args?.options} value={value} onChange={setValue} />
  );
};

export const Default = Template.bind({});

Default.args = {
  value: defaultValue,
  options,
};

export const Horizontal = Template.bind({});

Horizontal.args = {
  value: defaultValue,
  options,
  alignment: 'horizontal',
};

const CheckboxExample = (props: any) => {
  const [value, setValue] = useState(props.value ?? []);
  return (
    <Card>
      <CheckboxGroup {...props} value={value} onChange={setValue} />
    </Card>
  );
};

const CheckboxColorsTemplate: Story = args => (
  <div className="dsr-flex dsr-flex-wrap dsr-flex-start dsr-mx-0">
    <div className="md:dsr-w-1/3 dsr-p-2">
      <CheckboxExample options={args?.options} color="default" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <CheckboxExample options={args?.options} color="primary" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <CheckboxExample options={args?.options} color="secondary" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <CheckboxExample options={args?.options} color="danger" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <CheckboxExample options={args?.options} color="warning" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <CheckboxExample options={args?.options} color="success" />
    </div>
  </div>
);

export const colors = CheckboxColorsTemplate.bind({});
colors.args = { options };


const SizesColorsTemplate: Story = args => (
  <div className="dsr-flex dsr-flex-wrap dsr-flex-start dsr-mx-0">
    <div className="md:dsr-w-1/3 dsr-p-2">
      <CheckboxExample options={args?.options} size="xs" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <CheckboxExample options={args?.options} size="sm" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <CheckboxExample options={args?.options} size="md" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <CheckboxExample options={args?.options} size="lg" />
    </div>
    <div className="md:dsr-w-1/3 dsr-p-2">
      <CheckboxExample options={args?.options} size="xl" />
    </div>
  </div>
);

export const sizes = SizesColorsTemplate.bind({});
sizes.args = { options };
