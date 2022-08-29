import React from 'react';

import {addDecorator, Meta, Story} from '@storybook/react';
import { TextInput } from '../src';
import ThemeContextDecorator from "../src/themeDecorator";

addDecorator(ThemeContextDecorator);


const meta: Meta = {
  title: 'User Inputs/Text Input',
  component: TextInput,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => (
    <TextInput label="Label" name="field-name" value="value" {...args} />
);

export const Default = Template.bind({});

Default.args = {};

const InvalidInputsTemplate: Story = args => (
  <div style={{ width: '720px', maxWidth: '100%' }}>
    <div style={{ paddingBottom: '1rem' }}>
      <div style={{ paddingBottom: '0.5rem' }}>Input with invalid parameter set</div>
      <TextInput label="Password" name="password" type="password" invalid value="wrong_password" {...args} />
    </div>
    <div style={{ paddingBottom: '1rem' }}>
      <div style={{ paddingBottom: '0.5rem' }}>Number Input with value in invalid range (35 for 1-5)</div>
      <TextInput label="Rate (scale of 1-5)" name="field-name" type="number" value={35} min={1} max={5} {...args} />
    </div>
    <div style={{ paddingBottom: '1rem' }}>
      <div style={{ paddingBottom: '0.5rem' }}>Email Input with invalid email as value</div>
      <TextInput label="Your Email" name="email" type="email" value="as@" {...args} />
    </div>
  </div>
);

export const InvalidInputs = InvalidInputsTemplate.bind({});

InvalidInputs.args = {
};