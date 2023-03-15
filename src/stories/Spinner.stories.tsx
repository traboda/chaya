import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Spinner } from '../index';

const meta: Meta = {
  title: 'Overlays/Spinner',
  component: Spinner,
};

export default meta;

const Template: Story = args => (
    <div style={{ width: '450px', maxWidth: '100%' }}>
        {/*// @ts-ignore*/}
        <Spinner {...args} />
    </div>
);

export const Default = Template.bind({});

Default.args = {
  size: 'md',
};
