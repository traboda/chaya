import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Spinner } from '../../../src';
import { SpinnerProps } from '../../../src/components/Spinner';

const meta: Meta = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
};

export default meta;

const Template: Story<SpinnerProps> = args => (
  <div style={{ width: '450px', maxWidth: '100%' }}>
    <Spinner {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  size: 'md',
};
