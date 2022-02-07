import React from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';
import { Button } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
      {story()}
    </ThemeContext>
));

const meta: Meta = {
  title: 'Button',
  component: Button,
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
    <div className="flex justify-center items-center">
      <Button {...args}/>
    </div>
);

export const Default = Template.bind({});

Default.args = {
  children: "Press here"
};



const Vars: Story = args => (
    <div className="flex justify-center items-center bg-gray-200" style={{ minHeight: '25vh' }}>
      <Button {...args} variant="primary" />
      <Button {...args} variant="secondary" />
      <Button {...args} variant="success" />
      <Button {...args} variant="warning" />
      <Button {...args} variant="danger" />
      <Button {...args} variant="dark" />
      <Button {...args} variant="light" />
    </div>
);

export const ColorVariants = Vars.bind({});


ColorVariants.args = {
  children: "Press here",
  mx: 2
};