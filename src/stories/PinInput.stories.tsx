import React, { useEffect, useState } from 'react';
import { addDecorator, Meta, Story } from '@storybook/react';

import { PinInput } from '../index';

import ThemeContextDecorator from './ThemeContextDecorator';


addDecorator(ThemeContextDecorator);

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
      <div style={{ width: '450px', maxWidth: '100%' }}>
          <h1 className="mb-3">
              Pin:
              {value}
          </h1>
          {/*// @ts-ignore*/}
          <PinInput {...args} value={value} onChange={setValue} />
      </div>
  );
};

export const Default = Template.bind({});


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
              {/*// @ts-ignore*/}
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
