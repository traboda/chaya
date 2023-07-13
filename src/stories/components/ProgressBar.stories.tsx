import React from 'react';
import { Meta, Story } from '@storybook/react';

import { ProgressBar } from '../../index';
import { ProgressBarType } from '../../components/ProgressBar';

const meta: Meta = {
  title: 'Visualization/Progress Bar',
  component: ProgressBar,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ProgressBarType> = args => (
  <div style={{ width: '450px', maxWidth: '100%' }}>
    <ProgressBar {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  value: 30,
  minVal: 1,
  maxVal: 100,
};

export const Striped = Template.bind({});

Striped.args = {
  value: 30,
  minVal: 1,
  maxVal: 100,
  isStriped: true,
};

export const Loading = Template.bind({});

Loading.args = {
  isLoading: true,
  value: 45,
  minVal: 1,
  maxVal: 100,
};