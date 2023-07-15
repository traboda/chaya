import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Breadcrumb } from '../../../index';
import { BreadcrumbProps } from '../../../components/Breadcrumb';

const meta: Meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<BreadcrumbProps> = args => (
  <div className="dsr-flex dsr-flex-col dsr-justify-center dsr-items-center" style={{ minHeight: '5vh' }}>
    <Breadcrumb {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  items: [
    { link:'#/abc', title:'abc' },
    { link:'#/abc/efg', title:'efg' },
  ],
};