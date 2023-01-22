import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import ThemeContextDecorator from './ThemeContextDecorator';
import ProgressBar from '../components/ProgressBar';

addDecorator(ThemeContextDecorator);

const meta: Meta = {
  title: 'Visualization/Progress Bar',
  component: ProgressBar,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => (
    <div style={{ width: '450px', maxWidth: '100%' }}>
        {/*// @ts-ignore*/}
        <ProgressBar {...args} />
    </div>
);

export const Default = Template.bind({});

Default.args = {
  value: 30,
  minVal: 1,
  maxVal: 100,
};