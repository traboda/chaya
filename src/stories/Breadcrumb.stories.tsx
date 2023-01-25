import React from 'react';
import { Meta, Story, addDecorator } from '@storybook/react';

import { Breadcrumb } from '../index';

import ThemeContextDecorator from './ThemeContextDecorator';

addDecorator(ThemeContextDecorator);

const meta: Meta = {
  title: 'Basic Elements/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => (
    <div className="dsr-flex dsr-flex-col dsr-justify-center dsr-items-center" style={{ minHeight: '5vh' }}>
        {/*// @ts-ignore*/}
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