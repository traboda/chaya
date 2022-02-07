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
    <div className="flex justify-center items-center bg-gray-200" style={{ minHeight: '95vh' }}>
      <Button {...args}/>
    </div>
);

export const Default = Template.bind({});

Default.args = {
  children: "Press here"
};

export const Secondary = Template.bind({});

Secondary.args = {
  children: "Press here",
  variant: "secondary"
};

export const Dark = Template.bind({});

Dark.args = {
  children: "Press here",
  variant: "dark"
};

export const Light = Template.bind({});

Light.args = {
  children: "Press here",
  variant: "light"
};

export const Success = Template.bind({});

Success.args = {
  children: "Press here",
  variant: "success"
};

export const Danger_Inverse_Color = Template.bind({});

Danger_Inverse_Color.args = {
  text: "press here",
  variant: "danger",
  inverseColors: true
};

export const Warning_with_fullWidth = Template.bind({});

Warning_with_fullWidth.args = {
  children: "Press here",
  variant: "warning",
  fw: true
};

export const Transparent = Template.bind({});

Transparent.args = {
  children: "Press here",
  transparent: true,
};