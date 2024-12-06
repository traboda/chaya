import React from 'react';
import { Meta, Story } from '@storybook/react';

import { TrendLineProps } from '../../../components/TrendLine';
import TrendLine from '../../../components/TrendLine';

const meta: Meta = {
  title: 'Components/Feedback/TrendLine',
  component: TrendLine,
};

export default meta;

const Template: Story<TrendLineProps> = args => (
  <div style={{ width: '450px', height: '200px' }}>
    <TrendLine
      {...args}
    />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  data: [10, 20, 30, 40, 30, 20, 60],
  gradient: ['#b92b27', '#1565C0'],
  smoothness: 0,
};
