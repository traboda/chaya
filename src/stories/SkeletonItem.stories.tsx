import React from 'react';
import { addDecorator, Meta, Story } from '@storybook/react';

import { SkeletonItem } from '../index';

import ThemeContextDecorator from './ThemeContextDecorator';


addDecorator(ThemeContextDecorator);

const meta: Meta = {
  title: 'Overlays/SkeletonItem',
  component: SkeletonItem,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = args => (
    <div style={{ width: '450px', maxWidth: '100%' }}>
        {/*// @ts-ignore*/}
        <SkeletonItem {...args} h={150} w={150} className="dsr-my-2" />
        {/*// @ts-ignore*/}
        <SkeletonItem {...args} h={35} w={120} className="dsr-my-2" />
        {/*// @ts-ignore*/}
        <SkeletonItem {...args} h={30} w={150} className="dsr-my-2" />
    </div>
);

export const Default = Template.bind({});

Default.args = {};