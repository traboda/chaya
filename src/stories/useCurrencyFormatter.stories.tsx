import React from 'react';
import { Meta, Story } from '@storybook/react';

import { useCurrencyFormatter } from '../index';

const meta: Meta = {
  title: 'Hooks/useCurrencyFormatter',
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = () => {

  const format = useCurrencyFormatter();

  return (
    <div>
      <div className="dsr-flex dsr-flex-col dsr-flex-gap-3">
        <div className="dsr-font-mono dsr-text-2xl">{format(23000, 'INR')}</div>
        <div className="dsr-font-mono dsr-text-2xl">{format(320000, 'INR')}</div>
        <div className="dsr-font-mono dsr-text-2xl">{format(2300000, 'INR')}</div>
        <div className="dsr-font-mono dsr-text-2xl">{format(32000000, 'INR')}</div>
        <div className="dsr-font-mono dsr-text-2xl">{format(230000000, 'INR')}</div>
      </div>
    </div>
  );
};

export const Default = Template.bind({});

Default.args = {
  date: new Date(Date.now() + (1000 * 60 * 60 * 24)),
};