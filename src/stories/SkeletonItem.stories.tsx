import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import ThemeContextDecorator from './ThemeContextDecorator';
import { SkeletonItem } from '../index';


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
        <SkeletonItem {...args} />
    </div>
);

export const Default = Template.bind({});

Default.args = {
  w: '500px',
  h: '300px',
};