import React from 'react';
import { Meta, Story } from '@storybook/react';

import { CircularProgress } from '../../../src';
import { CircularProgressProps } from '../../../src/components/CircularProgress';

const meta: Meta = {
  title: 'Components/Feedback/CircularProgress',
  component: CircularProgress,
};

export default meta;

const Template: Story<CircularProgressProps> = args => (
  <div style={{ width: '450px', maxWidth: '100%' }}>
    <CircularProgress {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  value: 40,
};
