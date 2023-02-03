import React, { useEffect, useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { PinInput } from '../index';

const meta: Meta = {
  title: 'User Inputs/Pin Input',
  component: PinInput,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => {
  const [value, setValue] = useState(args.value ?? '');

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
      <div style={{ width: '300px', maxWidth: '100%' }}>
          <h1 className="mb-3">
              Pin:
              {value}
          </h1>
          <PinInput {...args} value={value} onChange={setValue} />
      </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  labels: {
    placeholder: '44kl4K',
  },
};


export const ClassVariant = Template.bind({});

ClassVariant.args = {
  variant: 'classic',
  labels: {
    placeholder: '44kl4K',
  },
};


export const FormSubmission: Story = (args) => {
  const [value, setValue] = useState(args.value);
  useEffect(() => setValue(args.value), [args.value]);

  return (
      <form onSubmit={(e) => { e.preventDefault(); console.log('pin submitted'); }}>
          <div style={{ width: '450px', maxWidth: '100%' }}>
              <h1 className="mb-3">
                  Pin:
                  {value}
              </h1>
              <PinInput {...args} value={value} onChange={setValue} />
              <button type="submit">
                  Submit
              </button>
          </div>
      </form>
  );
};

FormSubmission.args = {
  required: true,
};
