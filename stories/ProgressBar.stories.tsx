import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { ProgressBar } from '../src';
import ThemeContextDecorator from "../src/themeDecorator";

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
}