import React from 'react';
import { Meta, Story } from '@storybook/react';

import { SkeletonItem } from '../../index';

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

export const Wave = Template.bind({});

Wave.args = {};

export const Pulse = Template.bind({});

Pulse.args = { variant: 'pulse' };