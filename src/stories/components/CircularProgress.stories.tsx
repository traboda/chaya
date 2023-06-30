import React from 'react';
import { Meta, Story } from '@storybook/react';

import { CircularProgress } from '../../index';

const meta: Meta = {
  title: 'Visualization/Circular Progress',
  component: CircularProgress,
};

export default meta;

const Template: Story = args => (
  <div style={{ width: '450px', maxWidth: '100%' }}>
    {/*// @ts-ignore*/}
    <CircularProgress {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  value: 40,
};
